'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Clock, Target, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SEED_EXAMS } from '@/lib/data/seedData';

export default function ExamsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Pakistan Entry Test Exam Library
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Explore complete official syllabi, subject breakdowns, negative marking penalties, and past paper question banks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SEED_EXAMS.map((exam) => (
          <Card key={exam.id} hover className="flex flex-col justify-between">
            <div>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="brand">{exam.name}</Badge>
                  <span className="text-xs text-slate-400 font-semibold">{exam.totalQuestions} MCQs</span>
                </div>
                <CardTitle className="text-lg font-bold">{exam.name}</CardTitle>
                <p className="text-xs text-slate-500 mt-1">{exam.description}</p>
              </CardHeader>

              <CardContent className="space-y-3 pt-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> Duration
                  </span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{exam.durationMinutes} minutes</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5" /> Negative Marking
                  </span>
                  <span className={`font-bold ${exam.negativeMarking > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {exam.negativeMarking > 0 ? `-${exam.negativeMarking} per incorrect` : 'None (0 mark deducted)'}
                  </span>
                </div>
              </CardContent>
            </div>

            <div className="p-5 pt-0">
              <Link href={`/exams/${exam.slug}`}>
                <Button variant="outline" size="sm" className="w-full justify-between hover:border-brand-500 hover:text-brand-600">
                  <span>View Subjects & Topics</span>
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
