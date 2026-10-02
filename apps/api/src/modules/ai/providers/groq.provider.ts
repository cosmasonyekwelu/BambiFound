import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Groq from 'groq-sdk';
import { AIServicePromptOptions, AIServiceResponse, AIProviderName } from '@bambifound/types';
import { IAIProvider } from '../interfaces/ai-provider.interface';

@Injectable()
export class GroqProvider implements IAIProvider {
  private readonly logger = new Logger(GroqProvider.name);
  private client: Groq | null = null;
  public readonly name = AIProviderName.GROQ;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('ai.groqApiKey');
    if (apiKey && apiKey !== 'gsk_placeholder') {
      this.client = new Groq({ apiKey });
    }
  }

  isAvailable(): boolean {
    return this.client !== null;
  }

  async generateText(options: AIServicePromptOptions): Promise<AIServiceResponse> {
    if (!this.client) {
      throw new Error('Groq client is not configured');
    }

    this.logger.log('Generating text with Groq (fallback provider)');
    const response = await this.client.chat.completions.create({
      model: 'llama3-70b-8192',
      messages: [
        ...(options.systemInstruction ? [{ role: 'system' as const, content: options.systemInstruction }] : []),
        { role: 'user' as const, content: options.prompt },
      ],
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 1000,
    });

    const content = response.choices[0]?.message?.content || '';
    return {
      content,
      provider: AIProviderName.GROQ,
      tokensUsed: response.usage?.total_tokens,
    };
  }
}
