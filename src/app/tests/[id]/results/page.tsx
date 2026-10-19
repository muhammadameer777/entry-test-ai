'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  TrendingUp, 
  Bot, 
  Sparkles, 
  RotateCcw, 
  ArrowRight, 
  LayoutDashboard,
  Zap,
  Target
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { dataStore } from '@/lib/storage';

export default function TestResultPage({ params }: { params: { id: string } }) {
  const result = dataStore.testAttempts[0];

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in pb-12">
      
      {/* Top Banner / Celebration */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-700 via-indigo-700 to-purple-800 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-brand-200 mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>MDCAT Diagnostic Simulation Completed</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Diagnostic Score: {result.score} / {result.maxScore} ({result.percentage}%)
          </h1>
          <p className="text-xs sm:text-sm text-brand-100 mt-1 max-w-xl">
            You surpassed the 65% qualification benchmark. Your primary gains are in Biology; target Physics speed drills next.
          </p>
        </div>

        <div className="flex gap-3">
          <Link href="/practice?mode=WEAK_TOPIC">
            <Button size="md" className="bg-white hover:bg-slate-100 text-brand-700 font-bold shadow-lg" leftIcon={<RotateCcw className="w-4 h-4" />}>
              Retry Weak Questions
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="md" variant="ai" className="border border-white/30" leftIcon={<LayoutDashboard className="w-4 h-4" />}>
              Dashboard
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card hover>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-slate-500 font-medium">Correct Answers</p>
            <p className="text-2xl font-black text-emerald-600 mt-1">7</p>
            <p className="text-[10px] text-slate-400 mt-0.5">70% Accuracy</p>
          </CardContent>
        </Card>

        <Card hover>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-slate-500 font-medium">Incorrect Answers</p>
            <p className="text-2xl font-black text-rose-600 mt-1">2</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Logged in Notebook</p>
          </CardContent>
        </Card>

        <Card hover>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-slate-500 font-medium">Skipped Questions</p>
            <p className="text-2xl font-black text-slate-600 dark:text-slate-300 mt-1">1</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Avoided -1 penalty</p>
          </CardContent>
        </Card>

        <Card hover>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-slate-500 font-medium">Total Time Spent</p>
            <p className="text-2xl font-black text-brand-600 mt-1">7m 00s</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Avg 42s / question</p>
          </CardContent>
        </Card>
      </div>

      {/* Post-Test AI Diagnostic Report Card (Section 26 Requirement) */}
      <Card className="border-brand-200/80 dark:border-brand-800/80 bg-gradient-to-br from-brand-50/20 via-white to-purple-50/20 dark:from-slate-900 dark:via-slate-900 dark:to-purple-950/20 shadow-md">
        <CardHeader className="pb-3 border-b border-brand-100 dark:border-brand-900/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-purple-600 text-white flex items-center justify-center font-bold">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <CardTitle className="text-base font-bold text-slate-900 dark:text-white">
                  Post-Test AI Diagnostic & Merit Prediction
                </CardTitle>
                <p className="text-xs text-slate-500">Autonomous evaluation calibrated against Pakistani medical/engineering percentiles</p>
              </div>
            </div>
            <Badge variant="ai">AI Analysis Complete</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-5 pt-4 text-xs sm:text-sm">
          
          {/* Summary */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 leading-relaxed text-slate-700 dark:text-slate-300">
            <strong>Executive Diagnostic: </strong>
            {result.aiAnalysis?.overallSummary}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Strengths */}
            <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Verified Strengths</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {result.aiAnalysis?.strengths.map((str, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>Weak Areas & Traps</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {result.aiAnalysis?.weaknesses.map((wk, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <span>{wk}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Speed & Predicted Merit Score */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1">
              <p className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand-600" /> Speed Pacing Analysis
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {result.aiAnalysis?.speedAnalysis}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-brand-50/60 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-900/50 space-y-1">
              <p className="text-xs font-bold text-brand-900 dark:text-brand-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-600" /> Estimated Final Exam Performance
              </p>
              <p className="text-xs text-brand-800 dark:text-brand-200 font-semibold leading-relaxed">
                {result.aiAnalysis?.predictedExamScore}
              </p>
            </div>
          </div>

          {/* Actionable Recommendations */}
          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Next Action Plan Before Next Mock Exam
            </h4>
            <div className="space-y-2">
              {result.aiAnalysis?.actionableRecommendations.map((rec, i) => (
                <div key={i} className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-bold text-xs flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 pt-0.5">{rec}</p>
                </div>
              ))}
            </div>
          </div>

        </CardContent>
      </Card>

      {/* Subject-Wise Performance Breakdown */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold">Subject-Wise Performance Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-1">
          {result.subjectBreakdown.map((sub) => (
            <div key={sub.subject} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200">{sub.subject}</span>
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  {sub.correct} / {sub.total} ({sub.accuracy}%)
                </span>
              </div>
              <Progress 
                value={sub.accuracy} 
                variant={sub.accuracy >= 70 ? 'success' : sub.accuracy >= 50 ? 'warning' : 'danger'}
                size="sm" 
              />
            </div>
          ))}
        </CardContent>
      </Card>

    </div>
  );
}
