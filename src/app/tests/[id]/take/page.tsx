'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Clock, 
  Flag, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  ShieldAlert,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { LatexRenderer } from '@/components/math/LatexRenderer';
import { SEED_QUESTIONS, SEED_MOCK_TESTS } from '@/lib/data/seedData';

export default function TakeMockTestPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const mockTest = SEED_MOCK_TESTS.find(m => m.id === params.id) || SEED_MOCK_TESTS[0];
  const questions = SEED_QUESTIONS;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [markedForReview, setMarkedForReview] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(mockTest.durationMinutes * 60);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Restore session from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`prepai_test_${params.id}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.answers) setAnswers(parsed.answers);
        if (parsed.marked) setMarkedForReview(parsed.marked);
      }
    } catch {}
  }, [params.id]);

  // Autosave periodically
  useEffect(() => {
    try {
      localStorage.setItem(`prepai_test_${params.id}`, JSON.stringify({ answers, marked: markedForReview }));
    } catch {}
  }, [answers, markedForReview, params.id]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinalSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const currentQ = questions[currentIdx] || questions[0];

  const handleSelect = (opt: string) => {
    setAnswers({ ...answers, [currentIdx]: opt });
  };

  const handleClear = () => {
    const copy = { ...answers };
    delete copy[currentIdx];
    setAnswers(copy);
  };

  const toggleMarkReview = () => {
    if (markedForReview.includes(currentIdx)) {
      setMarkedForReview(markedForReview.filter(i => i !== currentIdx));
    } else {
      setMarkedForReview([...markedForReview, currentIdx]);
    }
  };

  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    localStorage.removeItem(`prepai_test_${params.id}`);
    setTimeout(() => {
      router.push(`/tests/att-mock-1/results`);
    }, 1000);
  };

  const answeredCount = Object.keys(answers).length;
  const unansweredCount = questions.length - answeredCount;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col select-none">
      
      {/* Sticky Test Exam Bar */}
      <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 py-3 flex items-center justify-between shadow-sm">
        <div>
          <h1 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white truncate">
            {mockTest.title}
          </h1>
          <p className="text-[11px] text-slate-400">
            Real Exam Mode • Negative Marking: {mockTest.negativeMarkingRatio > 0 ? `-${mockTest.negativeMarkingRatio}` : 'None'}
          </p>
        </div>

        {/* Timer */}
        <div className="flex items-center gap-3">
          <div className={`px-4 py-2 rounded-2xl flex items-center gap-2 font-mono font-bold text-sm sm:text-base shadow-sm ${
            timeLeft <= 300 
              ? 'bg-rose-500 text-white animate-pulse' 
              : 'bg-slate-900 text-white dark:bg-slate-800'
          }`}>
            <Clock className="w-4 h-4" />
            <span>
              {Math.floor(timeLeft / 3600)}:{Math.floor((timeLeft % 3600) / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}
            </span>
          </div>

          <Button
            variant="danger"
            size="sm"
            onClick={() => setShowSubmitModal(true)}
            rightIcon={<Send className="w-3.5 h-3.5" />}
          >
            Submit Test
          </Button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Column (3 cols): Question Sheet */}
        <div className="lg:col-span-3 space-y-4">
          <Card className="shadow-md">
            <CardContent className="p-6 sm:p-8 space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
                <span className="font-bold text-brand-600">
                  Question {currentIdx + 1} of {questions.length}
                </span>

                <button
                  type="button"
                  onClick={toggleMarkReview}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition ${
                    markedForReview.includes(currentIdx)
                      ? 'bg-amber-100 text-amber-800 font-bold'
                      : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>{markedForReview.includes(currentIdx) ? 'Marked for Review' : 'Mark for Review'}</span>
                </button>
              </div>

              {/* Question Text */}
              <div className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
                <LatexRenderer content={currentQ.questionText} />
              </div>

              {/* Options */}
              <div className="space-y-3">
                {[
                  { key: 'A', text: currentQ.optionA },
                  { key: 'B', text: currentQ.optionB },
                  { key: 'C', text: currentQ.optionC },
                  { key: 'D', text: currentQ.optionD },
                ].map((opt) => {
                  const isSelected = answers[currentIdx] === opt.key;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => handleSelect(opt.key)}
                      className={`w-full p-4 rounded-2xl border text-left flex items-start gap-3.5 transition ${
                        isSelected
                          ? 'border-brand-600 bg-brand-50/70 dark:bg-brand-950/50 text-brand-900 dark:text-brand-100 ring-2 ring-brand-500 font-semibold shadow-sm'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                        isSelected ? 'bg-brand-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}>
                        {opt.key}
                      </span>
                      <div className="text-sm pt-0.5">
                        <LatexRenderer content={opt.text} />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Bar inside Test */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentIdx === 0}
                    onClick={() => setCurrentIdx(currentIdx - 1)}
                    leftIcon={<ArrowLeft className="w-4 h-4" />}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClear}
                    disabled={!answers[currentIdx]}
                    className="text-xs text-slate-500"
                  >
                    Clear Response
                  </Button>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    if (currentIdx < questions.length - 1) {
                      setCurrentIdx(currentIdx + 1);
                    } else {
                      setShowSubmitModal(true);
                    }
                  }}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {currentIdx < questions.length - 1 ? 'Save & Next' : 'Finish Test'}
                </Button>
              </div>

            </CardContent>
          </Card>
        </div>

        {/* Right Column (1 col): Question Palette */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-5 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Question Palette
              </h3>

              {/* Palette Legend */}
              <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span>Answered ({answeredCount})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700" />
                  <span>Unanswered ({unansweredCount})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span>Marked ({markedForReview.length})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full ring-2 ring-brand-500" />
                  <span>Current</span>
                </div>
              </div>

              {/* Grid of Question Numbers */}
              <div className="grid grid-cols-5 gap-2 max-h-80 overflow-y-auto p-1">
                {questions.map((_, i) => {
                  const isAns = answers[i] !== undefined;
                  const isRev = markedForReview.includes(i);
                  const isCur = currentIdx === i;

                  let style = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
                  if (isRev) {
                    style = 'bg-amber-500 text-white';
                  } else if (isAns) {
                    style = 'bg-emerald-500 text-white font-bold';
                  }

                  if (isCur) {
                    style += ' ring-2 ring-brand-600 scale-105';
                  }

                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCurrentIdx(i)}
                      className={`h-9 rounded-xl flex items-center justify-center text-xs font-semibold transition ${style}`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={() => setShowSubmitModal(true)}
                className="w-full mt-4"
              >
                Submit Mock Exam
              </Button>

            </CardContent>
          </Card>
        </div>

      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        title="Ready to Submit Your Exam?"
        description="Review your answers before finalizing your test score."
      >
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Total Questions:</span>
              <span className="font-bold">{questions.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-600 font-semibold">Answered:</span>
              <span className="font-bold text-emerald-600">{answeredCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-rose-600 font-semibold">Unanswered:</span>
              <span className="font-bold text-rose-600">{unansweredCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-600 font-semibold">Marked for Review:</span>
              <span className="font-bold text-amber-600">{markedForReview.length}</span>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Button variant="outline" size="sm" onClick={() => setShowSubmitModal(false)}>
              Keep Practicing
            </Button>
            <Button
              variant="danger"
              size="sm"
              isLoading={isSubmitting}
              onClick={handleFinalSubmit}
            >
              Confirm & Submit Exam
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
