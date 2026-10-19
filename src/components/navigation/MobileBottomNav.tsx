'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Target, FileCheck, Bot, User } from 'lucide-react';

export function MobileBottomNav() {
  const pathname = usePathname();

  const items = [
    { label: 'Home', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Practice', href: '/practice', icon: Target },
    { label: 'Tests', href: '/tests', icon: FileCheck },
    { label: 'AI Tutor', href: '/ai-tutor', icon: Bot, isSpecial: true },
    { label: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200/80 dark:border-slate-800 px-2 py-1.5 flex items-center justify-around safe-area-bottom">
      {items.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
        const Icon = item.icon;

        if (item.isSpecial) {
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center -mt-4 group"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-600 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-brand-500/30 group-active:scale-95 transition-transform">
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-semibold mt-1 ${isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-500 dark:text-slate-400'}`}>
                {item.label}
              </span>
            </Link>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition ${
              isActive
                ? 'text-brand-600 dark:text-brand-400 font-semibold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default MobileBottomNav;
