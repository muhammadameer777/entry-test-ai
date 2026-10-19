'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Sparkles, 
  Check, 
  X, 
  Edit3, 
  RotateCcw, 
  CheckCircle2, 
  Bot,
  AlertCircle
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, DifficultyBadge } from '@/components/ui/Badge';
import { LatexRenderer } from '@/components/math/LatexRenderer';

export default function AIReviewQueuePage() {
  const [queue, setQueue] = useState([
    {
      id: 'rev-01',
      topic: 'Reaction Kinetics & Arrhenius Equation',
      questionText: 'If the activation energy of a chemical reaction is zero, what is the temperature coefficient of the rate constant k according to the Arrhenius relationship?',
      optionA: 'Infinite',
      optionB: 'Zero (Rate is completely temperature-independent)',
      optionC: 'Directly proportional to absolute temperature T',
      optionD: 'Exponentially decaying',
      correctOption: 'B',
      explanation: 'From Arrhenius: k = A · e^(-Ea / RT). If Ea = 0, then e^0 = 1, so k = A (constant). Hence, rate does not vary with temperature.',
      difficulty: 'HARD' as const,
      aiConfidence: 0.98,
    },
    {
      id: 'rev-02',
      topic: 'Kinematics & Projectile Motion',
      questionText: 'A ball is projected horizontally from a cliff of height 80 m with speed 15 m/s. Taking g = 10 m/s², what is its horizontal displacement before striking the ground?',
      optionA: '45 m',
      optionB: '60 m',
      optionC: '80 m',
      optionD: '120 m',
      correctOption: 'B',
      explanation: 'Time of flight t = √(2h / g) = √(2 · 80 / 10) = √16 = 4 seconds. Range R = v_x · t = 15 m/s · 4 s = 60 m.',
      difficulty: 'MEDIUM' as const,
      aiConfidence: 0.99,
    }
  ]);

  const [message, setMessage] = useState<string | null>(null);

  const handleApprove = (id: string) => {
    setQueue(queue.filter(item => item.id !== id));
    setMessage(`Question ${id} approved and published to production question bank!`);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleReject = (id: string) => {
    setQueue(queue.filter(item => item.id !== id));
    setMessage(`Question ${id} rejected.`);
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in pb-12">
      
      {/* Title */}
      <div>
        <Link href="/admin" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-600 mb-3">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Master Admin</span>
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                AI Question Moderation & Review Queue
              </h1>
              <Badge variant="ai">{queue.length} Pending</Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Verify curriculum alignment, mathematical correctness, and distractor plausibility before publishing to students.
            </p>
          </div>
        </div>
      </div>

      {message && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Review Queue Items */}
      {queue.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-3">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            All AI-generated questions reviewed!
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Generate new questions using the AI MCQ Generator to populate this queue.
          </p>
        </Card>
      ) : (
        <div className="space-y-5">
          {queue.map((item) => (
            <Card key={item.id} className="shadow-sm">
              <CardContent className="p-6 space-y-4 text-xs sm:text-sm">
                
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-brand-600">{item.id}</span>
                    <DifficultyBadge difficulty={item.difficulty} />
                    <span className="text-[10px] text-slate-400">• {item.topic}</span>
                  </div>

                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md">
                    AI Confidence: {Math.round(item.aiConfidence * 100)}%
                  </span>
                </div>

                <div className="font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
                  <LatexRenderer content={item.questionText} />
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  {[
                    { key: 'A', text: item.optionA },
                    { key: 'B', text: item.optionB },
                    { key: 'C', text: item.optionC },
                    { key: 'D', text: item.optionD },
                  ].map((opt) => (
                    <div
                      key={opt.key}
                      className={`p-3 rounded-xl border flex items-start gap-2.5 ${
                        item.correctOption === opt.key
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-900 font-semibold'
                          : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 text-slate-700'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0 ${
                        item.correctOption === opt.key ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {opt.key}
                      </span>
                      <div className="pt-0.5">
                        <LatexRenderer content={opt.text} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Explanation */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <span className="font-bold text-slate-800 dark:text-slate-200">Answer Explanation: </span>
                  <LatexRenderer content={item.explanation} />
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Review against PMDC / UET standard</span>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReject(item.id)}
                      leftIcon={<X className="w-3.5 h-3.5 text-rose-500" />}
                    >
                      Reject
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleApprove(item.id)}
                      leftIcon={<Check className="w-3.5 h-3.5" />}
                    >
                      Approve & Publish
                    </Button>
                  </div>
                </div>

              </CardContent>
            </Card>
          ))}
        </div>
      )}

    </div>
  );
}
