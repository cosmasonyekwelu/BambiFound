import { AIServicePromptOptions, AIServiceResponse } from '@bambifound/types';

export interface IAIProvider {
  name: string;
  generateText(options: AIServicePromptOptions): Promise<AIServiceResponse>;
  isAvailable(): boolean;
}
