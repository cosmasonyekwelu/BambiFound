-- AlterTable
ALTER TABLE "users" ADD COLUMN     "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "onboardingData" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "onboardingSkipped" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "onboardingStep" INTEGER NOT NULL DEFAULT 1;
