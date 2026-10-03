import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

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

  constructor(private readonly configService: ConfigService) {}

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

    // 1. Try Primary Canonical Provider: OpenAI
    if (openAiConfig.apiKey && openAiConfig.apiKey !== 'your_openai_api_key_here') {
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

    // 2. Try Optional Fallback Provider: Groq
    if (groqConfig.apiKey && groqConfig.apiKey !== 'your_groq_api_key_here') {
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

    // 3. Fallback Sandbox Generator
    this.logger.log('Neither OpenAI nor Groq keys provided/working. Using deterministic AI sandbox match response.');
    return {
      matchScore: 92,
      synergyAnalysis: 'High alignment in technical domain expertise and product Vision. Profile A complements Profile B in growth and go-to-market execution.',
      recommendedRoles: ['Technical Co-founder', 'Product Lead'],
      provider: 'ai_sandbox',
      model: 'bambifound-hybrid-heuristics-v1',
    };
  }
}
