import { 
  SEED_EXAMS, 
  SEED_SUBJECTS, 
  SEED_CHAPTERS, 
  SEED_TOPICS, 
  SEED_QUESTIONS, 
  SEED_MOCK_TESTS,
  DEMO_USER,
  DEMO_ADMIN
} from './data/seedData';
import { 
  QuestionItem, 
  MistakeItem, 
  FlashcardItem, 
  NoteItem, 
  QuestionAttemptResult,
  UserTopicProgressItem,
  MockTestResult,
  AchievementItem
} from '@/types';
import { INITIAL_ACHIEVEMENTS, calculateXPForAttempt, getLevelFromXP } from './gamification';
import { calculateTopicMastery } from './adaptive';

// Global In-Memory and Persistent Storage Store
class DataStore {
  users: any[] = [DEMO_USER, DEMO_ADMIN];
  exams = [...SEED_EXAMS];
  subjects = [...SEED_SUBJECTS];
  chapters = [...SEED_CHAPTERS];
  topics = [...SEED_TOPICS];
  questions: QuestionItem[] = [...SEED_QUESTIONS];
  mockTests = [...SEED_MOCK_TESTS];
  
  attempts: Array<{
    id: string;
    userId: string;
    questionId: string;
    selectedOption: string;
    isCorrect: boolean;
    timeSpentSeconds: number;
    mistakeType?: any;
    createdAt: string;
  }> = [
    {
      id: 'att-1',
      userId: DEMO_USER.id,
      questionId: 'q-phy-01',
      selectedOption: 'B',
      isCorrect: true,
      timeSpentSeconds: 38,
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      id: 'att-2',
      userId: DEMO_USER.id,
      questionId: 'q-chem-02',
      selectedOption: 'A',
      isCorrect: false,
      timeSpentSeconds: 68,
      mistakeType: 'CONCEPT',
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    },
    {
      id: 'att-3',
      userId: DEMO_USER.id,
      questionId: 'q-math-02',
      selectedOption: 'A',
      isCorrect: false,
      timeSpentSeconds: 85,
      mistakeType: 'CALCULATION',
      createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    }
  ];

  mistakes: MistakeItem[] = [
    {
      id: 'mis-1',
      questionId: 'q-chem-02',
      studentAnswer: 'A',
      correctOption: 'B',
      mistakeType: 'CONCEPT',
      notes: 'Remember concentrated H2SO4 is required to generate the nitronium electrophile NO2+.',
      resolved: false,
      retryCount: 1,
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      question: SEED_QUESTIONS.find(q => q.id === 'q-chem-02')!,
    },
    {
      id: 'mis-2',
      questionId: 'q-math-02',
      studentAnswer: 'A',
      correctOption: 'B',
      mistakeType: 'CALCULATION',
      notes: 'Forgot to divide 2I by 2 at the final step of King’s property.',
      resolved: false,
      retryCount: 0,
      createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
      question: SEED_QUESTIONS.find(q => q.id === 'q-math-02')!,
    }
  ];

  flashcards: FlashcardItem[] = [
    {
      id: 'fc-1',
      topicId: 'top-newton',
      front: 'What is the formula for distance covered in the n-th second of uniformly accelerated motion?',
      back: '$$S_n = u + \\frac{a}{2}(2n - 1)$$',
      difficulty: 'MEDIUM',
      repetitions: 3,
      intervalDays: 4,
      nextReviewDate: new Date(Date.now() + 86400000 * 2).toISOString(),
    },
    {
      id: 'fc-2',
      topicId: 'top-hybridization',
      front: 'What is the bond angle and shape of a molecule with sp³d hybridization and no lone pairs (e.g. PCl₅)?',
      back: 'Trigonal bipyramidal; Axial angles are 90°, Equatorial angles are 120°.',
      difficulty: 'HARD',
      repetitions: 1,
      intervalDays: 1,
      nextReviewDate: new Date().toISOString(),
    },
    {
      id: 'fc-3',
      topicId: 'top-organelles',
      front: 'Which organelle is responsible for the synthesis of lipids and steroid hormones?',
      back: 'Smooth Endoplasmic Reticulum (SER).',
      difficulty: 'EASY',
      repetitions: 5,
      intervalDays: 7,
      nextReviewDate: new Date(Date.now() + 86400000 * 5).toISOString(),
    }
  ];

