# 🗓️ Calendar — Interactive Calendar Planner

![Next.js](https://img.shields.io/badge/Next.js-16.2-000000?style=flat-square&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC?style=flat-square&logo=tailwind-css)

A modern, responsive calendar application with intuitive date selection, notes management, and dark/light theme support. Built with Next.js and Tailwind CSS for optimal performance.

---

## ✨ Features

- 📅 **Interactive Calendar** - Navigate months with smooth, intuitive controls
- 📝 **Notes Management** - Create and organize notes for specific dates
- 🌓 **Theme Toggle** - Light/Dark mode with localStorage persistence
- ⏳ **Loading Skeletons** - Elegant skeleton loaders for better UX during data fetching
- 🔔 **Toast Notifications** - Real-time feedback with toast alerts for user actions
- 📱 **Responsive Design** - Mobile, tablet, and desktop optimized
- ✨ **Smooth Animations** - Framer Motion for polished transitions
- 🎨 **Modern UI** - Clean, minimalist design with custom styling

---

## 🛠️ Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Next.js | 16.2.2 | Server-side rendering & App Router |
| React | 19.2.4 | Component-based UI |
| Tailwind CSS | 4 | Responsive utility-first styling |
| Framer Motion | 12.38.0 | Animations & transitions |
| date-fns | 4.1.0 | Date utilities & calculations |
| Zustand | 5.0.12 | State management |
| Lucide React | 1.7.0 | Icon library |
| React Context API | Built-in | Global state for calendar, theme & notifications |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/calendar.git
   cd calendar
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   - Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📖 Available Scripts

```bash
npm run dev      # Start dev server with hot reload
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

---

## 📂 Project Structure

```
calendar/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.js          # Root layout component
│   └── page.js            # Home page
├── components/            # React components
│   ├── Calendar.jsx       # Main calendar wrapper
│   ├── CalendarGrid.jsx   # Calendar month grid
│   ├── CalendarHero.jsx   # Hero section
│   ├── CalendarSkeleton.jsx # Loading skeleton component
│   ├── NotesPanel.jsx     # Notes management
│   └── ThemeToggle.jsx    # Theme switcher
├── context/               # React Context
│   ├── CalendarContext.jsx # Date & calendar state
│   ├── ThemeContext.jsx    # Theme state
│   └── ToastContext.jsx    # Toast notifications state
├── lib/
│   └── utils.js           # Utility functions
└── public/                # Static assets
```

---

## 🎯 Key Implementation Details

### State Management
- **Calendar Context** - Manages date selection and month navigation
- **Theme Context** - Handles dark/light mode with localStorage persistence
- **Toast Context** - Manages notification system for user feedback
- **Zustand** - Additional state management for complex operations

### Responsive Architecture
- **Mobile** - Vertical stack layout with scrollable notes panel
- **Desktop** - Side-by-side layout with fixed viewport height
- **Animations** - GPU-accelerated transitions using Framer Motion

### Performance Optimizations
- React.memo for component memoization
- Efficient re-render patterns with useEffect hooks
- Skeleton loaders for perceived performance
- CSS variables for dynamic theming
- Responsive image handling
- Optimized context subscriptions

### User Experience
- Toast notifications provide instant feedback on actions
- Skeleton screens minimize perceived load time
- Smooth transitions and animations enhance navigation
- Persistent theme preferences across sessions

---

## 🌐 Browser Support

Works on all modern browsers:
- Chrome/Edge (v90+)
- Firefox (v88+)
- Safari (v14+)

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Built with ❤️ by Calendar Team**
