'use client';

import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Target, 
  Calendar, 
  Award,
  Zap,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'all'>('7d');

  const accuracyData = [
    { day: 'Mon', accuracy: 72, questions: 45 },
    { day: 'Tue', accuracy: 75, questions: 60 },
    { day: 'Wed', accuracy: 70, questions: 50 },
    { day: 'Thu', accuracy: 82, questions: 65 },
    { day: 'Fri', accuracy: 78, questions: 70 },
    { day: 'Sat', accuracy: 85, questions: 90 },
    { day: 'Sun', accuracy: 80, questions: 40 },
  ];

  const subjectMastery = [
    { subject: 'Biology', mastery: 92, count: 140, color: 'bg-emerald-500' },
    { subject: 'Chemistry', mastery: 68, count: 110, color: 'bg-amber-500' },
    { subject: 'Physics', mastery: 62, count: 125, color: 'bg-rose-500' },
    { subject: 'English', mastery: 88, count: 50, color: 'bg-brand-500' },
    { subject: 'Logical Reasoning', mastery: 85, count: 25, color: 'bg-purple-500' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in pb-12">
      
      {/* Title & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Performance & Mastery Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Data-driven insights on solving speed, concept accuracy, and subject-wise merit readiness.
          </p>
        </div>

        {/* Time Filter Pills */}
        <div className="flex gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold">
          {(['7d', '30d', '90d', 'all'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-3 py-1.5 rounded-xl transition ${
                timeRange === r 
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold' 
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {r.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hover>
          <CardContent className="p-4">
            <p className="text-xs text-slate-500 font-medium">Questions Attempted</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">450</p>
            <p className="text-[11px] text-emerald-600 mt-1 font-bold">+65 this week</p>
          </CardContent>
        </Card>

        <Card hover>
          <CardContent className="p-4">
            <p className="text-xs text-slate-500 font-medium">Average Accuracy</p>
            <p className="text-2xl font-black text-emerald-600 mt-1">78.4%</p>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">Target: 85%+</p>
          </CardContent>
        </Card>

        <Card hover>
          <CardContent className="p-4">
            <p className="text-xs text-slate-500 font-medium">Average Solving Speed</p>
            <p className="text-2xl font-black text-brand-600 mt-1">48s / MCQ</p>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">Benchmark: &lt;54s</p>
          </CardContent>
        </Card>

        <Card hover>
          <CardContent className="p-4">
            <p className="text-xs text-slate-500 font-medium">Weekly Study Hours</p>
            <p className="text-2xl font-black text-purple-600 mt-1">8.5 hrs</p>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">Daily avg: 72 mins</p>
          </CardContent>
        </Card>
      </div>

      {/* Accuracy Trend Chart (Responsive Bar Graph) */}
      <Card>
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-bold">Accuracy & Volume Progression</CardTitle>
            <p className="text-xs text-slate-500 mt-0.5">Daily accuracy percentage across all attempted question drills</p>
          </div>
          <Badge variant="brand">Last 7 Days</Badge>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-56 flex items-end justify-between gap-3 sm:gap-6 pt-6 pb-2 border-b border-slate-100 dark:border-slate-800">
            {accuracyData.map((item) => (
              <div key={item.day} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[10px] font-bold text-slate-500 group-hover:text-brand-600 transition">
                  {item.accuracy}%
                </span>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden h-40 flex items-end">
                  <div
                    className="w-full bg-gradient-to-t from-brand-600 to-indigo-500 rounded-xl group-hover:brightness-110 transition-all duration-300"
                    style={{ height: `${(item.accuracy / 100) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {item.day}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Subject Mastery & Pacing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Subject Mastery Progress */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold">Subject Mastery Distribution</CardTitle>
            <p className="text-xs text-slate-500 mt-0.5">Calculated using difficulty-weighted adaptive formula</p>
          </CardHeader>
          <CardContent className="space-y-4 pt-1">
            {subjectMastery.map((sub) => (
              <div key={sub.subject} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{sub.subject}</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">{sub.mastery}% Mastery</span>
                </div>
                <Progress 
                  value={sub.mastery} 
                  variant={sub.mastery >= 75 ? 'success' : sub.mastery >= 60 ? 'warning' : 'danger'}
                  size="sm" 
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Speed vs Accuracy Quadrant Analysis */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold">Speed vs Accuracy Quadrant</CardTitle>
            <p className="text-xs text-slate-500 mt-0.5">Diagnosing whether lost marks stem from knowledge or timer stress</p>
          </CardHeader>
          <CardContent className="space-y-3 pt-1 text-xs">
            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50">
              <span className="font-bold text-emerald-800 dark:text-emerald-300">Fast & Accurate: Biology & English</span>
              <p className="text-slate-600 dark:text-slate-400 mt-0.5">High recall speed (avg 38s). Solid foundation.</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50">
              <span className="font-bold text-amber-800 dark:text-amber-300">Accurate but Slow: Chemistry Mechanisms</span>
              <p className="text-slate-600 dark:text-slate-400 mt-0.5">High accuracy (78%) but taking 74s per question. Needs speed drills.</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50">
              <span className="font-bold text-rose-800 dark:text-rose-300">Needs Conceptual Reinforcement: Physics Numericals</span>
              <p className="text-slate-600 dark:text-slate-400 mt-0.5">Kinematics & Electrostatics neutral point calculations.</p>
            </div>
          </CardContent>
        </Card>

      </div>

    </div>
  );
}
