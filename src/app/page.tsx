'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  Bot, 
  CheckCircle2, 
  Zap, 
  Brain, 
  ShieldCheck, 
  BarChart3, 
  Flame, 
  BookOpen, 
  Target,
  Clock,
  Layers,
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function LandingPage() {
  const exams = [
    { name: 'MDCAT', tag: 'PMDC / UHS', desc: 'Medical & Dental Colleges', questions: '200 MCQs', color: 'from-emerald-500 to-teal-700' },
    { name: 'ECAT', tag: 'UET Lahore', desc: 'Punjab Engineering Colleges', questions: '100 MCQs (-1 mark)', color: 'from-blue-600 to-indigo-800' },
    { name: 'NET', tag: 'NUST', desc: 'National Univ of Sciences & Tech', questions: '200 MCQs', color: 'from-indigo-600 to-purple-800' },
    { name: 'NUMS', tag: 'AMC Rawalpindi', desc: 'National Univ of Medical Sciences', questions: '150 MCQs', color: 'from-rose-500 to-pink-700' },
    { name: 'FAST-NU', tag: 'FAST CS/SE', desc: 'Computer Science & Software', questions: '100 MCQs', color: 'from-amber-500 to-orange-700' },
    { name: 'General Entry', tag: 'PIEAS / GIKI', desc: 'University Admission Tests', questions: 'Configurable', color: 'from-slate-700 to-slate-900' },
  ];

  const features = [
    {
      icon: Bot,
      title: 'Socratic AI Tutor',
      desc: 'Never gives away the answer immediately. Guides you step-by-step with hints, formulas, and conceptual shortcuts.',
    },
    {
      icon: Target,
      title: 'Adaptive Learning Engine',
      desc: 'Difficulty calibrates automatically from Easy to Expert based on your response time and mistake patterns.',
    },
    {
      icon: Brain,
      title: 'Weak Topic Detection',
      desc: 'Pinpoints specific concepts where you lose marks or spend too long, then prescribes targeted 10-minute speed drills.',
    },
    {
      icon: Clock,
      title: 'Real Exam Simulation',
      desc: 'Official interface simulation with negative marking, section timers, question palettes, and autosave protection.',
    },
    {
      icon: Layers,
      title: 'Automated Mistake Notebook',
      desc: 'Every wrong answer is automatically cataloged by reason (Concept, Calculation, Careless) with instant retry options.',
    },
    {
      icon: BarChart3,
      title: 'Post-Test AI Diagnostics',
      desc: 'Detailed breakdown of knowledge mastery, speed efficiency, predicted merit rank, and high-yield focus areas.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-brand-500 selection:text-white">
      
      {/* Public Navigation */}
      <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-brand-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                PrepAI
              </span>
              <span className="hidden sm:inline-block ml-1.5 text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-brand-50 text-brand-600 border border-brand-200/50">
                Pakistan
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            <Link href="#exams" className="hover:text-brand-600 transition">Exams</Link>
            <Link href="#ai-tutor" className="hover:text-brand-600 transition">AI Tutor</Link>
            <Link href="#features" className="hover:text-brand-600 transition">Features</Link>
            <Link href="#how-it-works" className="hover:text-brand-600 transition">How It Works</Link>
            <Link href="#pricing" className="hover:text-brand-600 transition">Pricing</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200/60 dark:border-brand-800/60 text-xs font-semibold text-brand-700 dark:text-brand-300 mb-6">
            <Sparkles className="w-4 h-4 text-brand-600 animate-pulse" />
            <span>AI-Powered Medical & Engineering Entrance Preparation</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.15]">
            Your AI-Powered Entry Test Preparation Platform
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Master ECAT, MDCAT, NUMS, NET and university entry tests with personalized AI tutoring, adaptive MCQ practice, mock exams and intelligent performance analysis.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link href="/auth/register" className="w-full sm:w-auto">
              <Button size="lg" variant="primary" className="w-full text-base px-8 py-4 shadow-lg shadow-brand-600/25">
                Start Preparing Free
              </Button>
            </Link>
            <Link href="/ai-tutor" className="w-full sm:w-auto">
              <Button size="lg" variant="ai" className="w-full text-base px-8 py-4" leftIcon={<Bot className="w-5 h-5" />}>
                Try Socratic AI Tutor
              </Button>
            </Link>
          </div>

          {/* Metric Highlights */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <p className="text-2xl sm:text-3xl font-extrabold text-brand-600">5+ Exams</p>
              <p className="text-xs text-slate-500 mt-1">MDCAT, ECAT, NUMS, NET, FAST</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600">&lt;45s Drills</p>
              <p className="text-xs text-slate-500 mt-1">Speed Pacing & Shortcuts</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <p className="text-2xl sm:text-3xl font-extrabold text-indigo-600">Adaptive</p>
              <p className="text-xs text-slate-500 mt-1">Difficulty Auto-Calibration</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <p className="text-2xl sm:text-3xl font-extrabold text-purple-600">100% Socratic</p>
              <p className="text-xs text-slate-500 mt-1">Hints Instead of Spoilers</p>
            </div>
          </div>

        </div>
      </section>

      {/* Exam Categories Section */}
      <section id="exams" className="py-16 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Configured for Pakistan&apos;s Most Competitive Entry Tests
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Each syllabus, chapter breakdown, time limit, and marking formula is strictly modeled after official testing boards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {exams.map((ex) => (
              <div 
                key={ex.name}
                className="group relative p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 hover:border-brand-500/50 transition duration-200 hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                      {ex.tag}
                    </span>
                    <span className="text-xs font-medium text-slate-400">{ex.questions}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-brand-600 transition">
                    {ex.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                    {ex.desc}
                  </p>
                </div>

                <Link href={`/exams/${ex.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
                  <Button variant="outline" size="sm" className="w-full justify-between group-hover:border-brand-500 group-hover:text-brand-600">
                    <span>View Syllabus & Practice</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Tutor Socratic Showcase */}
      <section id="ai-tutor" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-xs font-semibold text-purple-700 dark:text-purple-300 mb-4">
              <Bot className="w-4 h-4 text-purple-600" />
              <span>Pedagogically Sound Socratic Teaching</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              An AI Tutor That Teaches You How to Think
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Standard AI chatbots simply spit out the answer, depriving students of critical problem-solving skills. PrepAI uses the <strong>Socratic Method</strong>: guiding you through the knowns, applying the governing equation, and teaching calculation shortcuts so you can solve under 45-second exam pressure.
            </p>

            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <strong>2-Stage Socratic Hints:</strong> Guides your conceptual intuition before providing full solutions.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <strong>Explain My Mistake:</strong> Explains why your selected distractor was tempting and how to spot it.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <strong>LaTeX Math & Formulas:</strong> Crystal-clear rendering of integrals, chemical reactions, and physical vectors.
                </span>
              </li>
            </ul>

            <div className="mt-8">
              <Link href="/ai-tutor">
                <Button variant="ai" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Experience the AI Tutor Live
                </Button>
              </Link>
            </div>
          </div>

          {/* Interactive Chat Card Simulation */}
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl p-6 relative">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                AI
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">PrepAI Mentor</h4>
                <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Socratic Mode Active
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <div className="bg-slate-100 dark:bg-slate-800/80 p-3.5 rounded-2xl max-w-[85%] text-slate-800 dark:text-slate-200">
                &ldquo;I got this projectile question wrong: why is the acceleration at the top not equal to zero?&rdquo;
              </div>

              <div className="bg-brand-50 dark:bg-brand-950/50 border border-brand-200/50 dark:border-brand-800/50 p-4 rounded-2xl ml-auto max-w-[90%] text-slate-800 dark:text-slate-200 space-y-2">
                <p className="font-semibold text-brand-700 dark:text-brand-300">💡 Let&apos;s think about forces:</p>
                <p>When the projectile is at its highest point, what forces are acting on it?</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                  Hint: Does gravity turn off just because the vertical speed momentarily hits zero?
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Core Features Grid */}
      <section id="features" className="py-20 bg-slate-100/50 dark:bg-slate-900/50 border-t border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight">
              Engineered Around the Learning Loop
            </h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              LEARN → PRACTICE → GET FEEDBACK → UNDERSTAND MISTAKE → RETRY → ADAPT DIFFICULTY → MOCK TEST
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div 
                  key={feat.title}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/60 border border-brand-200/50 dark:border-brand-800/40 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Authentic Pakistani Student Testimonials */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight">
            Trusted by Students Entering Top Medical & Engineering Universities
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Real feedback from pre-medical and pre-engineering aspirants.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
              &ldquo;The Mistake Notebook and Socratic AI Tutor completely transformed how I prepared for MDCAT. Instead of memorizing answers, I understood why I was making careless mistakes in Chemistry.&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                FK
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Fatima Khalid</p>
                <p className="text-[10px] text-slate-500">MDCAT Aspirant • King Edward Medical University</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
              &ldquo;In ECAT, negative marking (-1) used to kill my score. The speed drills and real exam simulator trained my pacing so I only answered questions with high confidence.&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                UA
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Usman Ahmed</p>
                <p className="text-[10px] text-slate-500">ECAT & NET Aspirant • NUST SEECS</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
              &ldquo;The KaTeX mathematical formula rendering and AI explanation of King’s property in definite integrals saved me hours of academy coaching.&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center">
                ZA
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Zainab Aslam</p>
                <p className="text-[10px] text-slate-500">FAST & GIKI Aspirant • ICS Computer Science</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Footer Banner */}
      <section className="py-16 bg-gradient-to-r from-brand-700 via-indigo-700 to-purple-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Ace Your Entry Test?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-brand-100 max-w-xl mx-auto leading-relaxed">
            Join thousands of Pakistani students preparing smarter with personalized AI tutoring, adaptive MCQs, and authentic exam simulation.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/register">
              <Button size="lg" className="bg-white hover:bg-slate-100 text-brand-700 font-bold px-8 shadow-xl">
                Create Free Student Account
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10">
                Explore Demo Student Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-slate-400 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-400" />
            <span className="font-bold text-slate-200">PrepAI</span>
            <span className="text-slate-500">© 2026. Pakistan Entry Test Prep Platform.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/exams" className="hover:text-slate-200">Exams</Link>
            <Link href="/practice" className="hover:text-slate-200">Practice</Link>
            <Link href="/ai-tutor" className="hover:text-slate-200">AI Tutor</Link>
            <Link href="/admin" className="hover:text-slate-200">Admin Portal</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
