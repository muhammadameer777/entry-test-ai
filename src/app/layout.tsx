import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppShell } from '@/components/navigation/AppShell';
import { getSessionUser } from '@/lib/auth';
import { DEMO_USER } from '@/lib/data/seedData';

export const metadata: Metadata = {
  title: 'PrepAI - AI-Powered Entry Test Preparation (ECAT, MDCAT, NUMS, NET, FAST)',
  description: 'Master ECAT, MDCAT, NUMS, NET and university entry tests with personalized AI tutoring, adaptive MCQ practice, mock exams and intelligent performance analysis.',
  keywords: 'MDCAT, ECAT, NUMS, NUST NET, FAST entry test, Pakistan medical entry test, engineering entry test, AI tutor, MCQ practice',
  openGraph: {
    title: 'PrepAI - Master Pakistan Entry Tests with AI',
    description: 'Learn Smarter. Practice Better. Ace Your Entry Test.',
    siteName: 'PrepAI',
    locale: 'en_PK',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSessionUser();
  const user = session || DEMO_USER;

  return (
    <html lang="en" className="h-full">
      <body className="h-full min-h-screen">
        <AppShell user={user}>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
