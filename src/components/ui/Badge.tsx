import React from 'react';
import { Difficulty } from '@/types';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'easy' | 'medium' | 'hard' | 'expert' | 'correct' | 'incorrect' | 'ai' | 'brand';
  size?: 'sm' | 'md';
}

export function Badge({ className = '', variant = 'default', size = 'sm', children, ...props }: BadgeProps) {
  const baseStyles = 'inline-flex items-center font-medium rounded-full select-none';

  const variants = {
    default: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    outline: 'border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300',
    brand: 'bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border border-brand-200/50 dark:border-brand-800/50',
    easy: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40',
    medium: 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40',
    hard: 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400 border border-rose-200 dark:border-rose-800/40',
    expert: 'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400 border border-purple-200 dark:border-purple-800/40',
    correct: 'bg-emerald-500 text-white shadow-sm',
    incorrect: 'bg-rose-500 text-white shadow-sm',
    ai: 'bg-gradient-to-r from-brand-600 to-purple-600 text-white shadow-sm font-semibold tracking-wide',
  };

  const sizes = {
    sm: 'text-[11px] px-2.5 py-0.5 gap-1',
    md: 'text-xs px-3 py-1 gap-1.5',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </span>
  );
}

export function DifficultyBadge({ difficulty, size = 'sm' }: { difficulty: string; size?: 'sm' | 'md' }) {
  const norm = (difficulty || 'MEDIUM').toUpperCase();
  const variantMap: Record<string, 'easy' | 'medium' | 'hard' | 'expert'> = {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard',
    EXPERT: 'expert',
  };

  const variant = variantMap[norm] || 'medium';

  return (
    <Badge variant={variant} size={size}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {norm}
    </Badge>
  );
}

export default Badge;
