"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { X, Plus, Calendar as CalendarIcon, StickyNote, Trash2, Edit2, Check } from "lucide-react";
import { useCalendarContext } from "../context/CalendarContext";
import { useToast } from "../context/ToastContext"; // <-- Import useToast

export default function NotesPanel() {
  const { notes, addNote, updateNote, deleteNote, startDate } = useCalendarContext();
  const { addToast } = useToast(); // <-- Initialize toaster
  
  const [noteText, setNoteText] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    const dateToSave = startDate || new Date();
    addNote(format(dateToSave, "yyyy-MM-dd"), noteText);
    setNoteText(""); 
    
    // FIRE ADD TOAST!
    addToast("Note added successfully!", "success");
  };

  const handleStartEdit = (e, note) => {
    e.stopPropagation(); 
    setEditingId(note.id);
    setEditText(note.text);
  };

  const handleSaveEdit = (e, id) => {
    e.stopPropagation();
    if (!editText.trim()) return;
    updateNote(id, editText);
    setEditingId(null);
    setEditText("");

    // FIRE EDIT TOAST!
    addToast("Note updated perfectly!", "edit");
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this note?")) {
      deleteNote(id);
      if (selectedNote?.id === id) setSelectedNote(null);
      
      // FIRE DELETE TOAST!
      addToast("Note moved to trash.", "delete");
    }
  };

  return (
    <>
      <div className="h-full flex flex-col p-5 md:p-6 relative bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl shrink-0 shadow-sm transition-colors duration-300">
        
        {/* CREATE NOTE SECTION */}
        <div className="shrink-0 mb-4 md:mb-6 border-b border-[var(--border-color)] pb-4">
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
              placeholder="What's on your mind?..."
              rows={2}
              className="w-full px-3 md:px-4 py-2 md:py-3 text-sm rounded-xl border border-[var(--border-color)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none transition-shadow"
            />
            <button 
              type="submit" 
              className="w-full py-2.5 bg-[var(--primary)] text-[var(--background)] rounded-xl hover:bg-[var(--primary-hover)] transition-colors flex justify-center items-center gap-2 font-bold text-sm shadow-sm"
            >
              <Plus size={16} /> Save Note
            </button>
          </form>
        </div>

        {/* LIST OF SAVED NOTES */}
        <div className="flex-1 min-h-0 overflow-y-auto space-y-3 md:space-y-4 no-scrollbar pb-2 pr-1">
          {notes.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full opacity-40">
              <StickyNote size={40} className="mb-3" />
              <p className="text-sm text-center font-medium">No notes recorded yet.</p>
            </div>
          ) : (
            notes.map((note) => (
              <div 
                key={note.id} 
                onClick={() => { if (editingId !== note.id) setSelectedNote(note) }}
                className="bg-[var(--background)] p-4 rounded-xl border border-[var(--border-color)] cursor-pointer hover:border-[var(--primary)] hover:shadow-md transition-all shrink-0"
              >
                
                {/* Editing Mode */}
                {editingId === note.id ? (
                  <div className="flex flex-col gap-3 animate-in fade-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
                    <span className="text-xs font-bold text-[var(--primary)]">
                      Editing note for {format(new Date(note.dateString), "MMM do, yyyy")}
                    </span>
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--primary)] bg-[var(--background)] text-[var(--foreground)] resize-none focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                      rows={3}
                      autoFocus
                    />
                    <div className="flex justify-end gap-2 mt-1">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setEditingId(null); }} 
                        className="text-xs px-3 py-1.5 bg-[var(--border-color)] text-[var(--foreground)] hover:opacity-80 rounded-lg font-bold transition-opacity"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={(e) => handleSaveEdit(e, note.id)} 
                        className="text-xs px-3 py-1.5 bg-[var(--primary)] text-[var(--background)] hover:bg-[var(--primary-hover)] rounded-lg font-bold flex items-center gap-1 transition-colors"
                      >
                        <Check size={14}/> Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  // Normal View Mode
                  <>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-1 rounded-md">
                        {format(new Date(note.dateString), "MMM do, yyyy")}
                      </span>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-1.5">
                        <button 
                          onClick={(e) => handleStartEdit(e, note)} 
                          className="p-1.5 rounded-md text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--background)] transition-colors"
                          title="Edit Note"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button 
                          onClick={(e) => handleDelete(e, note.id)} 
                          className="p-1.5 rounded-md text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                          title="Delete Note"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm font-medium line-clamp-3 text-[var(--foreground)] leading-relaxed">
                      {note.text}
                    </p>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* VIEW NOTE MODAL OVERLAY */}
      {selectedNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-[var(--background)] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col border border-[var(--border-color)]">
            <div className="bg-[var(--card-bg)] px-4 md:px-6 py-4 flex justify-between items-center border-b border-[var(--border-color)]">
              <div className="flex items-center gap-2 md:gap-3">
                <CalendarIcon size={18} className="text-[var(--primary)]" />
                <span className="font-bold text-base md:text-lg text-[var(--foreground)]">
                  {format(new Date(selectedNote.dateString), "MMMM do, yyyy")}
                </span>
              </div>
              <button 
                onClick={() => setSelectedNote(null)}
                className="p-2 rounded-full hover:bg-[var(--border-color)] transition-colors text-[var(--foreground)]"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-6 md:p-8 text-sm md:text-base font-medium leading-relaxed whitespace-pre-wrap text-[var(--foreground)] min-h-[150px]">
              {selectedNote.text}
            </div>
          </div>
        </div>
      )}
    </>
  );
}