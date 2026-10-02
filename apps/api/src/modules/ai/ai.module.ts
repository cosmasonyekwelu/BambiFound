import { Module } from '@nestjs/common';
import { AIService } from './ai.service';
import { OpenAIProvider } from './providers/openai.provider';
import { GroqProvider } from './providers/groq.provider';

@Module({
  providers: [AIService, OpenAIProvider, GroqProvider],
  exports: [AIService],
})
export class AIModule {}
