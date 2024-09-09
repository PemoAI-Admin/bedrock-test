'use server';

import { generateText } from 'ai';
import { bedrock } from '@ai-sdk/amazon-bedrock';

export async function getAnswer(question: string) {
  const { text, finishReason, usage } = await generateText({
    model: bedrock('anthropic.claude-3-haiku-20240307-v1:0'),
    prompt: question,
  });

  return { text, finishReason, usage };
}