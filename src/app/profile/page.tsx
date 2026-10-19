'use client';

import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  BookOpen, 
  Calendar, 
  Clock, 
  Target, 
  ShieldCheck, 
  Bell, 
  Sparkles, 
  Save, 
  Check,
  Award,
  Flame
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DEMO_USER } from '@/lib/data/seedData';

export default function StudentProfilePage() {
  const [name, setName] = useState(DEMO_USER.name);
  const [email] = useState(DEMO_USER.email);
  const [educationLevel, setEducationLevel] = useState(DEMO_USER.educationLevel);
  const [targetExam, setTargetExam] = useState(DEMO_USER.targetExamName || 'MDCAT');
  const [targetUniversity, setTargetUniversity] = useState(DEMO_USER.targetUniversity || 'King Edward Medical University');
  const [dailyTime, setDailyTime] = useState(DEMO_USER.dailyStudyTimeMinutes);
  
  // Notification Toggles
  const [studyReminder, setStudyReminder] = useState(true);
  const [streakAlert, setStreakAlert] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState(true);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Student Profile & Preferences
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage your personal details, target university goals, and AI tutor coaching settings.
        </p>
      </div>

      {/* Profile Overview Card */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-brand-600 to-purple-600 text-white flex items-center justify-center text-3xl font-black shadow-lg shadow-brand-500/20">
            {name[0]}
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{name}</h2>
              <Badge variant="brand">MDCAT Candidate</Badge>
              <Badge variant="easy">12-Day Streak 🔥</Badge>
            </div>
            <p className="text-xs text-slate-500">{email} • {educationLevel}</p>
            <p className="text-xs text-brand-600 font-semibold mt-1">
              Target: {targetUniversity}
            </p>
          </div>
        </div>
      </Card>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Academic Settings */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-brand-600" />
              <span>Target Exam & Academic Parameters</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-1 text-xs">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Registered Email (Fixed)
                </label>
                <input
                  type="email"
                  disabled
                  value={email}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-400 text-sm cursor-not-allowed"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Target Exam
                </label>
                <select
                  value={targetExam}
                  onChange={(e) => setTargetExam(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                >
                  <option value="MDCAT">MDCAT (PMDC / UHS)</option>
                  <option value="ECAT">ECAT (UET)</option>
                  <option value="NET">NET (NUST)</option>
                  <option value="NUMS">NUMS</option>
                  <option value="FAST">FAST-NU</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Daily Study Goal
                </label>
                <select
                  value={dailyTime}
                  onChange={(e) => setDailyTime(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                >
                  <option value={30}>30 mins / day</option>
                  <option value={60}>60 mins / day</option>
                  <option value={75}>75 mins / day (Current)</option>
                  <option value={120}>2 hours / day</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Target University
                </label>
                <input
                  type="text"
                  value={targetUniversity}
                  onChange={(e) => setTargetUniversity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>
            </div>

          </CardContent>
        </Card>

        {/* Notifications & AI Preferences */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Bell className="w-4 h-4 text-brand-600" />
              <span>Smart Notification Preferences</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-1 text-xs">
            
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <div>
                <p className="font-bold text-slate-900 dark:text-slate-100">Daily Study Habit Reminders</p>
                <p className="text-[11px] text-slate-400">Receive gentle alerts if today&apos;s 60-question goal is unfinished by evening.</p>
              </div>
              <input
                type="checkbox"
                checked={studyReminder}
                onChange={() => setStudyReminder(!studyReminder)}
                className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <div>
                <p className="font-bold text-slate-900 dark:text-slate-100">Study Streak Protection</p>
                <p className="text-[11px] text-slate-400">Alert before midnight (Pakistan Time) to keep your streak intact.</p>
              </div>
              <input
                type="checkbox"
                checked={streakAlert}
                onChange={() => setStreakAlert(!streakAlert)}
                className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <div>
                <p className="font-bold text-slate-900 dark:text-slate-100">AI Coach Weak-Topic Detection</p>
                <p className="text-[11px] text-slate-400">Allow autonomous recommendations when accuracy drops below 60% on any topic.</p>
              </div>
              <input
                type="checkbox"
                checked={aiSuggestions}
                onChange={() => setAiSuggestions(!aiSuggestions)}
                className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
              />
            </div>

          </CardContent>
        </Card>

        {/* Save Bar */}
        <div className="flex items-center justify-between">
          {savedSuccess && (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
              <Check className="w-4 h-4" /> Profile updated successfully!
            </span>
          )}
          <div className="ml-auto">
            <Button type="submit" variant="primary" size="md" leftIcon={<Save className="w-4 h-4" />}>
              Save Changes
            </Button>
          </div>
        </div>

      </form>

    </div>
  );
}
