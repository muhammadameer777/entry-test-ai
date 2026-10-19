'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Sparkles, 
  Bot, 
  Search, 
  Tag, 
  Edit3, 
  Check, 
  Save,
  ArrowRight
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { dataStore } from '@/lib/storage';
import { NoteItem } from '@/types';

export default function NotesPage() {
  const [notes, setNotes] = useState<NoteItem[]>(dataStore.notes);
  const [search, setSearch] = useState('');
  
  // Create / Edit modal
  const [isEditing, setIsEditing] = useState(false);
  const [activeNote, setActiveNote] = useState<Partial<NoteItem>>({ title: '', content: '', tags: '' });
  const [isAiLoading, setIsAiLoading] = useState(false);

  const filtered = notes.filter(n => 
    n.title.toLowerCase().includes(search.toLowerCase()) || 
    n.content.toLowerCase().includes(search.toLowerCase()) ||
    (n.tags && n.tags.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSaveNote = () => {
    if (!activeNote.title || !activeNote.content) return;

    if (activeNote.id) {
      const updated = notes.map(n => n.id === activeNote.id ? { ...n, ...activeNote, updatedAt: new Date().toISOString() } as NoteItem : n);
      setNotes(updated);
      dataStore.notes = updated;
    } else {
      const newNote: NoteItem = {
        id: `note-${Date.now()}`,
        title: activeNote.title,
        content: activeNote.content,
        tags: activeNote.tags || 'General Study',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setNotes([newNote, ...notes]);
      dataStore.notes = [newNote, ...dataStore.notes];
    }

    setIsEditing(false);
    setActiveNote({ title: '', content: '', tags: '' });
  };

  const handleDelete = (id: string) => {
    const updated = notes.filter(n => n.id !== id);
    setNotes(updated);
    dataStore.notes = updated;
  };

  const handleAiImprove = async () => {
    if (!activeNote.content) return;
    setIsAiLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Improve, format, and add Pakistani entry test shortcuts/exam traps to these study notes:\n\n${activeNote.content}`,
        }),
      });
      const data = await res.json();
      setActiveNote(prev => ({
        ...prev,
        content: data.reply || prev.content,
      }));
    } catch {
      // Fallback
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in pb-12">
      
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            High-Yield Student Notes
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Capture formulas, mnemonic tricks, and common past paper traps with AI enhancements.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            setActiveNote({ title: '', content: '', tags: 'Physics, High Yield' });
            setIsEditing(true);
          }}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Create New Study Note
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by topic, formula, or tag..."
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-xs"
        />
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((note) => (
          <Card key={note.id} hover className="flex flex-col justify-between">
            <div>
              <CardHeader className="pb-3 flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="text-base font-bold text-slate-900 dark:text-white">
                    {note.title}
                  </CardTitle>
                  <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                    {note.tags?.split(',').map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-300">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      setActiveNote(note);
                      setIsEditing(true);
                    }}
                    className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </CardHeader>

              <CardContent className="pt-2 text-xs text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                {note.content}
              </CardContent>
            </div>

            <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800/60 mt-4 flex items-center justify-between text-[10px] text-slate-400">
              <span>Updated: {new Date(note.updatedAt).toLocaleDateString()}</span>
              <span className="text-brand-600 font-semibold">PrepAI Synced</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Create / Edit Note Modal */}
      <Modal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        title={activeNote.id ? 'Edit Study Note' : 'Create High-Yield Study Note'}
        maxWidth="lg"
      >
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Note Title
            </label>
            <input
              type="text"
              value={activeNote.title || ''}
              onChange={(e) => setActiveNote({ ...activeNote, title: e.target.value })}
              placeholder="e.g. Benzene Nitration Reaction Mechanisms"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block font-semibold text-slate-700 dark:text-slate-300">
                Note Content
              </label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                isLoading={isAiLoading}
                onClick={handleAiImprove}
                leftIcon={<Sparkles className="w-3.5 h-3.5 text-brand-600" />}
                className="text-[11px] text-brand-600"
              >
                AI Enhance & Add Exam Traps
              </Button>
            </div>
            <textarea
              rows={6}
              value={activeNote.content || ''}
              onChange={(e) => setActiveNote({ ...activeNote, content: e.target.value })}
              placeholder="Write formulas, rules, and notes..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm font-mono leading-relaxed"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={activeNote.tags || ''}
              onChange={(e) => setActiveNote({ ...activeNote, tags: e.target.value })}
              placeholder="e.g. Physics, Kinematics, UHS Past Papers"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSaveNote} leftIcon={<Save className="w-4 h-4" />}>
              Save Study Note
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
