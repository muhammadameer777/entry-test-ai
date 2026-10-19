'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  BookOpen, 
  Clock, 
  Target, 
  Zap, 
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Form State
  const [selectedExam, setSelectedExam] = useState('MDCAT');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['Biology', 'Chemistry', 'Physics', 'English']);
  const [examDate, setExamDate] = useState('2026-11-10');
  const [studyTime, setStudyTime] = useState(60);
  const [confidence, setConfidence] = useState('Intermediate');
  const [diagnosticAnswer, setDiagnosticAnswer] = useState<string | null>(null);
  const [isFinishing, setIsFinishing] = useState(false);

  const toggleSubject = (sub: string) => {
    if (selectedSubjects.includes(sub)) {
      if (selectedSubjects.length > 1) {
        setSelectedSubjects(selectedSubjects.filter(s => s !== sub));
      }
    } else {
      setSelectedSubjects([...selectedSubjects, sub]);
    }
  };

  const handleFinish = () => {
    setIsFinishing(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 selection:bg-brand-500 selection:text-white">
      <div className="max-w-2xl mx-auto w-full">
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
            <span>Onboarding Setup</span>
            <span>Step {step} of 6</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-brand-600 h-full transition-all duration-300 ease-out"
              style={{ width: `${(step / 6) * 100}%` }}
            />
          </div>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80 dark:border-slate-800 transition-all">
          
          {/* Step 1: Exam Selection */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600">Step 1</span>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  What exam are you preparing for?
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  We will calibrate syllabus questions, negative marking, and timer benchmarks accordingly.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: 'MDCAT', tag: 'Medical & Dental' },
                  { name: 'ECAT', tag: 'Engineering (UET)' },
                  { name: 'NET', tag: 'NUST Series' },
                  { name: 'NUMS', tag: 'Army Medical College' },
                  { name: 'FAST', tag: 'CS & Engineering' },
                  { name: 'Other', tag: 'General University' },
                ].map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setSelectedExam(item.name)}
                    className={`p-4 rounded-2xl border text-left transition ${
                      selectedExam === item.name
                        ? 'border-brand-600 bg-brand-50/60 dark:bg-brand-950/40 text-brand-900 dark:text-brand-200 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <p className="font-bold text-sm">{item.name}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{item.tag}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Subjects */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600">Step 2</span>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  What subjects will you be preparing?
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Choose the subjects tested in your chosen entry test format.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  'Biology',
                  'Chemistry',
                  'Physics',
                  'Mathematics',
                  'English',
                  'Logical Reasoning',
                ].map((sub) => {
                  const isChecked = selectedSubjects.includes(sub);
                  return (
                    <button
                      key={sub}
                      type="button"
                      onClick={() => toggleSubject(sub)}
                      className={`p-4 rounded-2xl border text-left flex items-center justify-between transition ${
                        isChecked
                          ? 'border-brand-600 bg-brand-50/60 dark:bg-brand-950/40 text-brand-900 dark:text-brand-200 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-sm font-semibold">{sub}</span>
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                        isChecked ? 'bg-brand-600 border-brand-600 text-white' : 'border-slate-300 dark:border-slate-600'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Exam Date */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600">Step 3</span>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  When is your target exam date?
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  We use this date to calculate days remaining and construct your daily pacing schedule.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Target Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Daily Study Time */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600">Step 4</span>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  How much time can you study daily?
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Realistic consistency beats burnout. We&apos;ll schedule daily MCQ goals to match this.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { time: 30, label: '30 mins / day', desc: 'Light pace (~30 MCQs)' },
                  { time: 60, label: '60 mins / day', desc: 'Recommended (~60 MCQs)' },
                  { time: 90, label: '90 mins / day', desc: 'Thorough (~90 MCQs)' },
                  { time: 120, label: '2 hours+ / day', desc: 'Intensive (~120 MCQs)' },
                ].map((item) => (
                  <button
                    key={item.time}
                    type="button"
                    onClick={() => setStudyTime(item.time)}
                    className={`p-4 rounded-2xl border text-left transition ${
                      studyTime === item.time
                        ? 'border-brand-600 bg-brand-50/60 dark:bg-brand-950/40 text-brand-900 dark:text-brand-200 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <p className="font-bold text-sm">{item.label}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Confidence */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600">Step 5</span>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  How confident do you feel right now?
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Helps our adaptive engine set your starting question difficulty.
                </p>
              </div>

              <div className="space-y-2.5">
                {[
                  { level: 'Beginner', desc: 'Just starting out or revising basic concepts from FSc.' },
                  { level: 'Intermediate', desc: 'Familiar with formulas, but need practice on difficult problems under time pressure.' },
                  { level: 'Advanced', desc: 'Looking for expert-level past paper tricks and speed optimization.' },
                  { level: 'Repeater', desc: 'Previously appeared in the test; aiming for top merit list score.' },
                ].map((item) => (
                  <button
                    key={item.level}
                    type="button"
                    onClick={() => setConfidence(item.level)}
                    className={`w-full p-4 rounded-2xl border text-left transition ${
                      confidence === item.level
                        ? 'border-brand-600 bg-brand-50/60 dark:bg-brand-950/40 text-brand-900 dark:text-brand-200 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <p className="font-bold text-sm">{item.level}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Diagnostic Sample */}
          {step === 6 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600">Step 6 (Optional)</span>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  1-Question Quick Diagnostic
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Test your conceptual intuition right away.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 mb-3">
                  A body dropped from height 20 m hits the ground with g = 10 m/s². What is its speed just before impact?
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {['A. 10 m/s', 'B. 20 m/s', 'C. 40 m/s', 'D. 200 m/s'].map((opt) => {
                    const key = opt[0];
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setDiagnosticAnswer(key)}
                        className={`p-3 rounded-xl border text-left font-medium transition ${
                          diagnosticAnswer === key
                            ? 'bg-brand-600 border-brand-600 text-white'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-brand-400'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {diagnosticAnswer === 'B' && (
                <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Correct! v = √(2gh) = √(2 · 10 · 20) = √400 = 20 m/s.
                </p>
              )}
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            {step > 1 ? (
              <Button
                variant="outline"
                size="md"
                onClick={() => setStep(step - 1)}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                Back
              </Button>
            ) : <div />}

            {step < 6 ? (
              <Button
                variant="primary"
                size="md"
                onClick={() => setStep(step + 1)}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Continue
              </Button>
            ) : (
              <Button
                variant="primary"
                size="lg"
                isLoading={isFinishing}
                onClick={handleFinish}
                rightIcon={<Sparkles className="w-4 h-4" />}
              >
                Generate My Study Dashboard
              </Button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
