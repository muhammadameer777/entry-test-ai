'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Target,
  BookOpen,
  FileCheck,
  Bot,
  CalendarCheck,
  AlertOctagon,
  Layers,
  FileText,
  BarChart3,
  Trophy,
  Sparkles,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  className?: string;
  isCollapsed?: boolean;
}

export function Sidebar({ className = '' }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'MCQ Practice', href: '/practice', icon: Target },
    { label: 'Exam Library', href: '/exams', icon: BookOpen },
    { label: 'Mock Tests', href: '/tests', icon: FileCheck },
    { label: 'AI Tutor', href: '/ai-tutor', icon: Bot, highlight: true },
    { label: 'AI MCQ Gen', href: '/ai-mcq-generator', icon: Sparkles },
    { label: 'Study Plan', href: '/study-plan', icon: CalendarCheck },
    { label: 'Mistake Notebook', href: '/mistakes', icon: AlertOctagon, countBadge: '2' },
    { label: 'Flashcards', href: '/flashcards', icon: Layers },
    { label: 'Study Notes', href: '/notes', icon: FileText },
    { label: 'Analytics', href: '/analytics', icon: BarChart3 },
    { label: 'Achievements', href: '/achievements', icon: Trophy },
  ];

  return (
    <aside className={`w-64 shrink-0 hidden md:block bg-slate-50/50 dark:bg-slate-900/50 border-r border-slate-200/80 dark:border-slate-800 p-4 min-h-[calc(100vh-4rem)] ${className}`}>
      
      {/* Quick Status / AI Assistant Banner */}
      <div className="mb-5 p-3 rounded-2xl bg-gradient-to-br from-brand-50 to-indigo-50/50 dark:from-brand-950/40 dark:to-indigo-950/20 border border-brand-200/50 dark:border-brand-800/40">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-6 h-6 rounded-lg bg-brand-600 text-white flex items-center justify-center text-xs">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold text-brand-900 dark:text-brand-200">AI Entry-Test Coach</span>
        </div>
        <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
          &ldquo;Focus on Organic Chem today to raise your score.&rdquo;
        </p>
      </div>

      {/* Main Navigation List */}
      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`} />
                <span>{item.label}</span>
              </div>

              {item.highlight && !isActive && (
                <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full bg-gradient-to-r from-brand-600 to-purple-600 text-white">
                  AI
                </span>
              )}

              {item.countBadge && !isActive && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
                  {item.countBadge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Admin Quick Switch Section */}
      <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800">
        <Link
          href="/admin"
          className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-brand-600" />
            <span>Admin Control</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
        </Link>
      </div>

    </aside>
  );
}

export default Sidebar;
