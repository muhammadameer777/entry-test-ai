import { NextResponse } from 'next/server';
import { dataStore } from '@/lib/storage';
import { getSessionUser } from '@/lib/auth';

export async function GET() {
  const session = await getSessionUser();
  if (session && session.role === 'STUDENT') {
    return NextResponse.json({ error: 'Unauthorized: Admin role required' }, { status: 403 });
  }

  return NextResponse.json({
    total: dataStore.questions.length,
    questions: dataStore.questions,
  });
}

export async function POST(request: Request) {
  try {
    const session = await getSessionUser();
    if (session && session.role === 'STUDENT') {
      return NextResponse.json({ error: 'Unauthorized: Admin role required' }, { status: 403 });
    }

    const body = await request.json();
    const newQuestion = {
      id: `q-adm-${Date.now()}`,
      examId: body.examId || 'exam-mdcat',
      subjectId: body.subjectId || 'sub-phy',
      chapterId: body.chapterId || 'chap-mechanics',
      topicId: body.topicId || 'top-newton',
      questionText: body.questionText,
      optionA: body.optionA,
      optionB: body.optionB,
      optionC: body.optionC,
      optionD: body.optionD,
      correctOption: body.correctOption,
      explanation: body.explanation,
      whyOthersWrong: body.whyOthersWrong || '',
      hint: body.hint || '',
      difficulty: body.difficulty || 'MEDIUM',
      questionType: body.questionType || 'CONCEPTUAL',
      estimatedTimeSeconds: body.estimatedTimeSeconds || 60,
      tags: body.tags || '',
      source: body.source || 'Admin Upload',
      status: 'PUBLISHED' as const,
      formulaLatex: body.formulaLatex || '',
      aiConfidence: 1.0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dataStore.questions.unshift(newQuestion as any);

    return NextResponse.json({
      success: true,
      question: newQuestion,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Creation failed' }, { status: 500 });
  }
}
