import { NextResponse } from 'next/server';
import { dataStore } from '@/lib/storage';
import { getSessionUser } from '@/lib/auth';
import { DEMO_USER } from '@/lib/data/seedData';
import { calculateExamReadiness } from '@/lib/adaptive';

export async function GET() {
  const session = await getSessionUser();
  const userId = session?.id || DEMO_USER.id;

  const progress = dataStore.getStudentProgress(userId);
  const readiness = calculateExamReadiness({
    overallAccuracy: progress.accuracy,
    topicMasteryAverage: 78,
    averageTimeSeconds: 48,
    targetSecondsPerQuestion: 54,
    streakDays: progress.user.streak,
    mockTestAveragePercentage: 78,
  });

  return NextResponse.json({
    user: progress.user,
    accuracy: progress.accuracy,
    totalQuestions: progress.totalQuestionsSolved,
    readiness,
    topics: progress.topicStats,
  });
}
