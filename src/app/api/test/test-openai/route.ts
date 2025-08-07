import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET() {
  try {
    // Test with a simple completion
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "Say 'Hello, API is working!' in one sentence."
        }
      ],
      max_tokens: 50,
    });

    return NextResponse.json({
      success: true,
      message: completion.choices[0]?.message?.content,
      model: completion.model,
      usage: completion.usage
    });

  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      type: error.type,
      code: error.code,
      status: error.status
    }, { status: 500 });
  }
}
