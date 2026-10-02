import { Injectable, Logger } from '@nestjs/common';
import { AIServicePromptOptions, AIServiceResponse, AIProviderName } from '@bambifound/types';
import { OpenAIProvider } from './providers/openai.provider';
import { GroqProvider } from './providers/groq.provider';

@Injectable()
export class AIService {
  private readonly logger = new Logger(AIService.name);

  constructor(
    private openAIProvider: OpenAIProvider,
    private groqProvider: GroqProvider,
  ) {}

  async generateCompletion(options: AIServicePromptOptions): Promise<AIServiceResponse> {
    if (this.openAIProvider.isAvailable()) {
      try {
        return await this.openAIProvider.generateText(options);
      } catch (error) {
        this.logger.warn(`Primary AI provider (OpenAI) failed, failing over to Groq: ${error}`);
      }
    }

    if (this.groqProvider.isAvailable()) {
      try {
        return await this.groqProvider.generateText(options);
      } catch (error) {
        this.logger.warn(`Fallback AI provider (Groq) failed: ${error}`);
      }
    }

    this.logger.log('No live AI provider configured. Returning simulated AI response.');
    return {
      content: `[Simulated AI Response for: "${options.prompt.slice(0, 50)}..."] BambiFound AI is ready. Decoupled provider architecture initialized.`,
      provider: AIProviderName.OPENAI,
      tokensUsed: 0,
    };
  }
}
