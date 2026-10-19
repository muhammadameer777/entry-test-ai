import { Difficulty, MistakeType } from '@/types';

export interface PerformanceInput {
  totalAttempts: number;
  correctAttempts: number;
  averageTimeSeconds: number;
  estimatedTimeSeconds: number;
  recentAttempts: Array<{
    isCorrect: boolean;
    difficulty: Difficulty | string;
    timeSpentSeconds: number;
    mistakeType?: MistakeType | any;
  }>;
}

export function calculateTopicMastery(input: PerformanceInput): number {
  if (input.totalAttempts === 0) return 0;

  // 1. Base Accuracy (0 to 40 points)
  const rawAccuracy = input.correctAttempts / input.totalAttempts;
  const accuracyScore = rawAccuracy * 40;

  // 2. Recent Momentum (last 5 attempts) (0 to 30 points)
  const recent = input.recentAttempts.slice(-5);
  let recentScore = 0;
  if (recent.length > 0) {
    const recentCorrect = recent.filter(r => r.isCorrect).length;
    recentScore = (recentCorrect / recent.length) * 30;
  } else {
    recentScore = (input.correctAttempts / input.totalAttempts) * 30;
  }

  // 3. Difficulty Calibration (0 to 20 points)
  // Reward successfully answering Medium/Hard/Expert questions
  let difficultyWeightedCorrect = 0;
  let difficultyWeightedTotal = 0;
  for (const att of input.recentAttempts) {
    let weight = 1.0;
    if (att.difficulty === 'MEDIUM') weight = 1.3;
    if (att.difficulty === 'HARD') weight = 1.7;
    if (att.difficulty === 'EXPERT') weight = 2.2;

    difficultyWeightedTotal += weight;
    if (att.isCorrect) {
      difficultyWeightedCorrect += weight;
    }
  }
  const difficultyScore = difficultyWeightedTotal > 0 
    ? (difficultyWeightedCorrect / difficultyWeightedTotal) * 20 
    : 10;

  // 4. Speed & Time Efficiency (0 to 10 points)
  // Benchmark: within estimated time
  const targetTime = input.estimatedTimeSeconds || 60;
  const timeRatio = targetTime / Math.max(input.averageTimeSeconds, 20);
  const speedScore = Math.min(10, Math.max(2, timeRatio * 8));

  // Combine and round
  const totalMastery = Math.round(accuracyScore + recentScore + difficultyScore + speedScore);
  return Math.min(100, Math.max(0, totalMastery));
}

export function evaluateWeakTopics(topics: Array<{
  id: string;
  name: string;
  subjectName: string;
  masteryScore: number;
  accuracy: number;
  totalAttempts: number;
  averageTimeSeconds: number;
  repeatedMistakesCount?: number;
}>) {
  const weakTopics = topics.filter(t => {
    if (t.totalAttempts < 3) return false;
    return t.masteryScore < 55 || t.accuracy < 55 || (t.repeatedMistakesCount && t.repeatedMistakesCount >= 2);
  });

  const strongTopics = topics.filter(t => {
    return t.totalAttempts >= 5 && t.masteryScore >= 75 && t.accuracy >= 75;
  });

  return { weakTopics, strongTopics };
}

export function calculateExamReadiness(params: {
  overallAccuracy: number;
  topicMasteryAverage: number;
  averageTimeSeconds: number;
  targetSecondsPerQuestion: number;
  streakDays: number;
  mockTestAveragePercentage: number;
}): {
  overallScore: number;
  knowledgeScore: number;
  accuracyScore: number;
  speedScore: number;
  consistencyScore: number;
  tier: 'NOVICE' | 'DEVELOPING' | 'COMPETITIVE' | 'EXAM_READY';
} {
  // Knowledge (35%): average topic mastery
  const knowledgeScore = Math.min(100, Math.max(0, Math.round(params.topicMasteryAverage)));

  // Accuracy (25%): MCQ practice + mock test accuracy
  const effectiveAccuracy = params.mockTestAveragePercentage > 0 
    ? (params.overallAccuracy * 0.5 + params.mockTestAveragePercentage * 0.5) 
    : params.overallAccuracy;
  const accuracyScore = Math.min(100, Math.max(0, Math.round(effectiveAccuracy)));

  // Speed (20%): comparison against target exam benchmark (typically 45-60s)
  const speedRatio = params.targetSecondsPerQuestion / Math.max(params.averageTimeSeconds, 20);
  const speedScore = Math.min(100, Math.max(15, Math.round(speedRatio * 85)));

  // Consistency (20%): streak and regular engagement
  const consistencyScore = Math.min(100, Math.max(20, Math.round(Math.min(params.streakDays, 14) / 14 * 100)));

  const overall = Math.round(
    knowledgeScore * 0.35 +
    accuracyScore * 0.25 +
    speedScore * 0.20 +
    consistencyScore * 0.20
  );

  let tier: 'NOVICE' | 'DEVELOPING' | 'COMPETITIVE' | 'EXAM_READY' = 'NOVICE';
  if (overall >= 80) tier = 'EXAM_READY';
  else if (overall >= 65) tier = 'COMPETITIVE';
  else if (overall >= 45) tier = 'DEVELOPING';

  return {
    overallScore: overall,
    knowledgeScore,
    accuracyScore,
    speedScore,
    consistencyScore,
    tier,
  };
}

export function generateSmartRecommendations(params: {
  examName: string;
  daysRemaining: number;
  weakTopics: Array<{ name: string; subjectName: string; accuracy: number; averageTimeSeconds: number }>;
  strongTopics: Array<{ name: string; subjectName: string }>;
  unresolvedMistakesCount: number;
  accuracy: number;
}) {
  const recommendations: Array<{
    id: string;
    title: string;
    description: string;
    reason: string;
    actionLabel: string;
    actionUrl: string;
    badge: 'HIGH_PRIORITY' | 'SPEED_FOCUS' | 'REVIEW' | 'CHALLENGE';
  }> = [];

  if (params.weakTopics.length > 0) {
    const weakest = params.weakTopics[0];
    recommendations.push({
      id: 'rec-weak-1',
      title: `Practice 10 Medium Questions in ${weakest.name}`,
      description: `Solidify core concepts in ${weakest.subjectName} before moving to timed tests.`,
      reason: `Your accuracy in ${weakest.name} is currently ${weakest.accuracy.toFixed(0)}%, taking an average of ${Math.round(weakest.averageTimeSeconds)}s per question.`,
      actionLabel: 'Start Practice Drill',
      actionUrl: `/practice?mode=WEAK_TOPIC`,
      badge: 'HIGH_PRIORITY',
    });
  }

  if (params.unresolvedMistakesCount > 0) {
    recommendations.push({
      id: 'rec-mistakes',
      title: `Review ${params.unresolvedMistakesCount} Unresolved Mistakes`,
      description: `Clear recent errors from your Mistake Notebook to prevent recurring traps.`,
      reason: `You have ${params.unresolvedMistakesCount} questions where concept or careless mistakes were recorded.`,
      actionLabel: 'Open Mistake Notebook',
      actionUrl: `/mistakes`,
      badge: 'REVIEW',
    });
  }

  recommendations.push({
    id: 'rec-mock',
    title: `Take a 30-Minute ${params.examName} Mini-Mock Test`,
    description: `Simulate authentic test pressure with section timing and negative marking rules.`,
    reason: `With ${params.daysRemaining} days remaining, regular simulated testing trains exam pacing.`,
    actionLabel: 'Launch Mock Test',
    actionUrl: `/tests`,
    badge: 'CHALLENGE',
  });

  return recommendations;
}
