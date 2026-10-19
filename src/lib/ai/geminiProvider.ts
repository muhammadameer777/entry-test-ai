import { AIService, AIChatMessage, AIChatContext, GeneratedMCQ, GeneratedMCQSchema } from './types';
import { Difficulty, QuestionType, MistakeType } from '@/types';
import { MockAIService } from './mockProvider';

export class GeminiAIService implements AIService {
  private apiKey: string;
  private model: string;
  private fallback: MockAIService;

  constructor(apiKey: string, model: string = 'gemini-1.5-flash') {
    this.apiKey = apiKey;
    this.model = model;
    this.fallback = new MockAIService();
  }

  private async callGemini(prompt: string, systemInstruction?: string): Promise<string> {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;
    
    const body: any = {
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        temperature: 0.3,
      }
    };

    if (systemInstruction) {
      body.systemInstruction = {
        parts: [{ text: systemInstruction }]
      };
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Gemini API error (${res.status}): ${err}`);
    }

    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  }

  async chat(messages: AIChatMessage[], context?: AIChatContext): Promise<string> {
    try {
      const systemPrompt = `You are PrepAI's expert tutor for Pakistani entry tests (ECAT, MDCAT, NUMS, NET, FAST).
Context: Student=${context?.studentName || 'Student'}, Target Exam=${context?.targetExam || 'MDCAT/ECAT'}, Topic=${context?.topic || 'General'}.
Teaching philosophy:
1. Be encouraging, concise, and academic.
2. If the user asks about an MCQ, DO NOT immediately reveal the answer. Guide them step-by-step using the Socratic method.
3. Provide shortcuts and formula insights relevant to entry test time limits (<45 sec/question).
4. Use LaTeX for equations ($...$ for inline, $$...$$ for blocks).`;

      const formatted = messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n\n');
      return await this.callGemini(formatted, systemPrompt);
    } catch (e) {
      console.warn('Gemini chat error, falling back to mock provider:', e);
      return this.fallback.chat(messages, context);
    }
  }

  async getSocraticHint(params: {
    questionText: string;
    options: { A: string; B: string; C: string; D: string };
    hintLevel: 1 | 2;
    previousHints?: string[];
    userAnswer?: string;
  }): Promise<{ hint: string; guidingQuestion: string }> {
    try {
      const prompt = `You are a Socratic tutor. DO NOT reveal the correct option (A, B, C, or D).
Question: "${params.questionText}"
Options: A: ${params.options.A}, B: ${params.options.B}, C: ${params.options.C}, D: ${params.options.D}
Hint Level: ${params.hintLevel} of 2.
Output JSON with keys "hint" and "guidingQuestion".`;

      const response = await this.callGemini(prompt);
      const jsonStr = response.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(jsonStr);
      return {
        hint: parsed.hint || 'Consider the relationship between the given quantities.',
        guidingQuestion: parsed.guidingQuestion || 'What equation connects these variables?',
      };
    } catch (e) {
      return this.fallback.getSocraticHint(params);
    }
  }

  async explainMistake(params: {
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
  }> {
    try {
      const prompt = `Analyze a student mistake in Pakistani entry test preparation.
Question: "${params.questionText}"
Student selected: ${params.selectedOption} (${params.selectedText})
Correct answer: ${params.correctOption} (${params.correctText})
Explanation: "${params.explanation}"
Mistake category: ${params.mistakeType || 'CONCEPT'}
Output JSON with exact keys:
"misconception", "whyStudentChoseThis", "keyRuleToRemember", "howToAvoidNextTime", "similarQuestionHint"`;

      const res = await this.callGemini(prompt);
      const jsonStr = res.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(jsonStr);
    } catch (e) {
      return this.fallback.explainMistake(params);
    }
  }

  async generateMCQs(params: {
    examName: string;
    subjectName: string;
    chapterName?: string;
    topicName: string;
    difficulty: Difficulty;
    questionType: QuestionType;
    count: number;
  }): Promise<GeneratedMCQ[]> {
    try {
      const prompt = `Generate ${params.count} high-quality MCQs for the ${params.examName} entry test.
Subject: ${params.subjectName}
Chapter: ${params.chapterName || 'General'}
Topic: ${params.topicName}
Difficulty: ${params.difficulty}
Question Type: ${params.questionType}

Rules:
1. Exactly 4 options: A, B, C, D. Exactly ONE strictly correct option.
2. Realistic past paper standard for Pakistani university entry tests.
3. No ambiguous choices. Include detailed step-by-step explanations and concise hints.
4. Output JSON array of objects adhering to schema:
[
  {
    "questionText": "...",
    "optionA": "...",
    "optionB": "...",
    "optionC": "...",
    "optionD": "...",
    "correctOption": "A",
    "explanation": "...",
    "whyOthersWrong": "...",
    "hint": "...",
    "difficulty": "${params.difficulty}",
    "questionType": "${params.questionType}",
    "formulaLatex": "...",
    "conceptTested": "...",
    "estimatedTimeSeconds": 60
  }
]`;

      const res = await this.callGemini(prompt);
      const jsonStr = res.replace(/```json/g, '').replace(/```/g, '').trim();
      const raw = JSON.parse(jsonStr);
      if (Array.isArray(raw)) {
        return raw.map(item => GeneratedMCQSchema.parse(item));
      }
      return this.fallback.generateMCQs(params);
    } catch (e) {
      console.warn('Gemini MCQ generation failed, falling back to mock provider:', e);
      return this.fallback.generateMCQs(params);
    }
  }

  async analyzeMockTest(params: any) {
    return this.fallback.analyzeMockTest(params);
  }

  async generateStudyPlan(params: any) {
    return this.fallback.generateStudyPlan(params);
  }

  async generateFlashcards(params: any) {
    return this.fallback.generateFlashcards(params);
  }

  async generateTopicSummary(params: any) {
    return this.fallback.generateTopicSummary(params);
  }
}
