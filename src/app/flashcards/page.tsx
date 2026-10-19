'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Layers, 
  RotateCw, 
  Check, 
  X, 
  Sparkles, 
  Bot, 
  ArrowLeft, 
  ArrowRight,
  HelpCircle,
  Clock
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { LatexRenderer } from '@/components/math/LatexRenderer';
import { dataStore } from '@/lib/storage';

export default function FlashcardsPage() {
  const [cards, setCards] = useState(dataStore.flashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);

  const currentCard = cards[currentIndex] || cards[0];

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleRate = (rating: 'EASY' | 'HARD' | 'FORGOTTEN') => {
    setReviewedCount(prev => prev + 1);
    handleNext();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in pb-12">
      
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Spaced Repetition Flashcards
            </h1>
            <Badge variant="brand">{cards.length} Cards</Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Master high-yield formulas, reaction mechanisms, and cell biology structures through active recall.
          </p>
        </div>

        <span className="text-xs font-bold text-slate-500">
          Card {currentIndex + 1} of {cards.length}
        </span>
      </div>

      {/* Interactive 3D Flip Card */}
      <div className="perspective-1000">
        <div 
          onClick={() => setIsFlipped(!isFlipped)}
          className={`relative min-h-[300px] w-full rounded-3xl p-8 sm:p-12 cursor-pointer shadow-lg border border-slate-200/80 dark:border-slate-800 transition-all duration-300 flex flex-col justify-between ${
            isFlipped
              ? 'bg-gradient-to-br from-indigo-50/50 via-white to-brand-50/50 dark:from-slate-900 dark:via-indigo-950/20 dark:to-slate-900 ring-2 ring-brand-500/40'
              : 'bg-white dark:bg-slate-900 hover:border-brand-500/50'
          }`}
        >
          {/* Card Top Pill */}
          <div className="flex items-center justify-between">
            <Badge variant={isFlipped ? 'ai' : 'outline'} size="sm">
              {isFlipped ? 'Back (Answer & Law)' : 'Front (Question & Prompt)'}
            </Badge>
            <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
              <RotateCw className="w-3.5 h-3.5" /> Tap card to flip
            </span>
          </div>

          {/* Card Content (Front or Back) */}
          <div className="my-auto py-6 text-center text-base sm:text-xl font-semibold text-slate-900 dark:text-white leading-relaxed">
            <LatexRenderer content={isFlipped ? currentCard.back : currentCard.front} />
          </div>

          {/* Card Bottom Prompt */}
          <div className="text-center text-xs text-slate-400">
            {isFlipped ? 'How easily did you remember this?' : 'Think of the formula or answer, then tap to reveal.'}
          </div>
        </div>
      </div>

      {/* Spaced Repetition Grading Controls */}
      {isFlipped ? (
        <div className="grid grid-cols-3 gap-3 animate-fade-in">
          <Button
            variant="danger"
            size="lg"
            onClick={() => handleRate('FORGOTTEN')}
            leftIcon={<X className="w-4 h-4" />}
          >
            Forgotten (1d)
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={() => handleRate('HARD')}
            className="border border-amber-300 text-amber-700 dark:text-amber-400"
          >
            Hard (3d)
          </Button>

          <Button
            variant="success"
            size="lg"
            onClick={() => handleRate('EASY')}
            leftIcon={<Check className="w-4 h-4" />}
          >
            Easy (7d)
          </Button>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            size="sm"
            disabled={currentIndex === 0}
            onClick={() => { setIsFlipped(false); setCurrentIndex(currentIndex - 1); }}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Previous
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={() => setIsFlipped(true)}
            rightIcon={<RotateCw className="w-4 h-4" />}
          >
            Flip to Reveal Answer
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Next Card
          </Button>
        </div>
      )}

      {/* Quick Add / Topic Link */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
          <Sparkles className="w-4 h-4 text-brand-600" />
          <span>Need more flashcards on Organic Mechanisms or Derivatives?</span>
        </div>
        <Link href="/ai-tutor">
          <Button variant="ghost" size="sm" className="text-brand-600">
            Generate with AI Tutor
          </Button>
        </Link>
      </div>

    </div>
  );
}
