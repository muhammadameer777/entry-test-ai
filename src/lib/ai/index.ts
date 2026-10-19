import { AIService } from './types';
import { MockAIService } from './mockProvider';
import { GeminiAIService } from './geminiProvider';

let aiServiceInstance: AIService | null = null;

export function getAIService(): AIService {
  if (aiServiceInstance) {
    return aiServiceInstance;
  }

  const provider = (process.env.AI_PROVIDER || 'mock').toLowerCase();
  const geminiKey = process.env.GEMINI_API_KEY;
  const model = process.env.AI_MODEL || 'gemini-1.5-flash';

  if ((provider === 'gemini' || !process.env.AI_PROVIDER) && geminiKey && geminiKey.trim().length > 0) {
    aiServiceInstance = new GeminiAIService(geminiKey, model);
  } else {
    // Default to the intelligent pedagogical mock provider
    aiServiceInstance = new MockAIService();
  }

  return aiServiceInstance;
}

export * from './types';
export { MockAIService } from './mockProvider';
export { GeminiAIService } from './geminiProvider';
