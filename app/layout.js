// src/app/layout.jsx

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Import our custom Context Providers
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

// ==========================================
// 🚀 ULTIMATE SEO METADATA CONFIGURATION
// ==========================================
export const metadata = {
  metadataBase: new URL("https://your-domain-here.com"), // TODO: Replace with your actual deployed URL
  
  title: {
    default: "Calendar",
    template: "%s | Calendar", // Allows child pages to have titles like "Settings | Calendar"
  },
  
  description: "A highly polished, interactive calendar application featuring custom dark/light themes, seamless note-taking, and elegant UI/UX design.",
  
  // High-value search keywords
  keywords: [
    "Interactive Calendar",
    "React Calendar App",
    "Next.js Scheduling",
    "Productivity Tool",
    "Task Management",
    "Daily Notes",
    "Frontend Engineering Challenge",
    "UI/UX Calendar",
    "Tailwind CSS Calendar"
  ],
  
  // Establishes authorship and ownership for search engines
  authors: [{ name: "Eklak Alam" }],
  creator: "Eklak Alam",
  
  // Open Graph (Controls how the link looks when shared on WhatsApp, Facebook, LinkedIn)
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://your-domain-here.com",
    title: "Calendar | Premium Interactive Scheduling",
    description: "A highly polished, interactive calendar application featuring custom dark/light themes and seamless note-taking.",
    siteName: "Calendar",
    images: [
      {
        url: "/og-image.jpg", // TODO: Put a 1200x630 screenshot of your app in the /public folder
        width: 1200,
        height: 630,
        alt: "Calendar Dashboard Preview",
      },
    ],
  },
  
  // Twitter Cards (Controls how the link looks on X/Twitter)
  twitter: {
    card: "summary_large_image",
    title: "Calendar | Premium Interactive Scheduling",
    description: "Experience a beautifully crafted, highly interactive React calendar.",
    images: ["/og-image.jpg"],
    creator: "@your_twitter_handle", // TODO: Add your X handle if you have one
  },
  
  // Tells Google exactly how to index the site
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Favicon configurations
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning // Prevents Next.js warning caused by checking localStorage for dark mode
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* UPDATED: Removed bg-gray-50/900 and replaced with our custom CSS variables 
        so the beautiful Espresso & Vanilla Cream themes render perfectly!
      */}
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
        
        {/* Wrap the app with our global state providers */}
        <ThemeProvider>
          <CalendarProvider>
            
            {/* The rest of the application renders inside here */}
            {children}
            
          </CalendarProvider>
        </ThemeProvider>

      </body>
    </html>
  );
}