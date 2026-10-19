'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Save, 
  Sparkles, 
  Eye, 
  CheckCircle2, 
  HelpCircle,
  Clock
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LatexRenderer } from '@/components/math/LatexRenderer';

export default function NewQuestionPage() {
  const router = useRouter();

  const [questionText, setQuestionText] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [correctOption, setCorrectOption] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [explanation, setExplanation] = useState('');
  const [hint, setHint] = useState('');
  const [difficulty, setDifficulty] = useState('MEDIUM');
  const [questionType, setQuestionType] = useState('CONCEPTUAL');
  const [estimatedTime, setEstimatedTime] = useState(50);
  const [source, setSource] = useState('UHS MDCAT Past Paper');
  const [tags, setTags] = useState('Physics, Kinematics');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('/api/admin/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionText,
          optionA,
          optionB,
          optionC,
          optionD,
          correctOption,
          explanation,
          hint,
          difficulty,
          questionType,
          estimatedTimeSeconds: estimatedTime,
          source,
          tags,
        }),
      });

      router.push('/admin');
    } catch {
      router.push('/admin');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      
      {/* Title */}
      <div>
        <Link href="/admin" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-600 mb-3">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Master Admin</span>
        </Link>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Author New Curriculum MCQ
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Add past paper questions or original practice drills with LaTeX equation support.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        
        {/* Question Text & Live LaTeX Preview */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold">Question Statement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-1">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Question Text (use $...$ for inline LaTeX, $$...$$ for block formulas)
              </label>
              <textarea
                rows={3}
                required
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="e.g. A body of mass $m = 2\text{ kg}$ accelerates uniformly with $a = 3\text{ m/s}^2$..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-mono"
              />
            </div>

            {questionText && (
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Live LaTeX Render Preview:</span>
                <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  <LatexRenderer content={questionText} />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 4 Options */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold">Answer Choices (Options A to D)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Option A</label>
                <input
                  type="text"
                  required
                  value={optionA}
                  onChange={(e) => setOptionA(e.target.value)}
                  placeholder="e.g. 10 J"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Option B</label>
                <input
                  type="text"
                  required
                  value={optionB}
                  onChange={(e) => setOptionB(e.target.value)}
                  placeholder="e.g. 20 J"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Option C</label>
                <input
                  type="text"
                  required
                  value={optionC}
                  onChange={(e) => setOptionC(e.target.value)}
                  placeholder="e.g. 30 J"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Option D</label>
                <input
                  type="text"
                  required
                  value={optionD}
                  onChange={(e) => setOptionD(e.target.value)}
                  placeholder="e.g. 40 J"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Strictly Correct Option
              </label>
              <select
                value={correctOption}
                onChange={(e) => setCorrectOption(e.target.value as any)}
                className="w-48 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
              >
                <option value="A">Option A</option>
                <option value="B">Option B</option>
                <option value="C">Option C</option>
                <option value="D">Option D</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Explanation & Hint */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold">Pedagogical Explanations & Socratic Hints</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-1">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Step-by-Step Explanation
              </label>
              <textarea
                rows={3}
                required
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                placeholder="Explain why the answer is correct and write the governing equation..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Socratic Hint (Without giving away answer)
              </label>
              <input
                type="text"
                value={hint}
                onChange={(e) => setHint(e.target.value)}
                placeholder="e.g. Recall the work-energy theorem: loss in PE equals gain in KE."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
              />
            </div>
          </CardContent>
        </Card>

        {/* Metadata */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            >
              <option value="EASY">Easy</option>
              <option value="MEDIUM">Medium</option>
              <option value="HARD">Hard</option>
              <option value="EXPERT">Expert</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Question Type</label>
            <select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            >
              <option value="CONCEPTUAL">Conceptual</option>
              <option value="NUMERICAL">Numerical</option>
              <option value="APPLICATION">Application</option>
              <option value="REASONING">Reasoning</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Estimated Time (s)</label>
            <input
              type="number"
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Source / Citation</label>
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex justify-end gap-3 pt-2">
          <Link href="/admin">
            <Button variant="outline" size="md">Cancel</Button>
          </Link>
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSubmitting}
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save & Publish to Question Bank
          </Button>
        </div>

      </form>

    </div>
  );
}
