'use client';

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  BookOpen, 
  Clock, 
  Target, 
  ArrowLeft, 
  CheckCircle2, 
  FileCheck, 
  Bot, 
  ChevronRight,
  Atom,
  FlaskConical,
  Dna,
  Binary,
  Lightbulb
} from 'lucide-react';
import { SEED_EXAMS, SEED_SUBJECTS, SEED_CHAPTERS, SEED_TOPICS } from '@/lib/data/seedData';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function ExamDetailPage({ params }: { params: { slug: string } }) {
  const exam = SEED_EXAMS.find(e => e.slug === params.slug || e.name.toLowerCase() === params.slug.toLowerCase()) || SEED_EXAMS[0];
  const subjects = SEED_SUBJECTS.filter(s => s.examId === exam.id || s.examId === 'exam-mdcat');

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      
      {/* Breadcrumb / Back button */}
      <div>
        <Link href="/exams" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-600 transition mb-3">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Exam Library</span>
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">{exam.name}</h1>
              <Badge variant="brand">{exam.totalQuestions} Questions</Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">{exam.description}</p>
          </div>

          <div className="flex gap-2">
            <Link href={`/practice?exam=${exam.slug}`}>
              <Button variant="primary" size="sm" leftIcon={<Target className="w-4 h-4" />}>
                Practice All Subjects
              </Button>
            </Link>
            <Link href="/tests">
              <Button variant="outline" size="sm" leftIcon={<FileCheck className="w-4 h-4" />}>
                Mock Tests
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Exam Specs Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <p className="text-xs text-slate-500">Duration Limit</p>
          <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">{exam.durationMinutes} Minutes</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <p className="text-xs text-slate-500">Negative Marking</p>
          <p className={`text-xl font-bold mt-1 ${exam.negativeMarking > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
            {exam.negativeMarking > 0 ? `-${exam.negativeMarking} Marks` : 'Zero (No Penalty)'}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <p className="text-xs text-slate-500">Target Benchmark</p>
          <p className="text-xl font-bold text-brand-600 mt-1">&lt;45s per MCQ</p>
        </div>
      </div>

      {/* Subjects & Chapter Tree */}
      <div>
        <h2 className="text-base font-bold uppercase tracking-wider text-slate-500 mb-4">
          Exam Subjects & Chapters
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {subjects.map((sub) => {
            const chapters = SEED_CHAPTERS.filter(c => c.subjectId === sub.id);

            return (
              <Card key={sub.id} hover>
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 flex items-center justify-center font-bold">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <CardTitle className="text-base font-bold">{sub.name}</CardTitle>
                      <p className="text-[11px] text-slate-400">{chapters.length} high-yield chapters</p>
                    </div>
                  </div>
                  <Link href={`/practice?subject=${sub.slug}`}>
                    <Button variant="ghost" size="sm" className="text-xs text-brand-600">
                      Practice Subject
                    </Button>
                  </Link>
                </CardHeader>

                <CardContent className="space-y-2 pt-1">
                  {chapters.map((chap) => {
                    const topics = SEED_TOPICS.filter(t => t.chapterId === chap.id);

                    return (
                      <div key={chap.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{chap.name}</span>
                          <span className="text-[10px] text-slate-400">{topics.length} topics</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {topics.map((top) => (
                            <Link
                              key={top.id}
                              href={`/topics/${top.slug}`}
                              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[11px] font-medium text-slate-700 dark:text-slate-300 hover:border-brand-500 hover:text-brand-600 transition flex items-center gap-1"
                            >
                              <span>{top.name}</span>
                              <ChevronRight className="w-3 h-3 opacity-40" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

    </div>
  );
}
