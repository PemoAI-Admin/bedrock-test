import { bedrock } from '@ai-sdk/amazon-bedrock';
import { convertToCoreMessages, streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  // Call the language model
  const result = await streamText({
    model: bedrock('anthropic.claude-3-haiku-20240307-v1:0'),
    messages: convertToCoreMessages(messages),
    async onFinish({ text, toolCalls, toolResults, usage, finishReason }) {
      console.log(text);
      // implement your own logic here, e.g. for storing messages
      // or recording token usage
    },
  });

  // Respond with the stream
  return result.toDataStreamResponse();
}