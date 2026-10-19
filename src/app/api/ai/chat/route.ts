import { NextResponse } from 'next/server';
import { getAIService } from '@/lib/ai';
import { getSessionUser } from '@/lib/auth';
import { DEMO_USER } from '@/lib/data/seedData';

export async function POST(request: Request) {
  try {
    const session = await getSessionUser();
    const user = session || DEMO_USER;

    const body = await request.json();
    const { message, messages, context } = body;

    const chatHistory = messages || (message ? [{ role: 'user', content: message }] : []);
    if (chatHistory.length === 0) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const ai = getAIService();
    const reply = await ai.chat(chatHistory, {
      studentName: user.name,
      targetExam: user.targetExamName || 'MDCAT / ECAT / NET',
      ...context,
    });

    return NextResponse.json({
      success: true,
      reply,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'AI service error' }, { status: 500 });
  }
}