  notes: NoteItem[] = [
    {
      id: 'note-1',
      topicId: 'top-newton',
      title: 'Newtonian Traps in MDCAT / ECAT',
      content: '1. Action-reaction pairs NEVER act on the same body.\n2. In elevators accelerating upward with acceleration a: Apparent weight = m(g + a).\n3. In free fall (cable snap): Apparent weight = 0 (weightlessness).',
      tags: 'Physics, High Yield, Past Paper Notes',
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    },
    {
      id: 'note-2',
      topicId: 'top-hydrocarbons',
      title: 'Benzene Electrophilic Substitution Checklist',
      content: 'Halogenation: X₂ + FeX₃ (Lewis acid catalyst)\nNitration: HNO₃ + H₂SO₄ at 50–60°C\nSulfonation: Fuming H₂SO₄ or SO₃ in H₂SO₄\nFriedel-Crafts Alkylation: R-Cl + AlCl₃\nFriedel-Crafts Acylation: R-COCl + AlCl₃',
      tags: 'Chemistry, Organic, UHS Favorites',
      createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
      updatedAt: new Date(Date.now() - 86400000 * 6).toISOString(),
    }
  ];

  bookmarks: string[] = ['q-phy-03', 'q-math-01'];

  userAchievements: Array<{ userId: string; achievementId: string; unlockedAt: string }> = [
    { userId: DEMO_USER.id, achievementId: 'first-step', unlockedAt: new Date(Date.now() - 86400000 * 10).toISOString() },
    { userId: DEMO_USER.id, achievementId: 'streak-champion', unlockedAt: new Date(Date.now() - 86400000 * 2).toISOString() },
  ];

  testAttempts: MockTestResult[] = [
    {
      attemptId: 'att-mock-1',
      mockTestId: 'mock-mdcat-full-01',
      testTitle: 'MDCAT Grand Diagnostic Mock Exam 2026',
      score: 78,
      maxScore: 100,
      percentage: 78,
      accuracy: 78,
      correctCount: 7,
      incorrectCount: 2,
      skippedCount: 1,
      timeSpentSeconds: 420,
      totalQuestions: 10,
      subjectBreakdown: [
        { subject: 'Biology', correct: 3, total: 3, accuracy: 100 },
        { subject: 'Chemistry', correct: 2, total: 3, accuracy: 67 },
        { subject: 'Physics', correct: 1, total: 3, accuracy: 33 },
        { subject: 'English', correct: 1, total: 1, accuracy: 100 },
      ],
      aiAnalysis: {
        overallSummary: 'Strong conceptual performance across Biology and English. Physics calculations caused the majority of deducted marks.',
        strengths: ['Cell Biology (100%)', 'English Syntax (100%)'],
        weaknesses: ['Organic Chemistry Reagents', 'Electrostatic Neutral Points'],
        speedAnalysis: 'Average 42 seconds per question in Biology vs 76 seconds per question in Physics numericals.',
        actionableRecommendations: [
          'Practice 10 targeted numerical questions in Mechanics and Electrostatics.',
          'Review the Nitration mechanism in Organic Chemistry.',
          'Take a 20-minute timed speed drill on Saturday.',
        ],
        predictedExamScore: '79% (MDCAT merit zone: King Edward / Fatima Jinnah Medical)',
      }
    }
  ];

  // Helper Methods
  getUserById(id: string) {
    return this.users.find(u => u.id === id);
  }

