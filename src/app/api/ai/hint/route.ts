import { NextResponse } from 'next/server';
import { getAIService } from '@/lib/ai';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { questionText, options, hintLevel, userAnswer } = body;

    if (!questionText || !options) {
      return NextResponse.json({ error: 'Question text and options are required' }, { status: 400 });
    }

    const ai = getAIService();
    const result = await ai.getSocraticHint({
      questionText,
      options,
      hintLevel: (hintLevel || 1) as 1 | 2,
      userAnswer,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to get hint' }, { status: 500 });
  }
}
