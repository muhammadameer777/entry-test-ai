import { NextResponse } from 'next/server';
import { dataStore } from '@/lib/storage';
import { getSessionUser } from '@/lib/auth';
import { DEMO_USER } from '@/lib/data/seedData';

export async function POST(request: Request) {
  try {
    const session = await getSessionUser();
    const userId = session?.id || DEMO_USER.id;

    const body = await request.json();
    const { questionId, selectedOption, timeSpentSeconds, mistakeType } = body;

    if (!questionId || !selectedOption) {
      return NextResponse.json({ error: 'Question ID and selected option are required' }, { status: 400 });
    }

    const result = dataStore.recordAttempt({
      userId,
      questionId,
      selectedOption,
      timeSpentSeconds: timeSpentSeconds || 30,
      mistakeType: mistakeType || 'CONCEPT',
    });

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Submission failed' }, { status: 500 });
  }
}
