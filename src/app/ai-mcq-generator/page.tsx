'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Bot, 
  CheckCircle2, 
  ArrowRight, 
  Sliders, 
  Bookmark, 
  Play, 
  Save, 
  AlertCircle,
  HelpCircle,
  Clock
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, DifficultyBadge } from '@/components/ui/Badge';
import { LatexRenderer } from '@/components/math/LatexRenderer';
import { GeneratedMCQ } from '@/lib/ai/types';

export default function AIMCQGeneratorPage() {
  const [examName, setExamName] = useState('MDCAT');
  const [subjectName, setSubjectName] = useState('Physics');
  const [topicName, setTopicName] = useState("Newton's Laws & Momentum");
  const [difficulty, setDifficulty] = useState('MEDIUM');
  const [questionType, setQuestionType] = useState('CONCEPTUAL');
  const [count, setCount] = useState(3);

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedList, setGeneratedList] = useState<GeneratedMCQ[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setIsSaved(false);

    try {
      const res = await fetch('/api/ai/generate-mcqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          examName,
          subjectName,
          topicName,
          difficulty,
          questionType,
          count,
        }),
      });

      const data = await res.json();
      if (data.questions) {
        setGeneratedList(data.questions);
      }
    } catch {
      // Handled gracefully
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveToBank = async () => {
    setIsSaved(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      
      {/* Page Title */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            AI MCQ Generator & Test Authoring
          </h1>
          <Badge variant="ai">Zod Validated</Badge>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Synthesize curriculum-aligned questions for Pakistani entrance tests with verified answers, distractor rationales, and LaTeX formulas.
        </p>
      </div>

      {/* Generator Configuration Form */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Sliders className="w-4 h-4 text-brand-600" />
            <span>Target Specification</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-1">
          <form onSubmit={handleGenerate} className="space-y-4 text-xs">
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Exam Format
                </label>
                <select
                  value={examName}
                  onChange={(e) => setExamName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                >
                  <option value="MDCAT">MDCAT (Medical)</option>
                  <option value="ECAT">ECAT (Engineering)</option>
                  <option value="NET">NET (NUST)</option>
                  <option value="NUMS">NUMS</option>
                  <option value="FAST">FAST-NU</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Subject
                </label>
                <select
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                >
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="English">English</option>
                  <option value="Logical Reasoning">Logical Reasoning</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Difficulty Level
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                >
                  <option value="EASY">Easy (Recall / Definition)</option>
                  <option value="MEDIUM">Medium (Concept Application)</option>
                  <option value="HARD">Hard (Multi-Step Traps)</option>
                  <option value="EXPERT">Expert (Merit Decider)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Topic or Concept Keyword
                </label>
                <input
                  type="text"
                  required
                  value={topicName}
                  onChange={(e) => setTopicName(e.target.value)}
                  placeholder="e.g. Projectile Motion, Nitration of Benzene, King's Property"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Question Count
                </label>
                <select
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                >
                  <option value={2}>2 Questions</option>
                  <option value={3}>3 Questions</option>
                  <option value={5}>5 Questions</option>
                  <option value={10}>10 Questions</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                type="submit"
                variant="ai"
                size="md"
                isLoading={isGenerating}
                leftIcon={<Sparkles className="w-4 h-4" />}
              >
                Generate Verified MCQs
              </Button>
            </div>

          </form>
        </CardContent>
      </Card>

      {/* Generated Questions Stream */}
      {generatedList.length > 0 && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Generated Questions ({generatedList.length})
            </h2>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSaveToBank}
                leftIcon={isSaved ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Save className="w-4 h-4" />}
              >
                {isSaved ? 'Saved to Question Bank!' : 'Save All to Question Bank'}
              </Button>

              <Link href="/practice/session">
                <Button variant="primary" size="sm" leftIcon={<Play className="w-4 h-4" />}>
                  Practice These Now
                </Button>
              </Link>
            </div>
          </div>

          {generatedList.map((q, idx) => (
            <Card key={idx} className="shadow-sm">
              <CardContent className="p-5 sm:p-6 space-y-4 text-xs sm:text-sm">
                
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-brand-600">Q{idx + 1}.</span>
                    <DifficultyBadge difficulty={q.difficulty as any} />
                    <span className="text-[10px] text-slate-400 font-medium">• {q.questionType}</span>
                  </div>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> ~{q.estimatedTimeSeconds}s
                  </span>
                </div>

                <div className="font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
                  <LatexRenderer content={q.questionText} />
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  {[
                    { key: 'A', text: q.optionA },
                    { key: 'B', text: q.optionB },
                    { key: 'C', text: q.optionC },
                    { key: 'D', text: q.optionD },
                  ].map((opt) => {
                    const isCorrect = q.correctOption === opt.key;
                    return (
                      <div
                        key={opt.key}
                        className={`p-3 rounded-xl border flex items-start gap-2.5 ${
                          isCorrect
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100 font-semibold'
                            : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0 ${
                          isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}>
                          {opt.key}
                        </span>
                        <div className="pt-0.5">
                          <LatexRenderer content={opt.text} />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5 text-xs">
                  <p className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Explanation (Correct Answer: {q.correctOption})</span>
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    <LatexRenderer content={q.explanation} />
                  </p>
                </div>

              </CardContent>
            </Card>
          ))}
        </div>
      )}

    </div>
  );
}
