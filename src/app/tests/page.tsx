'use client';

import React from 'react';
import Link from 'next/link';
import { 
  FileCheck, 
  Clock, 
  Target, 
  AlertTriangle, 
  ArrowRight, 
  BarChart3, 
  Award,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SEED_MOCK_TESTS } from '@/lib/data/seedData';

export default function MockTestsLibraryPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Full-Length Mock Test Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Simulate authentic entrance test conditions with negative marking, section timers, and AI diagnostic reports.
          </p>
        </div>

        <Link href="/tests/att-mock-1/results">
          <Button variant="outline" size="sm" leftIcon={<BarChart3 className="w-4 h-4 text-brand-600" />}>
            View Last Mock Test Report (78%)
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SEED_MOCK_TESTS.map((test) => (
          <Card key={test.id} hover className="flex flex-col justify-between">
            <div>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="brand">{test.examName}</Badge>
                  <span className="text-xs text-slate-400 font-semibold">{test.totalQuestions} Questions</span>
                </div>
                <CardTitle className="text-lg font-bold">{test.title}</CardTitle>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{test.description}</p>
              </CardHeader>

              <CardContent className="space-y-2.5 pt-1 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> Duration
                  </span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{test.durationMinutes} Minutes</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5" /> Passing Benchmark
                  </span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{test.passingPercentage}%</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" /> Negative Marking
                  </span>
                  <span className={`font-bold ${test.negativeMarkingRatio > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {test.negativeMarkingRatio > 0 ? `-${test.negativeMarkingRatio} mark` : 'None (0 mark)'}
                  </span>
                </div>
              </CardContent>
            </div>

            <div className="p-5 pt-0">
              <Link href={`/tests/${test.id}/take`}>
                <Button variant="primary" size="md" className="w-full justify-between">
                  <span>Enter Simulated Exam</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>

    </div>
  );
}
