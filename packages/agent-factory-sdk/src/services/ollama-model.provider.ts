import { createOllama } from 'ollama-ai-provider-v2';
import { LanguageModel } from 'ai';

type ModelProvider = {
  resolveModel: (modelName: string) => LanguageModel;
};

export type OllamaModelProviderOptions = {
  baseUrl?: string;
  defaultModel?: string;
};

export function createOllamaModelProvider({
  baseUrl,
  defaultModel,
}: OllamaModelProviderOptions = {}): ModelProvider {
  const ollama = createOllama({
    baseURL: baseUrl,
  });

  return {
    resolveModel: (modelName) => {
      const finalModel = modelName || defaultModel;
      if (!finalModel) {
        throw new Error(
          "[AgentFactory] Missing Ollama model. Provide it as 'ollama/<model-name>' or set OLLAMA_MODEL.",
        );
      }
      return ollama(finalModel);
    },
  };
}
