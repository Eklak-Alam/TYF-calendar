"use client";

import React from "react";

export default function CalendarSkeleton() {
  return (
    <div className="min-h-[100dvh] lg:h-[100dvh] w-full flex flex-col bg-[var(--background)] transition-colors duration-300 overflow-hidden">
      
      {/* Header Skeleton */}
      <header className="shrink-0 max-w-6xl mx-auto w-full px-4 md:px-8 py-5 md:py-6 flex justify-between items-center relative z-20">
        <div className="h-8 w-48 bg-[var(--foreground)]/10 rounded-lg animate-pulse" />
        <div className="h-10 w-10 md:h-11 md:w-11 bg-[var(--foreground)]/10 rounded-full animate-pulse" />
      </header>

      {/* Main Container Skeleton */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 md:px-8 pb-8 flex flex-col lg:flex-row gap-8 lg:gap-12 lg:overflow-hidden">
        
        {/* Left Panel Skeleton (Hero + Grid) */}
        <div className="w-full lg:flex-1 flex flex-col gap-4 md:gap-6 lg:min-h-0">
          {/* Hero Image Skeleton */}
          <div className="w-full h-28 md:h-32 bg-[var(--foreground)]/5 rounded-2xl animate-pulse shadow-sm" />
          
          {/* Grid Skeleton Area */}
          <div className="flex flex-col flex-1">
            {/* Nav Skeleton */}
            <div className="flex justify-between items-center mb-4 md:mb-6 px-2">
              <div className="flex gap-4">
                <div className="h-8 w-24 md:w-32 bg-[var(--foreground)]/10 rounded-md animate-pulse" />
                <div className="h-8 w-16 md:w-20 bg-[var(--foreground)]/10 rounded-md animate-pulse" />
              </div>
              <div className="flex gap-2">
                <div className="h-8 w-8 bg-[var(--foreground)]/10 rounded-full animate-pulse" />
                <div className="h-8 w-8 bg-[var(--foreground)]/10 rounded-full animate-pulse" />
              </div>
            </div>

            {/* Days Header Skeleton */}
            <div className="grid grid-cols-7 mb-2">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="h-4 w-6 mx-auto bg-[var(--foreground)]/10 rounded animate-pulse mb-2" />
              ))}
            </div>

            {/* Grid Cells Skeleton - Beautiful Staggered Pulse */}
            <div className="grid grid-cols-7 gap-y-1 md:gap-y-2 flex-1 content-start">
              {Array.from({ length: 35 }).map((_, i) => (
                <div key={i} className="flex justify-center items-center h-10 md:h-12 w-full mt-1">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[var(--foreground)]/5 rounded-lg animate-pulse" 
                       style={{ animationDelay: `${i * 0.02}s` }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel Skeleton (Notes Panel) */}
        <div className="w-full h-[500px] lg:w-[380px] shrink-0 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl animate-pulse shadow-sm flex flex-col p-5 md:p-6 lg:min-h-0 lg:h-full">
          <div className="h-6 w-32 bg-[var(--foreground)]/10 rounded-md mb-6" />
          <div className="h-20 w-full bg-[var(--foreground)]/5 rounded-xl mb-4" />
          <div className="h-10 w-full bg-[var(--foreground)]/10 rounded-xl mb-8" />
          
          <div className="flex-1 flex flex-col gap-3">
            <div className="h-24 w-full bg-[var(--foreground)]/5 rounded-xl" />
            <div className="h-24 w-full bg-[var(--foreground)]/5 rounded-xl" />
            <div className="h-24 w-full bg-[var(--foreground)]/5 rounded-xl opacity-50" />
          </div>
        </div>
        
      </main>
    </div>
  );
}