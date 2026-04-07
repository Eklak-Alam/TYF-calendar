// src/app/layout.jsx

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 1. Import our custom Context Providers
import { ThemeProvider } from "../context/ThemeContext";
import { CalendarProvider } from "../context/CalendarContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Interactive Calendar App",
  description: "A polished frontend engineering challenge",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      // This prevents a Next.js warning caused by checking localStorage for dark mode
      suppressHydrationWarning 
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* 2. We apply the base Tailwind background and text colors here.
        Because we added 'transition-colors duration-300', switching to dark mode
        will have a buttery smooth fade effect across the whole page!
      */}
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900 transition-colors duration-300 dark:bg-gray-950 dark:text-gray-100">
        
        {/* 3. Wrap the app with our global state providers */}
        <ThemeProvider>
          <CalendarProvider>
            
            {/* The rest of the application (your Calendar components) renders inside here */}
            {children}
            
          </CalendarProvider>
        </ThemeProvider>

      </body>
    </html>
  );
}