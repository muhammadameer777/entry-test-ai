import { NextResponse } from 'next/server';
import { getAIService, GeneratedMCQSchema } from '@/lib/ai';
import { dataStore } from '@/lib/storage';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      examName = 'MDCAT',
      subjectName = 'Physics',
      chapterName,
      topicName = 'Kinematics',
      difficulty = 'MEDIUM',
      questionType = 'CONCEPTUAL',
      count = 3,
      saveToBank = false,
    } = body;

    const ai = getAIService();
    const generated = await ai.generateMCQs({
      examName,
      subjectName,
      chapterName,
      topicName,
      difficulty,
      questionType,
      count: Math.min(10, Math.max(1, count)),
    });

    // Validate structured output
    const validated = generated.map(q => GeneratedMCQSchema.parse(q));

    // If admin or student wants to save to local question bank
    if (saveToBank) {
      for (const item of validated) {
        dataStore.questions.push({
          id: `q-gen-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          examId: 'exam-mdcat',
          subjectId: 'sub-phy',
          chapterId: 'chap-mechanics',
          topicId: 'top-newton',
          questionText: item.questionText,
          optionA: item.optionA,
          optionB: item.optionB,
          optionC: item.optionC,
          optionD: item.optionD,
          correctOption: item.correctOption,
          explanation: item.explanation,
          whyOthersWrong: item.whyOthersWrong,
          hint: item.hint,
          difficulty: item.difficulty,
          questionType: item.questionType,
          estimatedTimeSeconds: item.estimatedTimeSeconds,
          status: 'REVIEW',
          formulaLatex: item.formulaLatex,
          aiConfidence: 0.95,
          source: 'AI Generated (Pending Review)',
        });
      }
    }

    return NextResponse.json({
      success: true,
      count: validated.length,
      questions: validated,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'MCQ generation failed' }, { status: 500 });
  }
}
