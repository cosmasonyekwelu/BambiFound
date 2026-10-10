import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service.js';

export interface SynergyMatchResult {
  matchScore: number;
  synergyAnalysis: string;
  recommendedRoles: string[];
  provider: 'openai' | 'groq' | 'ai_sandbox';
  model: string;
}

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  private getOpenAiConfig() {
    return {
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
      model: this.configService.get<string>('OPENAI_MODEL') || 'gpt-4o-mini',
    };
  }

  private getGroqConfig() {
    return {
      apiKey: this.configService.get<string>('GROQ_API_KEY'),
      model: this.configService.get<string>('GROQ_MODEL') || 'llama-3.3-70b-versatile',
    };
  }

  async calculateSynergyScore(profileA: Record<string, any>, profileB: Record<string, any>): Promise<SynergyMatchResult> {
    const openAiConfig = this.getOpenAiConfig();
    const groqConfig = this.getGroqConfig();

    const prompt = `Analyze synergy between Profile A and Profile B for a startup partnership.
Profile A: ${JSON.stringify(profileA)}
Profile B: ${JSON.stringify(profileB)}

Return valid JSON with:
"matchScore" (integer 0-100),
"synergyAnalysis" (string explanation),
"recommendedRoles" (array of strings)`;

    // 1. Try Primary Canonical Provider: OpenAI (only if real sk- key provided)
    if (openAiConfig.apiKey && openAiConfig.apiKey.startsWith('sk-') && !openAiConfig.apiKey.includes('your_')) {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openAiConfig.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: openAiConfig.model,
            messages: [{ role: 'user', content: prompt }],
            response_format: { type: 'json_object' },
            temperature: 0.2,
          }),
        });

        const data = (await response.json()) as any;
        if (response.ok && data.choices?.[0]?.message?.content) {
          const parsed = JSON.parse(data.choices[0].message.content);
          return {
            matchScore: parsed.matchScore || 85,
            synergyAnalysis: parsed.synergyAnalysis || 'Strong complementary skills and aligned startup intents.',
            recommendedRoles: parsed.recommendedRoles || ['Co-founder', 'Technical Advisor'],
            provider: 'openai',
            model: openAiConfig.model,
          };
        }
        this.logger.warn(`OpenAI API request failed: ${JSON.stringify(data)}. Attempting fallback...`);
      } catch (err) {
        this.logger.warn(`OpenAI API call error: ${(err as Error).message}. Attempting fallback...`);
      }
    }

    // 2. Try Optional Fallback Provider: Groq (only if real gsk_ key provided)
    if (groqConfig.apiKey && groqConfig.apiKey.startsWith('gsk_') && !groqConfig.apiKey.includes('your_')) {
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${groqConfig.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: groqConfig.model,
            messages: [{ role: 'user', content: prompt }],
            response_format: { type: 'json_object' },
            temperature: 0.2,
          }),
        });

        const data = (await response.json()) as any;
        if (response.ok && data.choices?.[0]?.message?.content) {
          const parsed = JSON.parse(data.choices[0].message.content);
          return {
            matchScore: parsed.matchScore || 85,
            synergyAnalysis: parsed.synergyAnalysis || 'Strong complementary skills and aligned startup intents.',
            recommendedRoles: parsed.recommendedRoles || ['Co-founder', 'Technical Advisor'],
            provider: 'groq',
            model: groqConfig.model,
          };
        }
        this.logger.warn(`Groq API request failed: ${JSON.stringify(data)}.`);
      } catch (err) {
        this.logger.warn(`Groq API call error: ${(err as Error).message}.`);
      }
    }

    // 3. Structured Heuristic Synergy Generator based on Skill & Intent Overlap
    const skillsA: string[] = Array.isArray(profileA.skills)
      ? profileA.skills
      : Array.isArray(profileA.profile?.skills)
      ? profileA.profile.skills
      : [];
    const skillsB: string[] = Array.isArray(profileB.skills)
      ? profileB.skills
      : Array.isArray(profileB.profile?.skills)
      ? profileB.profile.skills
      : [];

    const roleA = profileA.role || profileA.headline || profileA.profile?.headline || profileA.profile?.role || '';
    const roleB = profileB.role || profileB.headline || profileB.profile?.headline || profileB.profile?.role || '';

    let baseScore = 82;
    // Calculate overlap
    const sharedSkills = skillsA.filter((s) => skillsB.some((b) => b.toLowerCase() === s.toLowerCase()));
    if (sharedSkills.length > 0) baseScore += 5;
    if (roleA.toLowerCase().includes('tech') && roleB.toLowerCase().includes('product')) baseScore += 8;
    if (roleA.toLowerCase().includes('ai') || roleB.toLowerCase().includes('ai')) baseScore += 4;

    const score = Math.min(baseScore, 98);

    return {
      matchScore: score,
      synergyAnalysis: `High alignment in complementary domains (${roleA || 'Builder'} & ${roleB || 'Builder'}). High conviction vector fit for early-stage startup collaboration.`,
      recommendedRoles: ['Co-founder', 'Technical Co-founder'],
      provider: 'ai_sandbox',
      model: 'bambifound-hybrid-heuristics-v1',
    };
  }

  async getDiscoverMatches(userId: string) {
    const currentUser = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true, intents: true },
    });

    const candidates = await this.prisma.user.findMany({
      where: {
        id: { not: userId },
      },
      include: {
        profile: true,
        intents: true,
      },
    });

    const currentUserData = {
      fullName: currentUser?.fullName,
      email: currentUser?.email,
      role: currentUser?.profile?.headline || currentUser?.profile?.role || '',
      skills: currentUser?.profile?.skills || [],
      bio: currentUser?.profile?.bio || '',
      onboardingData: currentUser?.onboardingData,
    };

    const results = await Promise.all(
      candidates.map(async (candidate) => {
        const candidateData = {
          fullName: candidate.fullName,
          email: candidate.email,
          role: candidate.profile?.headline || candidate.profile?.role || '',
          skills: candidate.profile?.skills || [],
          bio: candidate.profile?.bio || '',
          onboardingData: candidate.onboardingData,
        };

        const synergy = await this.calculateSynergyScore(currentUserData, candidateData);

        // Save/upsert match record in DB
        await this.prisma.match.upsert({
          where: {
            sourceUserId_targetUserId: {
              sourceUserId: userId,
              targetUserId: candidate.id,
            },
          },
          create: {
            sourceUserId: userId,
            targetUserId: candidate.id,
            score: synergy.matchScore,
            reasoning: synergy.synergyAnalysis,
          },
          update: {
            score: synergy.matchScore,
            reasoning: synergy.synergyAnalysis,
          },
        });

        const avatarInitials = candidate.fullName
          ? candidate.fullName
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .substring(0, 2)
          : candidate.email.substring(0, 2).toUpperCase();

        return {
          id: candidate.id,
          name: candidate.fullName || candidate.email,
          role: candidate.profile?.headline || candidate.profile?.role || 'Builder',
          score: synergy.matchScore,
          avatar: avatarInitials,
          avatarUrl: candidate.profile?.avatarUrl,
          tags: candidate.profile?.skills || ['Builder', 'Startup'],
          bio: candidate.profile?.bio || 'Passionate builder in the BambiFound ecosystem.',
          reasoning: synergy.synergyAnalysis,
          bandwidth: candidate.profile?.bandwidth || 'Full-time Co-founder',
          category: candidate.profile?.category || 'Founding Builder',
          location: candidate.profile?.location || 'Remote',
          profile: candidate.profile,
        };
      }),
    );

    return results.sort((a, b) => b.score - a.score);
  }
}
