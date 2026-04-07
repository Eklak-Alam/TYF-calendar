// src/context/ThemeContext.jsx

"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

// 1. Create the Context
const ThemeContext = createContext();

// 2. Create the Provider
export function ThemeProvider({ children }) {
  // Set default theme to light
  const [theme, setTheme] = useState("light");
  
  // NEW: Track if the component has successfully mounted in the browser
  const [isMounted, setIsMounted] = useState(false);

  // This effect runs ONCE when the website loads in the user's browser
  useEffect(() => {
    // Tell the app "Okay, we are in the browser now!"
    setIsMounted(true);
    
    // Check local storage or system preferences
    const savedTheme = localStorage.getItem("calendar-theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  // This effect runs EVERY TIME the theme changes
  useEffect(() => {
    // Do not try to change HTML classes if we are still on the server
    if (!isMounted) return;

    const root = document.documentElement; // Grabs the <html> tag
    
    // Clean up old classes
    root.classList.remove("light", "dark");
    
    // Add the active theme class
    root.classList.add(theme);
    
    // Save to browser memory
    localStorage.setItem("calendar-theme", theme);
  }, [theme, isMounted]); // Notice we added isMounted to the dependency array

  // The toggle function
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    // We now share 'isMounted' alongside theme and toggleTheme
    <ThemeContext.Provider value={{ theme, toggleTheme, isMounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Custom Hook
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    console.error("useTheme must be used within a ThemeProvider");
  }
  return context;
}