  getUserByEmail(email: string) {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  updateUser(id: string, updates: Partial<typeof DEMO_USER>) {
    const idx = this.users.findIndex(u => u.id === id);
    if (idx !== -1) {
      this.users[idx] = { ...this.users[idx], ...updates };
      return this.users[idx];
    }
    return null;
  }

  recordAttempt(params: {
    userId: string;
    questionId: string;
    selectedOption: string;
    timeSpentSeconds: number;
    mistakeType?: any;
  }) {
    const q = this.questions.find(item => item.id === params.questionId);
    if (!q) throw new Error('Question not found');

    const isCorrect = q.correctOption === params.selectedOption;
    const attId = `att-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    this.attempts.push({
      id: attId,
      userId: params.userId,
      questionId: params.questionId,
      selectedOption: params.selectedOption,
      isCorrect,
      timeSpentSeconds: params.timeSpentSeconds,
      mistakeType: params.mistakeType,
      createdAt: new Date().toISOString(),
    });

    // Update XP and Gamification
    const user = this.getUserById(params.userId);
    if (user) {
      const earnedXP = calculateXPForAttempt(isCorrect, q.difficulty, params.timeSpentSeconds);
      const newXP = user.xp + earnedXP;
      const { level } = getLevelFromXP(newXP);
      this.updateUser(user.id, { xp: newXP, currentLevel: level });
    }

    // If incorrect, add to Mistake Notebook
    if (!isCorrect && params.selectedOption) {
      const existing = this.mistakes.find(m => m.userId === params.userId && m.questionId === params.questionId);
      if (existing) {
        existing.studentAnswer = params.selectedOption;
        existing.retryCount += 1;
        existing.resolved = false;
        if (params.mistakeType) existing.mistakeType = params.mistakeType;
      } else {
        this.mistakes.push({
          id: `mis-${Date.now()}`,
          userId: params.userId,
          questionId: params.questionId,
          studentAnswer: params.selectedOption,
          correctOption: q.correctOption,
          mistakeType: params.mistakeType || 'CONCEPT',
          notes: `Missed in practice on ${new Date().toLocaleDateString()}`,
          resolved: false,
          retryCount: 0,
          createdAt: new Date().toISOString(),
          question: q,
        });
      }
    } else if (isCorrect) {
      // If student got it right on retry, mark resolved!
      const existing = this.mistakes.find(m => m.userId === params.userId && m.questionId === params.questionId);
      if (existing) {
        existing.resolved = true;
      }
    }

    return {
      isCorrect,
      correctOption: q.correctOption,
      explanation: q.explanation,
      whyOthersWrong: q.whyOthersWrong,
      hint: q.hint,
      formulaLatex: q.formulaLatex,
    };
  }

  getStudentProgress(userId: string) {
    const user = this.getUserById(userId) || DEMO_USER;
    const userAttempts = this.attempts.filter(a => a.userId === userId);
    const totalQuestionsSolved = userAttempts.length;
    const correctCount = userAttempts.filter(a => a.isCorrect).length;
    const accuracy = totalQuestionsSolved > 0 ? Math.round((correctCount / totalQuestionsSolved) * 100) : 75;

    // Calculate topic mastery map
    const topicStats: Record<string, UserTopicProgressItem> = {};
    for (const top of this.topics) {
      const topQuestions = this.questions.filter(q => q.topicId === top.id);
      const qIds = topQuestions.map(q => q.id);
      const topAttempts = userAttempts.filter(a => qIds.includes(a.questionId));

      const correct = topAttempts.filter(a => a.isCorrect).length;
      const total = topAttempts.length;
      const avgTime = total > 0 ? topAttempts.reduce((acc, c) => acc + c.timeSpentSeconds, 0) / total : 55;

      const mastery = calculateTopicMastery({
        totalAttempts: total,
        correctAttempts: correct,
        averageTimeSeconds: avgTime,
        estimatedTimeSeconds: 60,
        recentAttempts: topAttempts.map(a => {
          const q = this.questions.find(item => item.id === a.questionId);
          return {
            isCorrect: a.isCorrect,
            difficulty: q?.difficulty || 'MEDIUM',
            timeSpentSeconds: a.timeSpentSeconds,
            mistakeType: a.mistakeType,
          };
        }),
      });

      const chap = this.chapters.find(c => c.id === top.chapterId);
      const sub = this.subjects.find(s => s.id === chap?.subjectId);

      topicStats[top.id] = {
        topicId: top.id,
        topicName: top.name,
        subjectName: sub?.name || 'General',
        totalAttempts: total,
        correctAttempts: correct,
        accuracy: total > 0 ? Math.round((correct / total) * 100) : 70,
        averageTimeSeconds: Math.round(avgTime),
        masteryScore: total > 0 ? mastery : Math.round(top.masteryWeight * 65),
        lastAttemptAt: topAttempts[topAttempts.length - 1]?.createdAt || new Date().toISOString(),
      };
    }

    return {
      user,
      totalQuestionsSolved,
      correctCount,
      accuracy,
      topicStats: Object.values(topicStats),
    };
  }
}

// Global Singleton
const globalData = globalThis as unknown as { __dataStore?: DataStore };
export const dataStore = globalData.__dataStore || new DataStore();
if (process.env.NODE_ENV !== 'production') globalData.__dataStore = dataStore;

export default dataStore;
