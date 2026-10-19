export type Role = 'STUDENT' | 'TEACHER' | 'ADMIN' | 'SUPER_ADMIN';

export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD' | 'EXPERT';

export type QuestionType = 'CONCEPTUAL' | 'NUMERICAL' | 'APPLICATION' | 'REASONING' | 'MIXED';

export type QuestionStatus = 'DRAFT' | 'REVIEW' | 'PUBLISHED' | 'FLAGGED';

export type PracticeMode = 
  | 'QUICK' 
  | 'TOPIC' 
  | 'WEAK_TOPIC' 
  | 'SPEED_DRILL' 
  | 'DAILY_CHALLENGE' 
  | 'MOCK_TEST' 
  | 'REAL_EXAM' 
  | 'AI_QUIZ';

export type MistakeType = 
  | 'CONCEPT' 
  | 'CALCULATION' 
  | 'CARELESS' 
  | 'MISREADING' 
  | 'GUESSING' 
  | 'TIME_PRESSURE';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: Role;
  educationLevel?: string;
  targetExamId?: string;
  targetExamName?: string;
  targetExamDate?: string;
  dailyStudyTimeMinutes: number;
  targetUniversity?: string;
  currentLevel: number;
  xp: number;
  streak: number;
  longestStreak: number;
  avatar?: string;
}

export interface ExamInfo {
  id: string;
  name: string;
  slug: string;
  description: string;
  totalQuestions: number;
  durationMinutes: number;
  negativeMarking: number;
  subjectsCount?: number;
  syllabus?: any;
}

export interface SubjectInfo {
  id: string;
  examId: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  order: number;
  chaptersCount?: number;
  questionsCount?: number;
}

export interface ChapterInfo {
  id: string;
  subjectId: string;
  name: string;
  slug: string;
  description?: string;
  order: number;
  topicsCount?: number;
}

export interface TopicInfo {
  id: string;
  chapterId: string;
  name: string;
  slug: string;
  description?: string;
  masteryWeight: number;
  order: number;
  masteryScore?: number;
  questionsCount?: number;
}

export interface QuestionItem {
  id: string;
  examId: string;
  subjectId: string;
  chapterId: string;
  topicId: string;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: string;
  explanation: string;
  whyOthersWrong?: string;
  hint?: string;
  difficulty: Difficulty | string;
  questionType: QuestionType | string;
  estimatedTimeSeconds: number;
  tags?: string;
  source?: string;
  status: QuestionStatus | string;
  formulaLatex?: string;
  aiConfidence?: number;
  subjectName?: string;
  topicName?: string;
}

export interface QuestionAttemptResult {
  questionId: string;
  selectedOption: string;
  isCorrect: boolean;
  timeSpentSeconds: number;
  mistakeType?: MistakeType;
  explanation: string;
  correctOption: string;
  whyOthersWrong?: string;
}

export interface UserTopicProgressItem {
  topicId: string;
  topicName: string;
  subjectName: string;
  totalAttempts: number;
  correctAttempts: number;
  accuracy: number;
  averageTimeSeconds: number;
  masteryScore: number;
  lastAttemptAt: string;
}

export interface MistakeItem {
  id: string;
  userId?: string;
  questionId: string;
  studentAnswer: string;
  correctOption: string;
  mistakeType: MistakeType | string;
  notes?: string;
  resolved: boolean;
  retryCount: number;
  createdAt: string;
  question: QuestionItem;
}

export interface FlashcardItem {
  id: string;
  topicId?: string;
  front: string;
  back: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  repetitions: number;
  intervalDays: number;
  nextReviewDate: string;
}

export interface NoteItem {
  id: string;
  topicId?: string;
  title: string;
  content: string;
  tags?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MockTestInfo {
  id: string;
  examId: string;
  examName: string;
  title: string;
  description: string;
  durationMinutes: number;
  totalQuestions: number;
  passingPercentage: number;
  negativeMarkingRatio: number;
  isOfficial: boolean;
}

export interface MockTestResult {
  attemptId: string;
  mockTestId: string;
  testTitle: string;
  score: number;
  maxScore: number;
  percentage: number;
  accuracy: number;
  correctCount: number;
  incorrectCount: number;
  skippedCount: number;
  timeSpentSeconds: number;
  totalQuestions: number;
  subjectBreakdown: Array<{
    subject: string;
    correct: number;
    total: number;
    accuracy: number;
  }>;
  aiAnalysis?: {
    overallSummary: string;
    strengths: string[];
    weaknesses: string[];
    speedAnalysis: string;
    actionableRecommendations: string[];
    predictedExamScore: string;
  };
}

export interface AchievementItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  xpReward: number;
  badgeColor: string;
  unlocked: boolean;
  unlockedAt?: string;
  progressPercent: number;
}
