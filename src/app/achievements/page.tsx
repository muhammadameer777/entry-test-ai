'use client';

import React from 'react';
import { 
  Trophy, 
  Flame, 
  Award, 
  Zap, 
  CheckCircle2, 
  Lock, 
  Sparkles,
  Target
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { INITIAL_ACHIEVEMENTS, getLevelFromXP } from '@/lib/gamification';
import { DEMO_USER } from '@/lib/data/seedData';

export default function AchievementsPage() {
  const { level, currentXP, nextLevelXP, progressPercent } = getLevelFromXP(DEMO_USER.xp);

  const achievements = INITIAL_ACHIEVEMENTS.map((item, i) => ({
    ...item,
    unlocked: i < 3,
    progress: i < 3 ? 100 : i === 3 ? 65 : 40,
  }));

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in pb-12">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Achievements & Study Milestones
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Earn XP, climb preparation tiers, and celebrate consistency as you prepare for your entry test.
        </p>
      </div>

      {/* Gamification Level Banner */}
      <Card className="p-6 sm:p-8 bg-gradient-to-r from-brand-700 via-indigo-700 to-purple-800 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl font-black text-white shadow-lg">
              {level}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-200">Current Rank</span>
                <Badge variant="brand" size="sm">Aspirant Scholar</Badge>
              </div>
              <h2 className="text-2xl font-black mt-0.5">Level {level} Scholar</h2>
              <p className="text-xs text-brand-100 mt-1">
                {currentXP} Total XP accumulated • Next tier at {nextLevelXP} XP
              </p>
            </div>
          </div>

          <div className="sm:w-64 space-y-2">
            <div className="flex justify-between text-xs text-brand-100 font-semibold">
              <span>Tier Progress</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden">
              <div className="bg-white h-full rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </div>
      </Card>

      {/* Achievements Grid */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
          Badges & Milestones ({achievements.filter(a => a.unlocked).length} / {achievements.length} Unlocked)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.map((ach) => (
            <Card
              key={ach.slug}
              hover
              className={`p-6 flex flex-col justify-between ${
                ach.unlocked 
                  ? 'border-brand-200/80 dark:border-brand-900/50 bg-white dark:bg-slate-900 shadow-sm' 
                  : 'opacity-70 bg-slate-50 dark:bg-slate-900/40 border-dashed border-slate-200 dark:border-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{ach.icon}</span>
                  {ach.unlocked ? (
                    <Badge variant="easy" size="sm">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Unlocked</span>
                    </Badge>
                  ) : (
                    <Badge variant="default" size="sm">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Locked</span>
                    </Badge>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                  {ach.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {ach.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5">
                <div className="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  <span>+{ach.xpReward} XP Reward</span>
                  <span>{ach.progress}%</span>
                </div>
                <Progress value={ach.progress} size="sm" variant={ach.unlocked ? 'success' : 'default'} />
              </div>
            </Card>
          ))}
        </div>
      </div>

    </div>
  );
}
