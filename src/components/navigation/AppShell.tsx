'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { TopHeader } from './TopHeader';
import { Sidebar } from './Sidebar';
import { MobileBottomNav } from './MobileBottomNav';

interface AppShellProps {
  children: React.ReactNode;
  user?: any;
}

export function AppShell({ children, user }: AppShellProps) {
  const pathname = usePathname();

  // Pages that don't need sidebar/nav (e.g. landing page, full exam simulation, auth screens)
  const isAuthPage = pathname.startsWith('/auth') || pathname.startsWith('/onboarding');
  const isLandingPage = pathname === '/';
  const isRealExamScreen = pathname.includes('/take');

  if (isAuthPage || isLandingPage || isRealExamScreen) {
    return <main className="min-h-screen bg-slate-50 dark:bg-slate-950">{children}</main>;
  }

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
      <TopHeader user={user} />
      <div className="flex-1 flex max-w-7xl w-full mx-auto pb-16 md:pb-6">
        <Sidebar />
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}

export default AppShell;
