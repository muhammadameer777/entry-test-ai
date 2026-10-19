'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, 
  Flame, 
  Award, 
  Bell, 
  Search, 
  Moon, 
  Sun, 
  User as UserIcon, 
  LogOut, 
  Settings, 
  ShieldCheck,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface TopHeaderProps {
  user?: {
    name: string;
    email: string;
    xp: number;
    streak: number;
    currentLevel: number;
    targetExamName?: string;
  };
}

export function TopHeader({ user }: TopHeaderProps) {
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleDarkMode = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      setIsDark(false);
    } else {
      html.classList.add('dark');
      setIsDark(true);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/auth/login');
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-brand-700 via-indigo-600 to-purple-600 dark:from-brand-400 dark:via-indigo-300 dark:to-purple-300 bg-clip-text text-transparent">
                PrepAI
              </span>
              <span className="hidden sm:inline-block ml-1.5 text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-200/50">
                Pakistan
              </span>
            </div>
          </Link>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div 
            onClick={() => setShowSearchModal(true)}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 cursor-pointer transition text-sm"
          >
            <Search className="w-4 h-4 shrink-0" />
            <span className="text-xs text-slate-400">Search topics, questions, formulas, past papers...</span>
            <kbd className="hidden lg:inline-flex ml-auto text-[10px] bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded shadow-sm border border-slate-200 dark:border-slate-600 text-slate-500">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* User Stats & Quick Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Exam Countdown Pill */}
          {user?.targetExamName && (
            <Link 
              href="/study-plan" 
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/40 text-xs font-medium text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 transition"
            >
              <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>27 days until {user.targetExamName}</span>
            </Link>
          )}

          {/* Gamification: Streak */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/40 text-xs font-semibold text-amber-700 dark:text-amber-400">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse-slow" />
            <span>{user?.streak || 12}d</span>
          </div>

          {/* Gamification: Level & XP */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950/40 border border-brand-200/60 dark:border-brand-800/40 text-xs font-semibold text-brand-700 dark:text-brand-300">
            <Award className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
            <span>Lv.{user?.currentLevel || 4}</span>
            <span className="text-[10px] opacity-75 font-normal">({user?.xp || 1420} XP)</span>
          </div>

          {/* Dark / Light Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* User Menu Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1 pl-2 pr-1 rounded-full border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50 dark:bg-slate-800 transition"
            >
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 hidden md:inline">
                {user?.name?.split(' ')[0] || 'Ali'}
              </span>
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-brand-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                {user?.name ? user.name[0].toUpperCase() : 'A'}
              </div>
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-fade-in">
                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">{user?.name || 'Ali Khan'}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user?.email || 'ali@prepai.pk'}</p>
                </div>
                
                <Link 
                  href="/profile" 
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span>Student Profile</span>
                </Link>

                <Link 
                  href="/admin" 
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/40 transition font-medium"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Portal</span>
                </Link>

                <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition text-left"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Global Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <Search className="w-5 h-5 text-brand-600" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics, questions, past papers, notes..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400"
                autoFocus
              />
              <button 
                onClick={() => setShowSearchModal(false)}
                className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1 rounded bg-slate-100 dark:bg-slate-800"
              >
                ESC
              </button>
            </div>
            <div className="p-4 max-h-80 overflow-y-auto space-y-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Quick Suggestions</p>
              <div 
                onClick={() => { setShowSearchModal(false); router.push('/topics/newtons-laws'); }}
                className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer flex items-center justify-between text-xs"
              >
                <span className="font-medium text-slate-800 dark:text-slate-200">Newton's Laws & Momentum</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-brand-50 text-brand-600">Physics Topic</span>
              </div>
              <div 
                onClick={() => { setShowSearchModal(false); router.push('/practice?mode=WEAK_TOPIC'); }}
                className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer flex items-center justify-between text-xs"
              >
                <span className="font-medium text-slate-800 dark:text-slate-200">Weak Topics Drill</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-rose-50 text-rose-600">Practice</span>
              </div>
              <div 
                onClick={() => { setShowSearchModal(false); router.push('/ai-tutor'); }}
                className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer flex items-center justify-between text-xs"
              >
                <span className="font-medium text-slate-800 dark:text-slate-200">Ask AI Tutor: "Explain Nitration of Benzene"</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-50 text-purple-600">AI Prompt</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default TopHeader;
