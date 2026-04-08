"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, Trash2, Edit3, X } from "lucide-react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  // Function to trigger a new toast
  const addToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-remove the toast after 3.5 seconds
    setTimeout(() => removeToast(id), 3500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      
      {/* TOAST CONTAINER - Fixed to bottom right */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div 
            key={toast.id} 
            className="pointer-events-auto flex items-start gap-3 min-w-[280px] bg-[var(--card-bg)] border border-[var(--border-color)] p-4 rounded-xl shadow-lg shadow-black/5 animate-in slide-in-from-right-8 slide-in-from-bottom-2 fade-in duration-300 relative overflow-hidden group"
          >
            {/* Animated Progress Bar at the bottom */}
            <div className="absolute bottom-0 left-0 h-1 bg-[var(--primary)] animate-[shrink_3.5s_linear_forwards]" />

            {/* Dynamic Icon based on action */}
            <div className="shrink-0 mt-0.5">
              {toast.type === "success" && <CheckCircle2 size={20} className="text-[var(--primary)]" />}
              {toast.type === "edit" && <Edit3 size={20} className="text-[var(--primary)]" />}
              {toast.type === "delete" && <Trash2 size={20} className="text-red-500" />}
            </div>

            {/* Message */}
            <div className="flex-1 text-sm font-bold text-[var(--foreground)] mt-0.5">
              {toast.message}
            </div>

            {/* Close Button */}
            <button 
              onClick={() => removeToast(toast.id)}
              className="shrink-0 text-[var(--foreground)] opacity-50 hover:opacity-100 transition-opacity"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// Custom hook to use toasts anywhere
export const useToast = () => useContext(ToastContext);