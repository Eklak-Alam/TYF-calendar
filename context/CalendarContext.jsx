// src/context/CalendarContext.jsx
"use client";

import React, { createContext, useContext, useState } from "react";
import { format } from "date-fns";

const CalendarContext = createContext();

export function CalendarProvider({ children }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null); // Added for range selection
  const [notes, setNotes] = useState([]);

  // Mock Holiday Data
  const holidays = {
    "2024-04-01": ["April Fools' Day"],
    "2024-12-25": ["Christmas Day"],
  };

  const addNote = (dateString, text) => {
    setNotes((prev) => [{ id: Date.now().toString(), dateString, text }, ...prev]);
  };

  const removeNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <CalendarContext.Provider value={{ 
      startDate, setStartDate, 
      endDate, setEndDate,
      notes, addNote, removeNote,
      holidays
    }}>
      {children}
    </CalendarContext.Provider>
  );
}

export const useCalendarContext = () => useContext(CalendarContext);