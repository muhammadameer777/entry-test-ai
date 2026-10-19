'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Flame, 
  Target, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Bot, 
  Play, 
  BarChart3, 
  FileCheck,
  Check,
  Zap,
  TrendingUp,
  Brain,
  Layers,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge, DifficultyBadge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';

export default function StudentDashboard() {
  const [tasks, setTasks] = useState([
    { id: 't1', label: 'Review 10 weak questions from Mistake Notebook', done: true },
    { id: 't2', label: 'Learn Trigonometry formulas & King’s property', done: true },
    { id: 't3', label: 'Solve 20 Medium Chemistry MCQs (Nitration of Benzene)', done: true },
    { id: 't4', label: 'Complete 10-minute Physics Speed Drill', done: false },
    { id: 't5', label: 'Review flashcards on Cell Organelles', done: false },
  ]);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const completedTasksCount = tasks.filter(t => t.done).length;

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
      
      {/* Top Banner / Welcome & Exam Countdown */}
      <div className="rounded-3xl bg-gradient-to-r from-brand-700 via-indigo-700 to-purple-800 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-brand-100 mb-3">
              <Clock className="w-3.5 h-3.5 text-brand-300" />
              <span>27 days until MDCAT 2026</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Good morning, Ali 👋
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-brand-100 max-w-xl leading-relaxed">
              You are maintaining a <strong>12-day study streak</strong>. Let&apos;s tackle your weak topics in Organic Chemistry and finish today&apos;s 60-question goal.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-3">
            <Link href="/practice?mode=WEAK_TOPIC">
              <Button size="md" className="bg-white hover:bg-slate-100 text-brand-700 font-bold shadow-lg" leftIcon={<Target className="w-4 h-4" />}>
                Practice Weak Topics
              </Button>
            </Link>
            <Link href="/ai-tutor">
              <Button size="md" variant="ai" className="border border-white/30" leftIcon={<Bot className="w-4 h-4" />}>
                Ask AI Tutor
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Today's Goal */}
        <Card hover>
          <CardContent className="p-5">
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider">Today&apos;s Goal</span>
              <Target className="w-4 h-4 text-brand-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">45</span>
              <span className="text-xs text-slate-400 font-medium">/ 60 MCQs</span>
            </div>
            <Progress value={45} max={60} size="sm" className="mt-3" />
            <p className="text-[11px] text-slate-500 mt-2 font-medium">15 questions left for daily streak</p>
          </CardContent>
        </Card>

        {/* Accuracy */}
        <Card hover>
          <CardContent className="p-5">
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider">Overall Accuracy</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">78%</span>
              <span className="text-xs text-emerald-600 font-bold">+4% this week</span>
            </div>
            <Progress value={78} variant="success" size="sm" className="mt-3" />
            <p className="text-[11px] text-slate-500 mt-2 font-medium">Strongest in Biology (92%)</p>
          </CardContent>
        </Card>

        {/* Study Streak */}
        <Card hover>
          <CardContent className="p-5">
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider">Study Streak</span>
              <Flame className="w-4 h-4 text-amber-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">12 Days</span>
              <span className="text-xs text-amber-500 font-bold">🔥 On Fire</span>
            </div>
            <div className="mt-3 flex items-center gap-1.5">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                <div 
                  key={i} 
                  className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold ${
                    i < 5 ? 'bg-amber-500 text-white shadow-xs' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 mt-2 font-medium">Personal best: 15 days</p>
          </CardContent>
        </Card>

        {/* Exam Readiness Score */}
        <Card hover>
          <CardContent className="p-5">
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider">Exam Readiness</span>
              <Zap className="w-4 h-4 text-purple-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">74%</span>
              <Badge variant="brand" size="sm">Competitive</Badge>
            </div>
            <Progress value={74} variant="gradient" size="sm" className="mt-3" />
            <p className="text-[11px] text-slate-500 mt-2 font-medium">King Edward / AMC Tier</p>
          </CardContent>
        </Card>

      </div>

      {/* AI Coach Recommendation Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-brand-50 via-indigo-50 to-purple-50 dark:from-brand-950/40 dark:via-indigo-950/30 dark:to-purple-950/40 border border-brand-200/60 dark:border-brand-800/60 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-brand-900 dark:text-brand-200 uppercase tracking-wider">
                AI Coach Recommendation
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-100 dark:bg-brand-900/60 text-brand-700 dark:text-brand-300 font-semibold">
                High Priority
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
              &ldquo;Your accuracy in <strong>Organic Chemistry</strong> is improving, but you are taking <strong>18% longer</strong> than average (74s per question). Try a Medium difficulty speed drill today.&rdquo;
            </p>
          </div>
        </div>

        <Link href="/practice?mode=SPEED_DRILL" className="shrink-0">
          <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Start Speed Drill
          </Button>
        </Link>
      </div>

      {/* Main Grid: Smart Daily Plan vs Weak/Strong Topics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 cols): Today's Study Plan & Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Smart Daily Plan */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-base font-bold">Today&apos;s Study Plan</CardTitle>
                <p className="text-xs text-slate-500 mt-0.5">Customized automatically based on yesterday&apos;s errors</p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
                {completedTasksCount} / {tasks.length} Completed
              </span>
            </CardHeader>
            <CardContent className="space-y-2.5 pt-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                    task.done
                      ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500'
                      : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 hover:border-brand-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${
                      task.done ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 dark:border-slate-600'
                    }`}>
                      {task.done && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <span className={`text-xs font-medium ${task.done ? 'line-through' : ''}`}>
                      {task.label}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Practice Mode Launcher */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Practice Modes
              </h2>
              <Link href="/practice" className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1">
                <span>View all modes</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Link href="/practice?mode=QUICK">
                <Card hover className="p-4 text-center group cursor-pointer">
                  <div className="w-10 h-10 rounded-2xl bg-brand-50 dark:bg-brand-950 text-brand-600 mx-auto flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Zap className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Quick 10</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Mixed subjects</p>
                </Card>
              </Link>

              <Link href="/practice?mode=TOPIC">
                <Card hover className="p-4 text-center group cursor-pointer">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 mx-auto flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Target className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Topic Drill</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Targeted chapters</p>
                </Card>
              </Link>

              <Link href="/tests">
                <Card hover className="p-4 text-center group cursor-pointer">
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-950 text-purple-600 mx-auto flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Mock Exam</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Full simulation</p>
                </Card>
              </Link>

              <Link href="/ai-tutor">
                <Card hover className="p-4 text-center group cursor-pointer">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-500 to-purple-600 text-white mx-auto flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Bot className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">AI Quiz Me</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Dynamic Socratic</p>
                </Card>
              </Link>
            </div>
          </div>

        </div>

        {/* Right Column: Weak Topics & Strong Topics */}
        <div className="space-y-6">
          
          {/* Weak Topics Card */}
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-rose-600 dark:text-rose-400">
                <AlertTriangle className="w-4 h-4" />
                <span>Weak Topics (Needs Focus)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-1">
              {[
                { name: 'Organic Chemistry', accuracy: 48, attempts: 24, avgTime: '74s' },
                { name: 'Trigonometry & Calculus', accuracy: 52, attempts: 19, avgTime: '82s' },
                { name: 'Genetics (Punnett Squares)', accuracy: 58, attempts: 15, avgTime: '61s' },
              ].map((top) => (
                <div key={top.name} className="p-3 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{top.name}</p>
                    <span className="text-xs font-bold text-rose-600">{top.accuracy}%</span>
                  </div>
                  <Progress value={top.accuracy} variant="danger" size="sm" />
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1.5 font-medium">
                    <span>{top.attempts} attempted</span>
                    <span>Avg {top.avgTime} / question</span>
                  </div>
                </div>
              ))}
              <Link href="/mistakes" className="block pt-2">
                <Button variant="outline" size="sm" className="w-full text-xs">
                  Review 2 Mistake Notebook Entries
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Strong Topics Card */}
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Strong Topics (Mastered)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-1">
              {[
                { name: 'Cell Biology & Organelles', accuracy: 94, attempts: 32 },
                { name: "Newton's Laws & Kinematics", accuracy: 88, attempts: 28 },
                { name: 'Subject-Verb Agreement', accuracy: 92, attempts: 20 },
              ].map((top) => (
                <div key={top.name} className="p-3 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{top.name}</p>
                    <span className="text-xs font-bold text-emerald-600">{top.accuracy}%</span>
                  </div>
                  <Progress value={top.accuracy} variant="success" size="sm" />
                  <p className="text-[10px] text-slate-500 mt-1.5 font-medium">{top.attempts} questions solved correctly</p>
                </div>
              ))}
            </CardContent>
          </Card>

        </div>

      </div>

    </div>
  );
}
