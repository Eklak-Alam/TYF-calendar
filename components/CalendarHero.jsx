// src/components/CalendarHero.jsx
"use client";

import React from "react";
import { getDay, format } from "date-fns";
import { useCalendarContext } from "../context/CalendarContext"; // Import context

const DAILY_IMAGES = [
  "https://images.pexels.com/photos/34173189/pexels-photo-34173189.jpeg", // Sunday
  "https://images.pexels.com/photos/34242167/pexels-photo-34242167.jpeg", // Monday
  "https://images.pexels.com/photos/31308858/pexels-photo-31308858.jpeg", // Tuesday
  "https://images.pexels.com/photos/35993172/pexels-photo-35993172.jpeg", // Wednesday
  "https://images.pexels.com/photos/36552772/pexels-photo-36552772.jpeg", // Thursday
  "https://images.pexels.com/photos/20726643/pexels-photo-20726643.jpeg", // Friday
  "https://images.pexels.com/photos/19856364/pexels-photo-19856364.jpeg", // Saturday
];

export default function CalendarHero() {
  // 1. Get the currently selected start date (fallback to today if nothing is selected)
  const { startDate } = useCalendarContext();
  const displayDate = startDate || new Date();

  // 2. Get the day of the week (0 for Sunday, 1 for Monday, etc.)
  const dayIndex = getDay(displayDate);

  return (
    <div className="relative w-full h-28 md:h-32 rounded-2xl overflow-hidden mb-4 md:mb-6 shadow-sm shrink-0 bg-black">
      
      {/* 3. The Crossfade Animation Trick 
          We render ALL images, but only make the active one visible (opacity-100).
          This creates a buttery-smooth fade transition when you click different dates.
      */}
      {DAILY_IMAGES.map((img, index) => (
        <img
          key={img}
          src={img}
          alt={`Day ${index} Inspiration`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === dayIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Dark Overlay for text readability */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      
      {/* Text overlays - Updates based on the selected date */}
      <div className="absolute bottom-3 md:bottom-4 left-4 md:left-6 z-20 text-white">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight drop-shadow-md transition-all duration-300">
          {format(displayDate, "EEEE")}
        </h2>
        <p className="text-[10px] md:text-xs font-medium opacity-90 mt-0.5 uppercase tracking-widest drop-shadow-md">
          {format(displayDate, "MMMM do, yyyy")}
        </p>
      </div>
    </div>
  );
}