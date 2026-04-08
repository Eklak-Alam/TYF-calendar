"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");
  
  // To avoid hydration mismatch errors, we ensure the UI matches the 
  // server render initially by tracking `isMounted`
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check localStorage on load
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // The placeholder must match the button's dimensions exactly to prevent layout shift
  if (!isMounted) return <div className="w-10 h-10 md:w-11 md:h-11" />;

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full bg-[var(--primary)] text-[var(--background)] shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--background)] overflow-hidden"
      aria-label="Toggle Theme"
    >
      {/* Sun Icon: Visible in light mode. */}
      <Sun 
        size={20} 
        strokeWidth={2.5} 
        className={`absolute transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          theme === "light" 
            ? "rotate-0  opacity-100" 
            : "-rotate-90 opacity-0"
        }`} 
      />
      
      {/* Moon Icon: Visible in dark mode. */}
      <Moon 
        size={20} 
        strokeWidth={2.5} 
        className={`absolute transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          theme === "dark" 
            ? "rotate-0 opacity-100" 
            : "rotate-90 opacity-0"
        }`} 
      />
    </button>
  );
}