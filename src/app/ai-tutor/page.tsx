'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  RotateCcw, 
  Copy, 
  Check, 
  User, 
  Lightbulb, 
  Zap, 
  BookOpen,
  HelpCircle,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { LatexRenderer } from '@/components/math/LatexRenderer';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export default function AITutorPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-welcome',
      sender: 'ai',
      text: `Hello Ali! 👋 I am your **PrepAI Academic Mentor**, calibrated specifically for **MDCAT / ECAT / NET**.\n\nI won't just dump answers on you. Instead, I'll guide you step-by-step through formulas, identify traps in past papers, and teach you calculation shortcuts to solve questions in under 45 seconds.\n\nWhat concept or entry test question are we tackling today?`,
      timestamp: 'Just now',
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const quickPrompts = [
    'Explain this simply',
    'Give me an example',
    'Quiz me on Organic Chemistry',
    'Give me 5 MCQs on Newton’s Laws',
    'Give me a calculation shortcut',
    'Create rapid revision notes',
  ];

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          messages: messages.concat(userMsg).map(m => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text,
          })),
          context: {
            studentName: 'Ali Khan',
            targetExam: 'MDCAT 2026',
            topic: 'Physics & Chemistry',
          }
        }),
      });

      const data = await res.json();
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.reply || 'Let us examine this step-by-step. What is the fundamental formula connecting your known variables?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch {
      const fallbackMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: `Let's break down this concept into two simple steps:\n\n1. **Identify the governing equation:** Look at the quantities given in the question.\n2. **Check boundary conditions:** In entry tests, notice if any variable remains constant (like temperature in isothermal processes or horizontal velocity in projectile motion).\n\nWhat formula do you think applies directly here?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-8rem)] animate-fade-in">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-purple-600 text-white flex items-center justify-center font-bold shadow-md shadow-brand-500/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>PrepAI Socratic Tutor</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-50 text-brand-600 font-semibold border border-brand-200/50">
                MDCAT Mode
              </span>
            </h1>
            <p className="text-xs text-slate-400">Step-by-step mentoring • Formula shortcuts • Socratic guidance</p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setMessages([messages[0]])}
          leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          className="text-xs text-slate-500"
        >
          Reset Chat
        </Button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
              msg.sender === 'user' 
                ? 'bg-brand-600 text-white shadow-sm' 
                : 'bg-gradient-to-tr from-brand-600 to-purple-600 text-white shadow-sm'
            }`}>
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className={`group relative max-w-[85%] rounded-3xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed shadow-xs ${
              msg.sender === 'user'
                ? 'bg-brand-600 text-white rounded-tr-none'
                : 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none'
            }`}>
              <div className="whitespace-pre-line">
                <LatexRenderer content={msg.text} />
              </div>

              {msg.sender === 'ai' && (
                <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                  <span>{msg.timestamp}</span>
                  <button
                    onClick={() => handleCopy(msg.id, msg.text)}
                    className="hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1 transition"
                  >
                    {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-purple-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-3xl rounded-tl-none bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-500 flex items-center gap-2">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-bounce [animation-delay:0.4s]" />
              </div>
              <span className="text-[11px] font-medium">Analyzing question & formulating Socratic hint...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Bar */}
      <div className="py-2 overflow-x-auto flex gap-2 no-scrollbar">
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => handleSend(prompt)}
            className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-medium text-slate-600 dark:text-slate-300 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-950/60 dark:hover:text-brand-300 whitespace-nowrap transition border border-transparent hover:border-brand-200 dark:hover:border-brand-800"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="pt-2 flex items-center gap-2"
      >
        <div className="relative flex-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question, paste an MCQ, or ask for an entry test shortcut..."
            className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-sm"
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={!input.trim() || isLoading}
          rightIcon={<Send className="w-4 h-4" />}
          className="rounded-2xl px-5 h-[46px]"
        >
          Send
        </Button>
      </form>

    </div>
  );
}
