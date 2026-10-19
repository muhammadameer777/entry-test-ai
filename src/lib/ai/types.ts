import { Difficulty, QuestionType, MistakeType } from '@/types';
import { z } from 'zod';

export interface AIChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AIChatContext {
  studentName?: string;
  targetExam?: string;
  subject?: string;
  topic?: string;
  currentQuestion?: any;
  masteryScore?: number;
  recentMistakes?: string[];
}

export const GeneratedMCQSchema = z.object({
  questionText: z.string().min(5),
  optionA: z.string().min(1),
  optionB: z.string().min(1),
  optionC: z.string().min(1),
  optionD: z.string().min(1),
  correctOption: z.enum(['A', 'B', 'C', 'D']),
  explanation: z.string().min(10),
  whyOthersWrong: z.string().optional(),
  hint: z.string().min(5),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD', 'EXPERT']),
  questionType: z.enum(['CONCEPTUAL', 'NUMERICAL', 'APPLICATION', 'REASONING', 'MIXED']),
  formulaLatex: z.string().optional(),
  conceptTested: z.string().optional(),
  estimatedTimeSeconds: z.number().default(60),
});

export type GeneratedMCQ = z.infer<typeof GeneratedMCQSchema>;

export interface AIService {
  chat(messages: AIChatMessage[], context?: AIChatContext): Promise<string>;
  
  getSocraticHint(params: {
    questionText: string;
    options: { A: string; B: string; C: string; D: string };
    hintLevel: 1 | 2;
    previousHints?: string[];
    userAnswer?: string;
  }): Promise<{ hint: string; guidingQuestion: string }>;

  explainMistake(params: {
    questionText: string;
    selectedOption: string;
    selectedText: string;
    correctOption: string;
    correctText: string;
    explanation: string;
    mistakeType?: MistakeType;
    topicName?: string;
  }): Promise<{
    misconception: string;
    whyStudentChoseThis: string;
    keyRuleToRemember: string;
    howToAvoidNextTime: string;
    similarQuestionHint: string;
  }>;

  generateMCQs(params: {
    examName: string;
    subjectName: string;
    chapterName?: string;
    topicName: string;
    difficulty: Difficulty;
    questionType: QuestionType;
    count: number;
  }): Promise<GeneratedMCQ[]>;

  analyzeMockTest(params: {
    testTitle: string;
    examName: string;
    totalQuestions: number;
    score: number;
    accuracy: number;
    timeSpentSeconds: number;
    subjectStats: Array<{ subject: string; correct: number; total: number; accuracy: number }>;
    weakTopics: string[];
  }): Promise<{
    overallSummary: string;
    strengths: string[];
    weaknesses: string[];
    speedAnalysis: string;
    actionableRecommendations: string[];
    predictedExamScore: string;
  }>;

  generateStudyPlan(params: {
    examName: string;
    examDate: string;
    dailyMinutes: number;
    weakTopics: string[];
    strongTopics: string[];
    targetScore: number;
  }): Promise<{
    headline: string;
    weeklyFocus: Array<{
      day: string;
      focusSubject: string;
      tasks: string[];
      targetMinutes: number;
    }>;
    tacticalAdvice: string[];
  }>;

  generateFlashcards(params: {
    topicName: string;
    subjectName: string;
    count: number;
  }): Promise<Array<{ front: string; back: string; difficulty: 'EASY' | 'MEDIUM' | 'HARD' }>>;

  generateTopicSummary(params: {
    topicName: string;
    subjectName: string;
  }): Promise<{
    overview: string;
    keyFormulas: string[];
    commonTraps: string[];
    highYieldPoints: string[];
  }>;
}
