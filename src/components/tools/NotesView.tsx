/**
 * My Notes Management View
 * Multi-Book aware with source book filtering
 */

import React, { useState } from 'react';
import { FileText, Trash2, Edit3, Save, Plus } from 'lucide-react';
import { NoteItem, BookId } from '../../types/toefl';

interface NotesViewProps {
  notes: NoteItem[];
  onSaveNote: (note: NoteItem) => void;
  onDeleteNote: (id: string) => void;
  activeBookId?: BookId;
}

export const NotesView: React.FC<NotesViewProps> = ({
  notes,
  onSaveNote,
  onDeleteNote,
  activeBookId = 'PETERSONS-CBT-SUCCESS',
}) => {
  const [filterMode, setFilterMode] = useState<'CURRENT' | 'ALL'>('CURRENT');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const filteredNotes = notes.filter((n) => {
    if (filterMode === 'CURRENT') {
      return (n.sourceBookId || 'PETERSONS-CBT-SUCCESS') === activeBookId;
    }
    return true;
  });

  const handleStartEdit = (note: NoteItem) => {
    setEditingId(note.id);
    setEditText(note.content);
  };

  const handleSaveEdit = (note: NoteItem) => {
    onSaveNote({
      ...note,
      content: editText,
      updatedAt: Date.now(),
    });
    setEditingId(null);
  };

  const handleCreateNote = () => {
    if (!newTitle.trim()) return;
    const note: NoteItem = {
      id: `note_${Date.now()}`,
      sourceBookId: activeBookId,
      targetId: `custom_${Date.now()}`,
      title: newTitle.trim(),
      content: newContent.trim(),
      section: 'structure',
      updatedAt: Date.now(),
    };
    onSaveNote(note);
    setNewTitle('');
    setNewContent('');
    setIsAddingNew(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>Personal Study Notes ({filteredNotes.length})</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Capture grammar formulas, vocabulary nuances, and test-taking mnemonics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Book Filter Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setFilterMode('CURRENT')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                filterMode === 'CURRENT'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Current Book
            </button>
            <button
              onClick={() => setFilterMode('ALL')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                filterMode === 'ALL'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Notes ({notes.length})
            </button>
          </div>

          <button
            onClick={() => setIsAddingNew(!isAddingNew)}
            className="flex items-center gap-1 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Note</span>
          </button>
        </div>
      </div>

      {isAddingNew && (
        <div className="bg-white border border-blue-200 rounded-2xl p-5 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Create Custom Note ({activeBookId === 'PETERSONS-CBT-SUCCESS' ? "Peterson's CBT" : activeBookId === 'CLIFFS-TOEFL-PREPARATION-GUIDE' ? 'Cliffs Prep' : 'Cliffs CBT'})
          </h3>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Note Title (e.g., Inversion with Negative Adverbs)"
            className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Write your study notes, examples, or grammar rules here..."
            rows={4}
            className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsAddingNew(false)}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateNote}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-xs"
            >
              Save Note
            </button>
          </div>
        </div>
      )}

      {filteredNotes.length > 0 ? (
        <div className="space-y-4">
          {filteredNotes.map((note) => {
            const isEditing = editingId === note.id;
            return (
              <div
                key={note.id}
                className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">{note.title}</h3>
                      {note.sourceBookId && (
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-mono">
                          {note.sourceBookId === 'PETERSONS-CBT-SUCCESS'
                            ? "Peterson's CBT"
                            : note.sourceBookId === 'CLIFFS-TOEFL-PREPARATION-GUIDE'
                            ? 'Cliffs Prep'
                            : 'Cliffs CBT'}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Last edited {new Date(note.updatedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    {!isEditing ? (
                      <button
                        onClick={() => handleStartEdit(note)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg transition-colors"
                        title="Edit Note"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleSaveEdit(note)}
                        className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        title="Save Changes"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => onDeleteNote(note.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                      title="Delete Note"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {isEditing ? (
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    rows={4}
                    className="w-full text-xs p-3 border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                ) : (
                  <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">
                    {note.content}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-12 text-center space-y-3 shadow-xs">
          <FileText className="w-12 h-12 text-slate-300 mx-auto" />
          <h2 className="text-base font-bold text-slate-900">No Notes Recorded</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {filterMode === 'CURRENT'
              ? 'No notes found for this active book. Write notes on any lesson page or click "New Note" above.'
              : 'Write your own rules, memory aids, and error corrections to build a personal study notebook.'}
          </p>
        </div>
      )}
    </div>
  );
};
