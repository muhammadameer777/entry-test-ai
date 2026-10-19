'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  AlertOctagon, 
  RotateCcw, 
  Bot, 
  CheckCircle2, 
  Trash2, 
  Filter, 
  Tag, 
  Check, 
  Sparkles,
  HelpCircle,
  Clock
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, DifficultyBadge } from '@/components/ui/Badge';
import { LatexRenderer } from '@/components/math/LatexRenderer';
import { Modal } from '@/components/ui/Modal';
import { dataStore } from '@/lib/storage';
import { MistakeItem } from '@/types';

export default function MistakeNotebookPage() {
  const [mistakes, setMistakes] = useState<MistakeItem[]>(dataStore.mistakes);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  
  // AI Explain modal state
  const [activeMistake, setActiveMistake] = useState<MistakeItem | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  // Retry state inside modal
  const [retryAnswer, setRetryAnswer] = useState<string | null>(null);
  const [retryResult, setRetryResult] = useState<boolean | null>(null);

  const categories = [
    { key: 'ALL', label: 'All Mistakes' },
    { key: 'CONCEPT', label: 'Concept Misconception' },
    { key: 'CALCULATION', label: 'Calculation Error' },
    { key: 'CARELESS', label: 'Careless Oversight' },
    { key: 'TIME_PRESSURE', label: 'Time Pressure Trap' },
  ];

  const filtered = selectedCategory === 'ALL'
    ? mistakes
    : mistakes.filter(m => m.mistakeType === selectedCategory);

  const handleResolve = (id: string) => {
    dataStore.mistakes = dataStore.mistakes.map(m => m.id === id ? { ...m, resolved: true } : m);
    setMistakes([...dataStore.mistakes]);
  };

  const handleExplainMistake = async (mistake: MistakeItem) => {
    setActiveMistake(mistake);
    setIsLoadingAi(true);
    setRetryAnswer(null);
    setRetryResult(null);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Explain this mistake in detail:
Question: ${mistake.question.questionText}
Student chosen option: ${mistake.studentAnswer}
Correct option: ${mistake.correctOption}
Explanation: ${mistake.question.explanation}
Mistake reason: ${mistake.mistakeType}`,
          context: {
            topic: mistake.question.tags,
          }
        }),
      });

      const data = await res.json();
      setAiAnalysis({
        explanation: data.reply,
      });
    } catch {
      setAiAnalysis({
        explanation: `### 🔍 AI Mistake Diagnosis\n\n- **Why you picked ${mistake.studentAnswer}:** A classic entry test trap where the linear relationship is assumed instead of verifying boundary constraints.\n- **Governing Rule to Remember:** Under ${mistake.question.tags || 'this topic'}, verify all conserved variables before substitution.\n- **How to avoid next time:** Underline 'constant' or 'initial' keywords during the first 3 seconds of reading.`,
      });
    } finally {
      setIsLoadingAi(false);
    }
  };

  const handleRetrySubmit = (correctOpt: string) => {
    if (!retryAnswer) return;
    const isCorrect = retryAnswer === correctOpt;
    setRetryResult(isCorrect);
    if (isCorrect && activeMistake) {
      handleResolve(activeMistake.id);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in pb-12">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Mistake Notebook & Trap Journal
            </h1>
            <Badge variant="incorrect">{mistakes.filter(m => !m.resolved).length} Unresolved</Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Questions you missed during practice and simulated mocks are cataloged automatically so you can fix weak concepts.
          </p>
        </div>

        <Link href="/practice?mode=WEAK_TOPIC">
          <Button variant="primary" size="sm" leftIcon={<RotateCcw className="w-4 h-4" />}>
            Practice All Mistakes
          </Button>
        </Link>
      </div>

      {/* Category Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
              selectedCategory === cat.key
                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-slate-300'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Mistakes List */}
      {filtered.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-3">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No unresolved mistakes in this category!
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Keep practicing. When you get any MCQ wrong, we automatically save it here with pedagogical advice.
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => (
            <Card key={item.id} className={item.resolved ? 'opacity-60' : 'shadow-sm'}>
              <CardContent className="p-5 sm:p-6 space-y-4 text-xs sm:text-sm">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Badge variant={item.resolved ? 'easy' : 'hard'}>
                      {item.resolved ? 'Resolved ✓' : `${item.mistakeType} Trap`}
                    </Badge>
                    <DifficultyBadge difficulty={item.question.difficulty} />
                    <span className="text-[10px] text-slate-400 font-medium">• {item.question.tags}</span>
                  </div>

                  <span className="text-[10px] text-slate-400">
                    Missed: {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Question Text */}
                <div className="font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
                  <LatexRenderer content={item.question.questionText} />
                </div>

                {/* Selected vs Correct Comparison */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 text-rose-900 dark:text-rose-200">
                    <span className="font-bold">Your Selection: Option ({item.studentAnswer})</span>
                    <p className="text-[11px] opacity-80 mt-0.5">Identified as a distractor trap</p>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-200">
                    <span className="font-bold">Correct Answer: Option ({item.correctOption})</span>
                    <p className="text-[11px] opacity-80 mt-0.5">Conforms strictly to syllabus rule</p>
                  </div>
                </div>

                {/* Explanation */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <LatexRenderer content={item.question.explanation} />
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  <Button
                    variant="ai"
                    size="sm"
                    onClick={() => handleExplainMistake(item)}
                    leftIcon={<Bot className="w-4 h-4" />}
                  >
                    AI Explain My Mistake & Retry
                  </Button>

                  <div className="flex gap-2">
                    {!item.resolved && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleResolve(item.id)}
                        leftIcon={<Check className="w-4 h-4 text-emerald-600" />}
                      >
                        Mark as Mastered
                      </Button>
                    )}
                  </div>
                </div>

              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* AI Explain & Retry Modal */}
      {activeMistake && (
        <Modal
          isOpen={!!activeMistake}
          onClose={() => setActiveMistake(null)}
          title="AI Mistake Breakdown & Socratic Retry"
          maxWidth="2xl"
        >
          <div className="space-y-5 text-xs sm:text-sm">
            
            {/* AI Explanation Text */}
            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 leading-relaxed text-purple-950 dark:text-purple-100">
              {isLoadingAi ? (
                <div className="flex items-center gap-2 py-4">
                  <Sparkles className="w-4 h-4 text-purple-600 animate-spin" />
                  <span>AI Tutor is analyzing your mistake pattern...</span>
                </div>
              ) : (
                <LatexRenderer content={aiAnalysis?.explanation || 'Review the core formula to avoid distractor options.'} />
              )}
            </div>

            {/* Instant Retry Section */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <RotateCcw className="w-4 h-4 text-brand-600" />
                <span>Now Retry This Question:</span>
              </h4>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { key: 'A', text: activeMistake.question.optionA },
                  { key: 'B', text: activeMistake.question.optionB },
                  { key: 'C', text: activeMistake.question.optionC },
                  { key: 'D', text: activeMistake.question.optionD },
                ].map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setRetryAnswer(opt.key)}
                    className={`p-3 rounded-xl border text-left font-medium transition ${
                      retryAnswer === opt.key
                        ? 'border-brand-600 bg-brand-50 text-brand-900'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <strong>{opt.key}.</strong> {opt.text}
                  </button>
                ))}
              </div>

              {retryResult !== null && (
                <div className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                  retryResult ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                }`}>
                  {retryResult ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Nice! You fixed the concept. Question marked as resolved!</span>
                    </>
                  ) : (
                    <>
                      <AlertOctagon className="w-4 h-4" />
                      <span>Not quite. Review the explanation above carefully.</span>
                    </>
                  )}
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <Button
                  variant="primary"
                  size="sm"
                  disabled={!retryAnswer}
                  onClick={() => handleRetrySubmit(activeMistake.correctOption)}
                >
                  Verify Retry Answer
                </Button>
              </div>
            </div>

          </div>
        </Modal>
      )}

    </div>
  );
}
