'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Target, 
  Bot, 
  Sparkles, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  TrendingUp, 
  Play,
  Layers,
  Zap,
  HelpCircle
} from 'lucide-react';
import { SEED_TOPICS, SEED_QUESTIONS, SEED_CHAPTERS, SEED_SUBJECTS } from '@/lib/data/seedData';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, DifficultyBadge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { LatexRenderer } from '@/components/math/LatexRenderer';

export default function TopicHubPage({ params }: { params: { slug: string } }) {
  const topic = SEED_TOPICS.find(t => t.slug === params.slug) || SEED_TOPICS[0];
  const chapter = SEED_CHAPTERS.find(c => c.id === topic.chapterId);
  const subject = SEED_SUBJECTS.find(s => s.id === chapter?.subjectId);
  const questions = SEED_QUESTIONS.filter(q => q.topicId === topic.id);

  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  const handleFetchAiSummary = async () => {
    setIsLoadingAi(true);
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Explain this topic simply with key formulas and past paper shortcuts: ${topic.name}`,
          context: {
            subject: subject?.name,
            topic: topic.name,
          }
        }),
      });
      const data = await res.json();
      setAiSummary(data.reply);
    } catch {
      setAiSummary(`### Key High-Yield Formulas for ${topic.name}\n- Core principle applies in equilibrium\n- Ratio scaling rule: check exponential factors\n- Common trap: confusing average rate with instantaneous rate`);
    } finally {
      setIsLoadingAi(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      
      {/* Back button */}
      <div>
        <Link href="/exams" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-600 transition mb-3">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Syllabus</span>
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-brand-50 text-brand-600">
                {subject?.name || 'Physics'}
              </span>
              <span className="text-xs text-slate-400">/</span>
              <span className="text-xs text-slate-500">{chapter?.name}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              {topic.name}
            </h1>
          </div>

          <div className="flex gap-2.5">
            <Button
              variant="ai"
              size="sm"
              isLoading={isLoadingAi}
              onClick={handleFetchAiSummary}
              leftIcon={<Bot className="w-4 h-4" />}
            >
              AI Explain Topic
            </Button>
            <Link href={`/practice?topic=${topic.slug}`}>
              <Button variant="primary" size="sm" leftIcon={<Play className="w-4 h-4" />}>
                Practice All ({questions.length || 10} MCQs)
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hover>
          <CardContent className="p-4">
            <p className="text-xs text-slate-500">Student Mastery</p>
            <p className="text-2xl font-black text-brand-600 mt-1">82%</p>
            <Progress value={82} size="sm" className="mt-2" />
          </CardContent>
        </Card>

        <Card hover>
          <CardContent className="p-4">
            <p className="text-xs text-slate-500">Average Accuracy</p>
            <p className="text-2xl font-black text-emerald-600 mt-1">79%</p>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">Top 15% of students</p>
          </CardContent>
        </Card>

        <Card hover>
          <CardContent className="p-4">
            <p className="text-xs text-slate-500">Questions Available</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {questions.length > 0 ? questions.length : 12} MCQs
            </p>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">Including past papers</p>
          </CardContent>
        </Card>

        <Card hover>
          <CardContent className="p-4">
            <p className="text-xs text-slate-500">Recommended Time</p>
            <p className="text-2xl font-black text-indigo-600 mt-1">45 min</p>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">To reach 90% mastery</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Explanation Accordion/Box if loaded */}
      {aiSummary && (
        <Card className="border-brand-200 dark:border-brand-800 bg-gradient-to-br from-brand-50/40 to-purple-50/30 dark:from-brand-950/30 dark:to-purple-950/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold flex items-center gap-2 text-brand-700 dark:text-brand-300">
              <Bot className="w-4 h-4" />
              <span>AI Pedagogical Summary & Shortcuts</span>
            </CardTitle>
            <button 
              onClick={() => setAiSummary(null)}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              Dismiss
            </button>
          </CardHeader>
          <CardContent className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
            <LatexRenderer content={aiSummary} />
          </CardContent>
        </Card>
      )}

      {/* Action Hub as specified in Section 13 */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
          Topic Action Center
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link href={`/practice?topic=${topic.slug}&difficulty=EASY`}>
            <Card hover className="p-4 text-center cursor-pointer group">
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 mb-2">
                Easy
              </span>
              <p className="text-xs font-bold text-slate-900 dark:text-white">Practice Easy</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Foundational recall</p>
            </Card>
          </Link>

          <Link href={`/practice?topic=${topic.slug}&difficulty=MEDIUM`}>
            <Card hover className="p-4 text-center cursor-pointer group">
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700 mb-2">
                Medium
              </span>
              <p className="text-xs font-bold text-slate-900 dark:text-white">Practice Medium</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Concept application</p>
            </Card>
          </Link>

          <Link href={`/practice?topic=${topic.slug}&difficulty=HARD`}>
            <Card hover className="p-4 text-center cursor-pointer group">
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700 mb-2">
                Hard
              </span>
              <p className="text-xs font-bold text-slate-900 dark:text-white">Practice Hard</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Multi-step traps</p>
            </Card>
          </Link>

          <Link href={`/practice?topic=${topic.slug}&mode=SPEED_DRILL`}>
            <Card hover className="p-4 text-center cursor-pointer group">
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-700 mb-2">
                Timed Drill
              </span>
              <p className="text-xs font-bold text-slate-900 dark:text-white">Speed Drill</p>
              <p className="text-[10px] text-slate-400 mt-0.5">&lt;45s challenge</p>
            </Card>
          </Link>
        </div>
      </div>

      {/* Sample Question Preview */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
          Topic Sample Questions Preview
        </h2>

        <div className="space-y-3">
          {questions.map((q, idx) => (
            <Card key={q.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-brand-600">Question {idx + 1}</span>
                    <DifficultyBadge difficulty={q.difficulty} />
                  </div>
                  <span className="text-[10px] text-slate-400">{q.source}</span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                  <LatexRenderer content={q.questionText} />
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-xs">
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
                    <strong>A.</strong> {q.optionA}
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
                    <strong>B.</strong> {q.optionB}
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
                    <strong>C.</strong> {q.optionC}
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
                    <strong>D.</strong> {q.optionD}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

    </div>
  );
}
