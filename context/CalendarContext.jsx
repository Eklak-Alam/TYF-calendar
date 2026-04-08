"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const CalendarContext = createContext();

export function CalendarProvider({ children }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [notes, setNotes] = useState([]);
  const [holidays, setHolidays] = useState({}); // Optional: populate with holiday APIs if needed
  
  // Track if the component has mounted on the client. 
  // This helps us trigger the skeleton loader and avoid hydration errors.
  const [isMounted, setIsMounted] = useState(false);

  // 1. LOAD FROM LOCAL STORAGE (Runs once on mount)
  useEffect(() => {
    const savedNotes = localStorage.getItem("calendarNotes");
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (error) {
        console.error("Failed to parse notes from local storage", error);
      }
    }
    // Tell the app we are ready to remove the skeleton loader
    setIsMounted(true);
  }, []);

  // 2. SAVE TO LOCAL STORAGE (Runs every time 'notes' array changes)
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("calendarNotes", JSON.stringify(notes));
    }
  }, [notes, isMounted]);

  // --- NOTE MANAGEMENT ACTIONS --- //

  // Add a new note
  const addNote = (dateString, text) => {
    const newNote = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(), // Generate unique ID
      dateString,
      text,
      createdAt: new Date().toISOString()
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  // Update an existing note
  const updateNote = (id, newText) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, text: newText } : note
      )
    );
  };

  // Delete a note
  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  return (
    <CalendarContext.Provider
      value={{
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        notes,
        holidays,
        addNote,
        updateNote,
        deleteNote,
        isMounted, // We export this to trigger the Skeleton
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

// Custom hook for easy consumption of context
export const useCalendarContext = () => useContext(CalendarContext);