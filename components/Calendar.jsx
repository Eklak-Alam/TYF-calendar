// src/components/Calendar.jsx
"use client";

import React from "react";
import CalendarGrid from "./CalendarGrid";
import NotesPanel from "./NotesPanel";
import ThemeToggle from "./ThemeToggle";
import CalendarHero from "./CalendarHero";

export default function Calendar() {
  return (
    // MOBILE/TABLET: min-h-screen allows scrolling. 
    // DESKTOP (lg): h-[100dvh] locks it and overflow-hidden prevents page scroll.
    <div className="min-h-[100dvh] lg:h-[100dvh] w-full flex flex-col bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300 font-sans overflow-y-auto lg:overflow-hidden no-scrollbar">
      
      <header className="shrink-0 max-w-6xl mx-auto w-full px-4 md:px-8 py-5 md:py-6 flex justify-between items-center z-20 relative">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight">
          CalendarTYF
        </h1>
        <ThemeToggle />
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 md:px-8 pb-8 flex flex-col lg:flex-row gap-8 lg:gap-12 lg:overflow-hidden">
        
        {/* LEFT PANEL (Hero + Grid) 
            Takes natural height on mobile, fills space on desktop.
        */}
        <div className="w-full lg:flex-1 flex flex-col lg:min-h-0">
          <CalendarHero />
          <CalendarGrid />
        </div>

        {/* RIGHT PANEL (Notes) 
            Mobile: Sets a fixed height so it doesn't stretch forever.
            Desktop: h-full fits exactly to the screen.
        */}
        <div className="w-full h-[500px] lg:w-[380px] shrink-0 flex flex-col lg:min-h-0 lg:h-full">
          <NotesPanel />
        </div>
        
      </main>
    </div>
  );
}