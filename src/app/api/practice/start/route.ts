import { NextResponse } from 'next/server';
import { dataStore } from '@/lib/storage';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('mode') || 'QUICK';
  const topicSlug = searchParams.get('topic');
  const difficulty = searchParams.get('difficulty');
  const count = parseInt(searchParams.get('count') || '5', 10);

  let filtered = [...dataStore.questions];

  if (topicSlug) {
    const topic = dataStore.topics.find(t => t.slug === topicSlug);
    if (topic) {
      filtered = filtered.filter(q => q.topicId === topic.id);
    }
  }

  if (difficulty) {
    filtered = filtered.filter(q => q.difficulty === difficulty.toUpperCase());
  }

  if (mode === 'WEAK_TOPIC') {
    // Return questions from weak topics or questions where mistakes were logged
    const mistakeQIds = dataStore.mistakes.map(m => m.questionId);
    const weakQuestions = filtered.filter(q => mistakeQIds.includes(q.id));
    if (weakQuestions.length > 0) {
      filtered = weakQuestions;
    }
  }

  // Fallback if filter too narrow
  if (filtered.length === 0) {
    filtered = [...dataStore.questions];
  }

  const selectedQuestions = filtered.slice(0, count);

  return NextResponse.json({
    sessionId: `session-${Date.now()}`,
    mode,
    totalQuestions: selectedQuestions.length,
    questions: selectedQuestions,
  });
}
