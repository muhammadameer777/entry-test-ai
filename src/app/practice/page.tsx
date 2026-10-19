'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Target, 
  Zap, 
  AlertTriangle, 
  Clock, 
  Sparkles, 
  BookOpen, 
  ArrowRight, 
  Sliders, 
  CheckCircle2, 
  HelpCircle,
  ShieldAlert
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SEED_SUBJECTS, SEED_TOPICS } from '@/lib/data/seedData';

export default function PracticeHubPage() {
  const router = useRouter();
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');
  const [isTimed, setIsTimed] = useState(true);
  const [instantFeedback, setInstantFeedback] = useState(true);

  const startCustomSession = () => {
    let url = `/practice/session?timed=${isTimed}&instantFeedback=${instantFeedback}`;
    if (selectedSubject !== 'all') url += `&subject=${selectedSubject}`;
    if (selectedDifficulty !== 'ALL') url += `&difficulty=${selectedDifficulty}`;
    router.push(url);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          MCQ Practice & Speed Drills
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Choose a tailored training mode to reinforce concepts, eliminate careless mistakes, or practice under speed pressure.
        </p>
      </div>

      {/* Featured Practice Modes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Mode 1: Weak Topics Drill */}
        <Card hover className="border-rose-200/80 dark:border-rose-900/40 bg-gradient-to-br from-white via-rose-50/20 to-rose-50/40 dark:from-slate-900 dark:via-rose-950/10 dark:to-rose-950/20 flex flex-col justify-between">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400">
                Recommended
              </span>
              <AlertTriangle className="w-4 h-4 text-rose-500" />
            </div>
            <CardTitle className="text-lg font-bold">Weak Topic Drill</CardTitle>
            <p className="text-xs text-slate-500 mt-1">
              Automatically selects MCQs from topics where your mastery is below 55% (Organic Chem & Calculus).
            </p>
          </CardHeader>
          <div className="p-5 pt-0">
            <Link href="/practice/session?mode=WEAK_TOPIC">
              <Button variant="danger" size="sm" className="w-full justify-between">
                <span>Launch Weak Topic Drill</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </Card>

        {/* Mode 2: Speed Drill */}
        <Card hover className="border-amber-200/80 dark:border-amber-900/40 bg-gradient-to-br from-white via-amber-50/20 to-amber-50/40 dark:from-slate-900 dark:via-amber-950/10 dark:to-amber-950/20 flex flex-col justify-between">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
                Speed Pacing
              </span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <CardTitle className="text-lg font-bold">35-Second Speed Drill</CardTitle>
            <p className="text-xs text-slate-500 mt-1">
              Strict 35-second countdown per question. Trains fast formula recall and distractor elimination.
            </p>
          </CardHeader>
          <div className="p-5 pt-0">
            <Link href="/practice/session?mode=SPEED_DRILL&timed=true">
              <Button size="sm" className="w-full justify-between bg-amber-500 hover:bg-amber-600 text-white font-semibold">
                <span>Start Speed Drill</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </Card>

        {/* Mode 3: Real Exam Mode */}
        <Card hover className="border-indigo-200/80 dark:border-indigo-900/40 bg-gradient-to-br from-white via-indigo-50/20 to-indigo-50/40 dark:from-slate-900 dark:via-indigo-950/10 dark:to-indigo-950/20 flex flex-col justify-between">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400">
                Exam Mode
              </span>
              <ShieldAlert className="w-4 h-4 text-indigo-500" />
            </div>
            <CardTitle className="text-lg font-bold">Real Exam Simulation</CardTitle>
            <p className="text-xs text-slate-500 mt-1">
              AI hints and instant answers are hidden. Answers are only revealed in a full diagnostic report at the end.
            </p>
          </CardHeader>
          <div className="p-5 pt-0">
            <Link href="/practice/session?mode=REAL_EXAM&instantFeedback=false">
              <Button variant="primary" size="sm" className="w-full justify-between">
                <span>Enter Real Exam Mode</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </Card>

      </div>

      {/* Custom Practice Configurator */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Sliders className="w-4 h-4 text-brand-600" />
            <span>Custom Practice Session Configurator</span>
          </CardTitle>
          <p className="text-xs text-slate-500 mt-0.5">
            Filter questions by subject, difficulty level, and feedback preferences.
          </p>
        </CardHeader>
        <CardContent className="space-y-4 pt-1">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            
            {/* Subject Filter */}
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="all">All Subjects (Mixed)</option>
                <option value="physics">Physics</option>
                <option value="chemistry">Chemistry</option>
                <option value="biology">Biology</option>
                <option value="mathematics">Mathematics</option>
                <option value="english">English</option>
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Difficulty
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="ALL">Adaptive (All Levels)</option>
                <option value="EASY">Easy (Foundational)</option>
                <option value="MEDIUM">Medium (Application)</option>
                <option value="HARD">Hard (Advanced Traps)</option>
              </select>
            </div>

            {/* Feedback Timing */}
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Feedback Timing
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setInstantFeedback(true)}
                  className={`flex-1 py-2 px-2.5 rounded-xl border text-center font-semibold transition ${
                    instantFeedback ? 'bg-brand-50 border-brand-500 text-brand-700' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  Instant
                </button>
                <button
                  type="button"
                  onClick={() => setInstantFeedback(false)}
                  className={`flex-1 py-2 px-2.5 rounded-xl border text-center font-semibold transition ${
                    !instantFeedback ? 'bg-brand-50 border-brand-500 text-brand-700' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  End of Test
                </button>
              </div>
            </div>

            {/* Timer Toggle */}
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Timer
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsTimed(true)}
                  className={`flex-1 py-2 px-2.5 rounded-xl border text-center font-semibold transition ${
                    isTimed ? 'bg-brand-50 border-brand-500 text-brand-700' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  Timed
                </button>
                <button
                  type="button"
                  onClick={() => setIsTimed(false)}
                  className={`flex-1 py-2 px-2.5 rounded-xl border text-center font-semibold transition ${
                    !isTimed ? 'bg-brand-50 border-brand-500 text-brand-700' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  Untimed
                </button>
              </div>
            </div>

          </div>

          <div className="pt-2 flex justify-end">
            <Button
              variant="primary"
              size="md"
              onClick={startCustomSession}
              leftIcon={<Target className="w-4 h-4" />}
            >
              Start Customized Practice Session
            </Button>
          </div>

        </CardContent>
      </Card>

    </div>
  );
}
