'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Users, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  Sparkles, 
  Upload, 
  BookOpen, 
  BarChart3, 
  FileCheck,
  Search,
  Filter,
  Check,
  X
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, DifficultyBadge } from '@/components/ui/Badge';
import { LatexRenderer } from '@/components/math/LatexRenderer';
import { dataStore } from '@/lib/storage';
import { QuestionItem } from '@/types';

export default function AdminDashboardPage() {
  const [questions, setQuestions] = useState<QuestionItem[]>(dataStore.questions);
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  const filtered = questions.filter(q => {
    const matchesSearch = q.questionText.toLowerCase().includes(search.toLowerCase()) || (q.tags && q.tags.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = selectedStatus === 'ALL' || q.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id: string) => {
    const updated = questions.filter(q => q.id !== id);
    setQuestions(updated);
    dataStore.questions = updated;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in pb-12">
      
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              PrepAI Master Administration
            </h1>
            <Badge variant="brand">Super Admin</Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Curriculum authoring, AI question moderation, student analytics, and platform syllabus governance.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <Link href="/admin/review">
            <Button variant="ai" size="sm" leftIcon={<Sparkles className="w-4 h-4" />}>
              Review AI Queue ({questions.filter(q => q.status === 'REVIEW').length || 2})
            </Button>
          </Link>
          <Link href="/admin/questions/new">
            <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
              Add New Question
            </Button>
          </Link>
        </div>
      </div>

      {/* Admin KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hover>
          <CardContent className="p-4">
            <p className="text-xs text-slate-500 font-medium">Total Registered Students</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">1,240</p>
            <p className="text-[11px] text-emerald-600 mt-1 font-bold">+184 this week</p>
          </CardContent>
        </Card>

        <Card hover>
          <CardContent className="p-4">
            <p className="text-xs text-slate-500 font-medium">Total Question Bank</p>
            <p className="text-2xl font-black text-brand-600 mt-1">{questions.length}</p>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">Across 5 Pakistani exams</p>
          </CardContent>
        </Card>

        <Card hover>
          <CardContent className="p-4">
            <p className="text-xs text-slate-500 font-medium">AI Tutor Prompts</p>
            <p className="text-2xl font-black text-purple-600 mt-1">8,420</p>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">Socratic dialogues</p>
          </CardContent>
        </Card>

        <Card hover>
          <CardContent className="p-4">
            <p className="text-xs text-slate-500 font-medium">Average Student Accuracy</p>
            <p className="text-2xl font-black text-emerald-600 mt-1">76.2%</p>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">National benchmark</p>
          </CardContent>
        </Card>
      </div>

      {/* Content Management & Question Bank Table */}
      <Card>
        <CardHeader className="pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-base font-bold">Curriculum Question Bank</CardTitle>
            <p className="text-xs text-slate-500 mt-0.5">Manage, edit, publish, or flag questions in the production database</p>
          </div>

          {/* Filter and Search */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search questions..."
                className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs w-48"
              />
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
            >
              <option value="ALL">All Statuses</option>
              <option value="PUBLISHED">Published</option>
              <option value="REVIEW">Pending Review</option>
              <option value="FLAGGED">Flagged Reports</option>
            </select>
          </div>
        </CardHeader>

        <CardContent className="pt-2">
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((q) => (
              <div key={q.id} className="py-4 space-y-2 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-slate-100">{q.id}</span>
                    <DifficultyBadge difficulty={q.difficulty} />
                    <span className="text-[10px] text-slate-400">• {q.source}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      q.status === 'PUBLISHED' 
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' 
                        : 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {q.status}
                    </span>

                    <button
                      onClick={() => handleDelete(q.id)}
                      className="text-xs text-rose-500 hover:text-rose-700 p-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                  <LatexRenderer content={q.questionText} />
                </div>

                <div className="text-[11px] text-slate-500 flex items-center gap-3">
                  <span>Correct Option: <strong>{q.correctOption}</strong></span>
                  <span>Estimated Time: {q.estimatedTimeSeconds}s</span>
                  <span>AI Confidence: {Math.round((q.aiConfidence || 0.95) * 100)}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
