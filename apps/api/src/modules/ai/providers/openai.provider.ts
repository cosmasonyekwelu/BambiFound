import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { AIServicePromptOptions, AIServiceResponse, AIProviderName } from '@bambifound/types';
import { IAIProvider } from '../interfaces/ai-provider.interface';

@Injectable()
export class OpenAIProvider implements IAIProvider {
  private readonly logger = new Logger(OpenAIProvider.name);
  private client: OpenAI | null = null;
  public readonly name = AIProviderName.OPENAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('ai.openaiApiKey');
    if (apiKey && apiKey !== 'sk-proj-placeholder') {
      this.client = new OpenAI({ apiKey });
    }
  }

  isAvailable(): boolean {
    return this.client !== null;
  }

  async generateText(options: AIServicePromptOptions): Promise<AIServiceResponse> {
    if (!this.client) {
      throw new Error('OpenAI client is not configured');
    }

    this.logger.log('Generating text with OpenAI');
    const response = await this.client.chat.completions.create({
      model: 'gpt-4o-mini',
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
      provider: AIProviderName.OPENAI,
      tokensUsed: response.usage?.total_tokens,
    };
  }
}
