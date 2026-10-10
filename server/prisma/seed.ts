import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await argon2.hash('Password123!', { type: argon2.argon2id });

  // Seed Elena Vance
  const elena = await prisma.user.upsert({
    where: { email: 'elena.vance@example.com' },
    update: {},
    create: {
      id: 'elena-vance',
      email: 'elena.vance@example.com',
      passwordHash,
      fullName: 'Elena Vance',
      emailVerified: true,
      onboardingCompleted: true,
      membershipTier: 'PLUS',
      profile: {
        create: {
          headline: 'AI Systems Architect & Ex-Scale AI Lead',
          bio: 'Ex-Scale AI Lead building autonomous data pipeline compilers. Looking for a commercial product co-founder.',
          location: 'San Francisco, CA (Remote)',
          role: 'AI Systems Architect',
          bandwidth: 'Full-time Co-founder',
          category: 'AI Architect',
          skills: ['LLM Orchestration', 'PyTorch', 'Distributed Systems', 'Founding Tech'],
          interests: ['AI Infrastructure', 'Developer Tools'],
        },
      },
      intents: {
        create: {
          intentType: 'FOUNDER_MATCH',
          naturalLanguageDesc: 'Looking for a commercial product co-founder for AI systems',
        },
      },
    },
  });

  // Seed Marcus Thorne
  const marcus = await prisma.user.upsert({
    where: { email: 'marcus.thorne@example.com' },
    update: {},
    create: {
      id: 'marcus-thorne',
      email: 'marcus.thorne@example.com',
      passwordHash,
      fullName: 'Marcus Thorne',
      emailVerified: true,
      onboardingCompleted: true,
      membershipTier: 'FREE',
      profile: {
        create: {
          headline: 'Full-Stack Product Engineer',
          bio: 'Scaled B2B infrastructure from seed to Series B. Passionate about developer tooling and high-velocity shipping.',
          location: 'New York, NY',
          role: 'Full-Stack Product Engineer',
          bandwidth: 'Full-time Co-founder',
          category: 'Founding Engineer',
          skills: ['TypeScript', 'Next.js', 'PostgreSQL', 'Rust'],
          interests: ['Developer Tooling', 'B2B SaaS'],
        },
      },
      intents: {
        create: {
          intentType: 'JOIN_STARTUP',
          naturalLanguageDesc: 'Seeking equity-first co-founder role in high-velocity startup',
        },
      },
    },
  });

  // Seed Dr. Priya Desai
  const priya = await prisma.user.upsert({
    where: { email: 'priya.desai@example.com' },
    update: {},
    create: {
      id: 'priya-desai',
      email: 'priya.desai@example.com',
      passwordHash,
      fullName: 'Dr. Priya Desai',
      emailVerified: true,
      onboardingCompleted: true,
      membershipTier: 'PRO',
      profile: {
        create: {
          headline: 'Bio-AI Research Lead & Stanford PhD',
          bio: 'Looking for technical co-founder with strong software architecture experience to commercialize IP.',
          location: 'Boston, MA',
          role: 'Bio-AI Research Lead',
          bandwidth: 'Full-time Co-founder',
          category: 'Product Lead',
          skills: ['Computational Biology', 'Python', 'Grant Funding', 'Drug Discovery'],
          interests: ['DeepTech', 'BioTech'],
        },
      },
      intents: {
        create: {
          intentType: 'FOUNDER_MATCH',
          naturalLanguageDesc: 'Looking for technical co-founder to commercialize Stanford bio-AI IP',
        },
      },
    },
  });

  console.log('Successfully seeded database:', { elena: elena.id, marcus: marcus.id, priya: priya.id });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
