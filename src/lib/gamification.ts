import { Difficulty } from '@/types';

export function calculateXPForAttempt(isCorrect: boolean, difficulty: Difficulty | string, timeSpentSeconds: number): number {
  if (!isCorrect) {
    return 2; // consolation XP for attempting and learning
  }

  let xp = 10;
  if (difficulty === 'MEDIUM') xp = 15;
  if (difficulty === 'HARD') xp = 25;
  if (difficulty === 'EXPERT') xp = 40;

  // Speed bonus if answered correctly in under 40 seconds
  if (timeSpentSeconds > 0 && timeSpentSeconds < 40) {
    xp += 5;
  }

  return xp;
}

export function getLevelFromXP(xp: number): { level: number; currentXP: number; nextLevelXP: number; progressPercent: number } {
  // Level threshold formula: level n requires n * 150 total XP
  const level = Math.floor(Math.sqrt(xp / 100)) + 1;
  const currentLevelBaseXP = Math.pow(level - 1, 2) * 100;
  const nextLevelBaseXP = Math.pow(level, 2) * 100;
  const diff = nextLevelBaseXP - currentLevelBaseXP;
  const progressInLevel = xp - currentLevelBaseXP;
  const progressPercent = Math.min(100, Math.max(0, Math.round((progressInLevel / (diff || 1)) * 100)));

  return {
    level,
    currentXP: xp,
    nextLevelXP: nextLevelBaseXP,
    progressPercent,
  };
}

export const INITIAL_ACHIEVEMENTS = [
  {
    slug: 'first-step',
    title: 'First Step',
    description: 'Solve your first 5 entry test MCQs.',
    icon: '🚀',
    xpReward: 50,
    badgeColor: '#10b981',
    criteriaType: 'QUESTIONS_SOLVED',
    criteriaThreshold: 5,
  },
  {
    slug: 'streak-champion',
    title: 'Consistency Champion',
    description: 'Maintain a 7-day continuous study streak.',
    icon: '🔥',
    xpReward: 150,
    badgeColor: '#f59e0b',
    criteriaType: 'STREAK',
    criteriaThreshold: 7,
  },
  {
    slug: 'century-solver',
    title: 'Century Solver',
    description: 'Complete 100 practice MCQs across all subjects.',
    icon: '💯',
    xpReward: 250,
    badgeColor: '#6366f1',
    criteriaType: 'QUESTIONS_SOLVED',
    criteriaThreshold: 100,
  },
  {
    slug: 'physics-master',
    title: 'Newtonian Prodigy',
    description: 'Attain 80%+ topic mastery in Mechanics & Kinematics.',
    icon: '⚛️',
    xpReward: 200,
    badgeColor: '#3b82f6',
    criteriaType: 'ACCURACY',
    criteriaThreshold: 80,
  },
  {
    slug: 'speed-demon',
    title: 'Speed Solver',
    description: 'Solve 10 questions with under 35 seconds average time.',
    icon: '⚡',
    xpReward: 120,
    badgeColor: '#8b5cf6',
    criteriaType: 'SPEED',
    criteriaThreshold: 10,
  },
  {
    slug: 'mock-warrior',
    title: 'Mock Warrior',
    description: 'Complete your first full-length entry test simulation.',
    icon: '🏆',
    xpReward: 300,
    badgeColor: '#ec4899',
    criteriaType: 'MOCK_TEST',
    criteriaThreshold: 1,
  },
];
