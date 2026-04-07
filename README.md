# 🗓️ CalendarTYF — Premium Interactive Planner

![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

**CalendarTYF** is an ultra-refined, high-performance interactive planner built to bridge the gap between aesthetic design and functional complexity. Created with a **"Coffee & Cream"** design philosophy, it offers a distraction-free environment for range-based scheduling and contextual note-taking.

---

## 🌟 Why CalendarTYF? (Internship Showcase)

I built this project to demonstrate a mastery of **State Management**, **Component Architecture**, and **Responsive Design**. It isn't just a calendar; it’s a study on how users interact with dates and data transitions.

### 🚀 Key Features I Implemented:

* **⚡ Dual-State Selection Logic:** I engineered a custom range-selection algorithm that allows users to pick a start and end date seamlessly. The UI dynamically calculates and highlights the "In-Between" dates using CSS Variable-based color interpolation.
* **🎭 Stacked Hero Crossfades:** To solve the "flash-of-unstyled-image" problem, I implemented a stack-based image transition system. When a date is selected, the hero banner fades between 7 high-definition daily inspirations using a 1000ms GPU-accelerated transition.
* **🎨 Custom Theming Engine:** Beyond standard dark mode, I created a bespoke "Coffee & Cream" system. 
    * **Light:** Pure White + Espresso Brown UI elements.
    * **Dark:** Deep Roast Brown + Off-White Cream elements.
* **📓 Dynamic Contextual Memos:** Notes are tied to the `Context API` state. I built a scalable notes panel that handles internal scrolling while keeping the parent layout locked to the viewport (`h-screen`).
* **📑 Custom UI Selectors:** I replaced native browser dropdowns with custom-built Month/Year selectors to ensure a consistent, professional UI across all browsers (Chrome, Safari, Firefox).

---

## 🛠️ The Tech Stack

| Tool | Purpose |
| :--- | :--- |
| **Next.js 14** | Utilizing App Router for high-performance navigation and SEO optimization. |
| **Tailwind CSS** | Implementing a customized design system with responsive "Mobile-First" breakpoints. |
| **Date-fns** | Handling complex date arithmetic (Range checks, interval calculations). |
| **React Context API** | Managing global state for dates, notes, and theme transitions. |
| **Lucide React** | Using minimalist vector icons for a professional, clean aesthetic. |

---

## 📱 Full Responsiveness

I ensured that the application feels like a native app on every device:
- **Desktop (lg):** Side-by-side interactive panels with a fixed-height (`h-screen`) "locked" layout.
- **Tablet/Mobile:** A fluid, vertically-stacked architecture with kinetic internal scrolling for the notes section.

---

## 🏗️ How I Built It (My Process)

1.  **State Architecture:** I prioritized a single source of truth using `CalendarContext` to prevent "prop drilling" between the grid, hero, and notes panels.
2.  **UI/UX Polishing:** I added tactile feedback like `active:scale-95` on buttons and `backdrop-blur` on the hero banner to create a "Premium" feel.
3.  **Optimization:** Used `React.memo` and `useEffect` hooks to ensure that re-renders only occur when the date or theme actually changes, maintaining 60FPS performance.

---

## 🚀 Installation & Setup

1. **Clone & Enter:**
   ```bash
   git clone [https://github.com/yourusername/CalendarTYF.git](https://github.com/yourusername/CalendarTYF.git) && cd CalendarTYF