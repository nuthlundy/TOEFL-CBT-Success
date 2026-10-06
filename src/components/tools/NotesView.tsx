/**
 * My Notes Management View
 */

import React, { useState } from 'react';
import { FileText, Trash2, Edit3, Save, Plus } from 'lucide-react';
import { NoteItem } from '../../types/toefl';

interface NotesViewProps {
  notes: NoteItem[];
  onSaveNote: (note: NoteItem) => void;
  onDeleteNote: (id: string) => void;
}

export const NotesView: React.FC<NotesViewProps> = ({
  notes,
  onSaveNote,
  onDeleteNote,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

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
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>My Study Notes ({notes.length})</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Personal takeaways, grammar mnemonic rules, and vocabulary reminders.
          </p>
        </div>

        <button
          onClick={() => setIsAddingNew(!isAddingNew)}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Note</span>
        </button>
      </div>

      {/* Add New Note Box */}
      {isAddingNew && (
        <div className="bg-white border border-blue-200 rounded-2xl p-5 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-slate-900">Create Study Note</h3>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Note Title (e.g. Inverted Word Order Rules)"
            className="w-full text-xs p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
          />
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Write your note contents..."
            rows={4}
            className="w-full text-xs p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsAddingNew(false)}
              className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateNote}
              disabled={!newTitle.trim()}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg"
            >
              Save Note
            </button>
          </div>
        </div>
      )}

      {/* Existing Notes */}
      {notes.length > 0 ? (
        <div className="space-y-4">
          {notes.map((n) => (
            <div
              key={n.id}
              className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{n.title}</h3>
                  <span className="text-[10px] text-slate-400">
                    Last updated {new Date(n.updatedAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  {editingId === n.id ? (
                    <button
                      onClick={() => handleSaveEdit(n)}
                      className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg"
                      title="Save"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStartEdit(n)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
                      title="Edit"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => onDeleteNote(n.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {editingId === n.id ? (
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  rows={4}
                  className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:ring-1 focus:ring-blue-500"
                />
              ) : (
                <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap font-serif">
                  {n.content || '(Empty note)'}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        !isAddingNew && (
          <div className="bg-white border border-slate-200/90 rounded-2xl p-12 text-center space-y-3 shadow-xs">
            <FileText className="w-12 h-12 text-slate-300 mx-auto" />
            <h2 className="text-base font-bold text-slate-900">No Notes Saved Yet</h2>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You can write notes directly within lessons or create standalone study summaries here.
            </p>
          </div>
        )
      )}
    </div>
  );
};
