'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Clock, 
  Flag, 
  HelpCircle, 
  Sparkles, 
  Calculator, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Bot, 
  ArrowRight,
  AlertTriangle,
  Bookmark,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge, DifficultyBadge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { Modal } from '@/components/ui/Modal';
import { LatexRenderer } from '@/components/math/LatexRenderer';
import { QuestionItem, MistakeType } from '@/types';
import { SEED_QUESTIONS } from '@/lib/data/seedData';

function PracticeSessionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const mode = searchParams.get('mode') || 'QUICK';
  const isTimed = searchParams.get('timed') !== 'false';
  const instantFeedback = searchParams.get('instantFeedback') !== 'false';

  // Questions State
  const [questions, setQuestions] = useState<QuestionItem[]>(SEED_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Marked for Review & Bookmarks
  const [markedForReview, setMarkedForReview] = useState<number[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Timer State
  const [timeLeft, setTimeLeft] = useState(mode === 'SPEED_DRILL' ? 35 : 60);

  // Modals
  const [showFormulaSheet, setShowFormulaSheet] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [calcInput, setCalcInput] = useState('');
  const [calcResult, setCalcResult] = useState('');

  // Socratic AI Hint
  const [hintLevel, setHintLevel] = useState<1 | 2>(1);
  const [hintText, setHintText] = useState<string | null>(null);
  const [isLoadingHint, setIsLoadingHint] = useState(false);

  // Mistake categorization modal
  const [selectedMistakeCategory, setSelectedMistakeCategory] = useState<MistakeType>('CONCEPT');

  const currentQ = questions[currentIndex] || SEED_QUESTIONS[0];

  // Timer countdown
  useEffect(() => {
    if (!isTimed || isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto submit or timeout
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimed, isSubmitted, currentIndex]);

  const handleSelectOption = (opt: string) => {
    if (isSubmitted) return;
    setSelectedOption(opt);
  };

  const handleSubmitAnswer = async () => {
    if (!selectedOption || isSubmitting) return;
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/practice/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: currentQ.id,
          selectedOption,
          timeSpentSeconds: (mode === 'SPEED_DRILL' ? 35 : 60) - timeLeft,
          mistakeType: selectedMistakeCategory,
        }),
      });

      const data = await res.json();
      setSubmissionResult(data);
      setIsSubmitted(true);
    } catch {
      // Local fallback
      const isCorrect = selectedOption === currentQ.correctOption;
      setSubmissionResult({
        isCorrect,
        correctOption: currentQ.correctOption,
        explanation: currentQ.explanation,
        whyOthersWrong: currentQ.whyOthersWrong,
        hint: currentQ.hint,
        formulaLatex: currentQ.formulaLatex,
      });
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
      setSubmissionResult(null);
      setHintText(null);
      setHintLevel(1);
      setTimeLeft(mode === 'SPEED_DRILL' ? 35 : 60);
    } else {
      // Finished session
      router.push('/dashboard');
    }
  };

  const handleFetchAiHint = async () => {
    setIsLoadingHint(true);
    try {
      const res = await fetch('/api/ai/hint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionText: currentQ.questionText,
          options: {
            A: currentQ.optionA,
            B: currentQ.optionB,
            C: currentQ.optionC,
            D: currentQ.optionD,
          },
          hintLevel,
        }),
      });
      const data = await res.json();
      setHintText(`${data.hint}\n\n👉 Guiding Question: ${data.guidingQuestion}`);
      setHintLevel(hintLevel === 1 ? 2 : 1);
    } catch {
      setHintText(currentQ.hint || 'Identify the core relationship and check whether any physical quantity is conserved.');
    } finally {
      setIsLoadingHint(false);
    }
  };

  const toggleMarkForReview = () => {
    if (markedForReview.includes(currentIndex)) {
      setMarkedForReview(markedForReview.filter(i => i !== currentIndex));
    } else {
      setMarkedForReview([...markedForReview, currentIndex]);
    }
  };

  const evaluateCalculator = () => {
    try {
      // Simple safe evaluation for arithmetic
      const sanitized = calcInput.replace(/[^0-9+\-*/().]/g, '');
      const res = Function(`'use strict'; return (${sanitized})`)();
      setCalcResult(String(res));
    } catch {
      setCalcResult('Error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5 animate-fade-in pb-12">
      
      {/* Top Header & Session Controls */}
      <div className="flex items-center justify-between">
        <Link href="/practice" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition">
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Session</span>
        </Link>

        {/* Progress & Badge */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <Badge variant="brand" size="sm">{mode.replace(/_/g, ' ')}</Badge>
        </div>

        {/* Action Tools */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowFormulaSheet(true)}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 transition"
            title="Formula Sheet"
          >
            <FileText className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setShowCalculator(true)}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 transition"
            title="Scientific Scratchpad"
          >
            <Calculator className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar & Timer Row */}
      <div className="flex items-center gap-4">
        <Progress value={((currentIndex + 1) / questions.length) * 100} size="sm" className="flex-1" />

        {isTimed && (
          <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
            timeLeft <= 10 
              ? 'bg-rose-50 text-rose-600 border border-rose-200 animate-pulse' 
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}>
            <Clock className="w-3.5 h-3.5" />
            <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
          </div>
        )}
      </div>

      {/* Main Question Card */}
      <Card className="shadow-md">
        <CardContent className="p-6 sm:p-8 space-y-6">
          
          {/* Question Metadata */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/60 text-xs">
            <div className="flex items-center gap-2">
              <DifficultyBadge difficulty={currentQ.difficulty} />
              <span className="text-slate-400">•</span>
              <span className="text-slate-500 font-medium">{currentQ.tags || 'General'}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleMarkForReview}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                  markedForReview.includes(currentIndex)
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400'
                    : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>{markedForReview.includes(currentIndex) ? 'Marked' : 'Mark for Review'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-1.5 rounded-lg transition ${
                  isBookmarked ? 'text-brand-600 bg-brand-50' : 'text-slate-400 hover:bg-slate-100'
                }`}
                title="Bookmark Question"
              >
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Question Text */}
          <div className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
            <LatexRenderer content={currentQ.questionText} />
          </div>

          {/* Options List */}
          <div className="space-y-3">
            {[
              { key: 'A', text: currentQ.optionA },
              { key: 'B', text: currentQ.optionB },
              { key: 'C', text: currentQ.optionC },
              { key: 'D', text: currentQ.optionD },
            ].map((opt) => {
              const isSelected = selectedOption === opt.key;
              const isCorrectOpt = submissionResult?.correctOption === opt.key;
              const isWrongSelected = isSubmitted && isSelected && !submissionResult?.isCorrect;

              let optionStyle = 'border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200';

              if (isSelected && !isSubmitted) {
                optionStyle = 'border-brand-600 bg-brand-50/60 dark:bg-brand-950/40 text-brand-900 dark:text-brand-100 shadow-sm ring-1 ring-brand-500';
              }

              if (isSubmitted) {
                if (isCorrectOpt) {
                  optionStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 ring-1 ring-emerald-500 font-semibold';
                } else if (isWrongSelected) {
                  optionStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100 ring-1 ring-rose-500 line-through';
                } else {
                  optionStyle = 'opacity-50 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-400';
                }
              }

              return (
                <button
                  key={opt.key}
                  type="button"
                  disabled={isSubmitted}
                  onClick={() => handleSelectOption(opt.key)}
                  className={`w-full p-4 rounded-2xl border text-left flex items-start gap-3.5 transition duration-150 ${optionStyle}`}
                >
                  <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition ${
                    isSubmitted && isCorrectOpt
                      ? 'bg-emerald-500 text-white'
                      : isSubmitted && isWrongSelected
                      ? 'bg-rose-500 text-white'
                      : isSelected
                      ? 'bg-brand-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}>
                    {opt.key}
                  </span>
                  <div className="text-sm font-medium pt-0.5 flex-1">
                    <LatexRenderer content={opt.text} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Socratic AI Hint Accordion */}
          {!isSubmitted && (
            <div className="pt-2">
              {hintText ? (
                <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-xs text-purple-900 dark:text-purple-200 space-y-2 animate-fade-in">
                  <div className="flex items-center justify-between font-bold">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-purple-600" /> Socratic AI Hint (Level {hintLevel === 1 ? 2 : 1})
                    </span>
                    <button
                      type="button"
                      onClick={handleFetchAiHint}
                      className="text-[11px] underline hover:text-purple-700"
                    >
                      Need a deeper hint?
                    </button>
                  </div>
                  <p className="leading-relaxed whitespace-pre-line">
                    <LatexRenderer content={hintText} />
                  </p>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  isLoading={isLoadingHint}
                  onClick={handleFetchAiHint}
                  leftIcon={<Bot className="w-4 h-4 text-purple-600" />}
                  className="text-xs text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/40"
                >
                  Ask Socratic AI for a Hint (Doesn&apos;t reveal answer)
                </Button>
              )}
            </div>
          )}

          {/* Answer Submission Action */}
          {!isSubmitted ? (
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <Button
                variant="primary"
                size="lg"
                disabled={!selectedOption}
                isLoading={isSubmitting}
                onClick={handleSubmitAnswer}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Submit Answer
              </Button>
            </div>
          ) : (
            /* Post-Submission Deep Feedback as specified in Section 18 */
            <div className="space-y-5 pt-4 border-t border-slate-100 dark:border-slate-800 animate-fade-in">
              
              {/* Correct / Incorrect Banner */}
              <div className={`p-4 rounded-2xl border flex items-start gap-3.5 ${
                submissionResult?.isCorrect
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100'
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-100'
              }`}>
                {submissionResult?.isCorrect ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <h4 className="text-sm font-bold">
                    {submissionResult?.isCorrect ? '✓ Correct! Excellent work.' : `✗ Incorrect. Correct Option is (${submissionResult?.correctOption})`}
                  </h4>
                  <p className="text-xs opacity-90 leading-relaxed">
                    {submissionResult?.isCorrect 
                      ? 'You correctly applied the governing physical principle within the target time.'
                      : 'We automatically saved this question to your Mistake Notebook so you can retry and master the underlying concept.'}
                  </p>
                </div>
              </div>

              {/* Detailed Step-by-Step Explanation */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 text-xs sm:text-sm space-y-3">
                <h5 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-brand-600" />
                  <span>Why Option {submissionResult?.correctOption} is Correct</span>
                </h5>
                <div className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  <LatexRenderer content={submissionResult?.explanation || currentQ.explanation} />
                </div>

                {submissionResult?.whyOthersWrong && (
                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-500">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Why the other choices are wrong: </span>
                    <LatexRenderer content={submissionResult.whyOthersWrong} />
                  </div>
                )}
              </div>

              {/* Next Steps Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <Link href="/ai-tutor">
                  <Button variant="outline" size="md" leftIcon={<Bot className="w-4 h-4" />}>
                    Discuss with AI Tutor
                  </Button>
                </Link>

                <Button
                  variant="primary"
                  size="md"
                  onClick={handleNextQuestion}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {currentIndex < questions.length - 1 ? 'Next Question' : 'Complete Practice Drill'}
                </Button>
              </div>

            </div>
          )}

        </CardContent>
      </Card>

      {/* Formula Sheet Modal */}
      <Modal
        isOpen={showFormulaSheet}
        onClose={() => setShowFormulaSheet(false)}
        title="Quick Formula Sheet: Physics & Math"
        maxWidth="lg"
      >
        <div className="space-y-3 text-xs leading-relaxed max-h-96 overflow-y-auto">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border">
            <p className="font-bold text-brand-600 mb-1">Uniformly Accelerated Motion</p>
            <LatexRenderer content="v = u + at \quad \cdot \quad S = ut + \frac{1}{2}at^2 \quad \cdot \quad 2as = v^2 - u^2" />
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border">
            <p className="font-bold text-brand-600 mb-1">Work, Energy & Power</p>
            <LatexRenderer content="W = F \cdot d \cos\theta \quad \cdot \quad E_k = \frac{1}{2}mv^2 = \frac{p^2}{2m} \quad \cdot \quad P = \vec{F} \cdot \vec{v}" />
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border">
            <p className="font-bold text-brand-600 mb-1">Coulomb&apos;s Law & Electric Potential</p>
            <LatexRenderer content="F = \frac{1}{4\pi\varepsilon_0} \frac{q_1 q_2}{r^2} \quad \cdot \quad E = \frac{F}{q} = -\frac{\Delta V}{\Delta r}" />
          </div>
        </div>
      </Modal>

      {/* Scratchpad Calculator Modal */}
      <Modal
        isOpen={showCalculator}
        onClose={() => setShowCalculator(false)}
        title="Scientific Arithmetic Scratchpad"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <input
            type="text"
            value={calcInput}
            onChange={(e) => setCalcInput(e.target.value)}
            placeholder="e.g. (2 * 10 * 20) / 4"
            className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
          />
          <div className="flex gap-2">
            <Button size="sm" variant="primary" onClick={evaluateCalculator} className="flex-1">
              Calculate
            </Button>
            <Button size="sm" variant="secondary" onClick={() => { setCalcInput(''); setCalcResult(''); }}>
              Clear
            </Button>
          </div>
          {calcResult && (
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-center font-bold text-base text-brand-600">
              = {calcResult}
            </div>
          )}
        </div>
      </Modal>

    </div>
  );
}

export default function PracticeSessionPage() {
  return (
    <React.Suspense fallback={
      <div className="max-w-4xl mx-auto p-12 text-center text-xs text-slate-400">
        Loading interactive practice session...
      </div>
    }>
      <PracticeSessionContent />
    </React.Suspense>
  );
}
