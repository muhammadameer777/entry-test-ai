'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  CalendarCheck, 
  Sparkles, 
  Clock, 
  Check, 
  Target, 
  Bot, 
  BookOpen, 
  Flame, 
  ArrowRight,
  TrendingUp,
  RotateCcw
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';

export default function StudyPlanPage() {
  const [tasks, setTasks] = useState([
    { id: 'p1', day: 'Today (Wednesday)', subject: 'Chemistry', time: '30 min', title: 'Hydrocarbons & Benzene Electrophilic Substitution', done: true },
    { id: 'p2', day: 'Today (Wednesday)', subject: 'Physics', time: '30 min', title: 'Work-Energy Theorem & Power Numericals', done: true },
    { id: 'p3', day: 'Today (Wednesday)', subject: 'AI Drill', time: '15 min', title: '15-question speed drill on weakest mistakes', done: false },
    { id: 'p4', day: 'Thursday', subject: 'Biology', time: '40 min', title: 'Cell Organelles & Lysosome Function Review', done: false },
    { id: 'p5', day: 'Thursday', subject: 'English', time: '20 min', title: 'Subject-Verb Agreement & Proximity Rules', done: false },
    { id: 'p6', day: 'Friday', subject: 'Mixed Simulation', time: '60 min', title: 'Weekly Diagnostic Mock Exam (Series 2)', done: false },
    { id: 'p7', day: 'Saturday', subject: 'Revision', time: '45 min', title: 'Clear unresolved entries in Mistake Notebook', done: false },
  ]);

  const [isRegenerating, setIsRegenerating] = useState(false);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const completedCount = tasks.filter(t => t.done).length;

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setIsRegenerating(false);
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in pb-12">
      
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-700 via-indigo-700 to-purple-800 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-brand-200 mb-3">
            <Clock className="w-3.5 h-3.5" />
            <span>27 Days Remaining Until MDCAT 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Personalized Adaptive Study Plan
          </h1>
          <p className="text-xs sm:text-sm text-brand-100 mt-1 max-w-xl">
            Allocating <strong>75 minutes daily</strong> across your target syllabus with automatic revisions for topics where accuracy drops.
          </p>
        </div>

        <Button
          variant="ai"
          size="md"
          isLoading={isRegenerating}
          onClick={handleRegenerate}
          leftIcon={<Sparkles className="w-4 h-4" />}
          className="border border-white/30"
        >
          Recalibrate Plan with AI
        </Button>
      </div>

      {/* Progress & Overview Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card hover>
          <CardContent className="p-4">
            <p className="text-xs text-slate-500 font-medium">Weekly Completion</p>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {completedCount} / {tasks.length}
              </span>
              <span className="text-xs font-bold text-brand-600">
                {Math.round((completedCount / tasks.length) * 100)}%
              </span>
            </div>
            <Progress value={(completedCount / tasks.length) * 100} size="sm" className="mt-2" />
          </CardContent>
        </Card>

        <Card hover>
          <CardContent className="p-4">
            <p className="text-xs text-slate-500 font-medium">Daily Target Commitment</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">75 Minutes</p>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">~60 MCQs / day</p>
          </CardContent>
        </Card>

        <Card hover>
          <CardContent className="p-4">
            <p className="text-xs text-slate-500 font-medium">Target Merit Score</p>
            <p className="text-2xl font-black text-emerald-600 mt-1">88%+</p>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">King Edward / UHS Merit Zone</p>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Schedule Task List */}
      <Card>
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-bold">This Week&apos;s Curriculum Roadmap</CardTitle>
            <p className="text-xs text-slate-500 mt-0.5">Click any session to mark it completed as you study</p>
          </div>
          <Badge variant="brand">Adaptive Schedule</Badge>
        </CardHeader>

        <CardContent className="space-y-3 pt-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                task.done
                  ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-brand-500'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center border transition ${
                  task.done ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 dark:border-slate-600'
                }`}>
                  {task.done && <Check className="w-4 h-4" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {task.day}
                    </span>
                    <span className="text-[10px] font-bold text-brand-600">
                      {task.subject}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">• {task.time}</span>
                  </div>
                  <p className={`text-xs sm:text-sm font-semibold mt-1 ${task.done ? 'line-through opacity-70' : ''}`}>
                    {task.title}
                  </p>
                </div>
              </div>

              <div className="hidden sm:block">
                <span className="text-[11px] font-medium text-slate-400">
                  {task.done ? 'Completed' : 'Pending'}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

    </div>
  );
}
