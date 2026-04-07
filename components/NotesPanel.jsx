// src/components/NotesPanel.jsx
"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { X, Plus, Calendar as CalendarIcon, StickyNote } from "lucide-react";
import { useCalendarContext } from "../context/CalendarContext";

export default function NotesPanel() {
  const { notes, addNote, startDate } = useCalendarContext();
  const [noteText, setNoteText] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    const dateToSave = startDate || new Date();
    addNote(format(dateToSave, "yyyy-MM-dd"), noteText);
    setNoteText(""); 
  };

  return (
    <>
      <div className="h-full flex flex-col p-5 md:p-6 relative bg-[var(--card)] border border-[var(--border)] rounded-2xl shrink-0 shadow-sm">
        
        <div className="shrink-0 mb-4 md:mb-6 border-b border-[var(--border)] pb-4">
          <h3 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2">
            <StickyNote size={18} className="text-[var(--primary)]" /> Add Note
          </h3>
          
          <form onSubmit={handleAddNote} className="flex flex-col gap-3">
            <div className="text-xs md:text-sm font-semibold opacity-70">
              For: {startDate ? format(startDate, "MMMM do, yyyy") : format(new Date(), "MMMM do, yyyy")}
            </div>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Type your note here..."
              rows={2}
              className="w-full px-3 md:px-4 py-2 md:py-3 text-sm rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] resize-none"
            />
            <button 
              type="submit" 
              className="w-full py-2.5 bg-[var(--primary)] text-[var(--background)] rounded-xl hover:opacity-90 transition-opacity flex justify-center items-center gap-2 font-bold text-sm"
            >
              <Plus size={16} /> Save Note
            </button>
          </form>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto space-y-2 md:space-y-3 no-scrollbar pb-2">
          {notes.length === 0 ? (
            <p className="text-sm text-center opacity-50 mt-8">No notes recorded yet.</p>
          ) : (
            notes.map((note) => (
              <div 
                key={note.id} 
                onClick={() => setSelectedNote(note)}
                className="bg-[var(--primary)]/10 p-3 md:p-4 rounded-xl border border-[var(--primary)]/30 cursor-pointer hover:border-[var(--primary)] hover:shadow-sm transition-all shrink-0"
              >
                <span className="text-[10px] md:text-xs font-bold text-[var(--primary)] block mb-1">
                  {format(new Date(note.dateString), "MMM do, yyyy")}
                </span>
                <p className="text-xs md:text-sm truncate font-medium">{note.text}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 animate-in fade-in duration-200">
          <div className="bg-[var(--background)] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col">
            <div className="bg-[var(--card)] px-4 md:px-6 py-4 flex justify-between items-center border-b border-[var(--border)]">
              <div className="flex items-center gap-2 md:gap-3">
                <CalendarIcon size={18} className="text-[var(--primary)]" />
                <span className="font-bold text-base md:text-lg text-[var(--foreground)]">
                  {format(new Date(selectedNote.dateString), "MMMM do, yyyy")}
                </span>
              </div>
              <button 
                onClick={() => setSelectedNote(null)}
                className="p-2 rounded-full hover:bg-[var(--border)] transition-colors text-[var(--foreground)]"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-6 md:p-8 text-sm md:text-base font-medium leading-relaxed whitespace-pre-wrap text-[var(--foreground)] min-h-[120px] md:min-h-[150px]">
              {selectedNote.text}
            </div>
          </div>
        </div>
      )}
    </>
  );
}