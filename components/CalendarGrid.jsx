"use client";

import React, { useState, useEffect } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, eachDayOfInterval, isAfter, isWithinInterval, setMonth, setYear, isToday } from "date-fns";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { useCalendarContext } from "../context/CalendarContext";

export default function CalendarGrid() {
  const { startDate, setStartDate, endDate, setEndDate, holidays } = useCalendarContext();
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);

  useEffect(() => {
    if (!startDate && !endDate) {
      setStartDate(new Date());
    }
  }, [startDate, endDate, setStartDate]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarDays = eachDayOfInterval({ start: startOfWeek(monthStart), end: endOfWeek(monthEnd) });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const handleDayClick = (day) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (isAfter(startDate, day)) {
        setStartDate(day);
      } else {
        setEndDate(day);
      }
    }
  };

  const selectMonth = (monthIndex) => {
    setCurrentDate(setMonth(currentDate, monthIndex));
    setIsMonthOpen(false);
  };
  const selectYear = (year) => {
    setCurrentDate(setYear(currentDate, year));
    setIsYearOpen(false);
  };

  const years = Array.from({ length: 11 }, (_, i) => new Date().getFullYear() - 5 + i);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="w-full flex flex-col flex-1 lg:min-h-0">       
      {/* --- TOP NAVIGATION BARS --- */}
      <div className="flex justify-between items-center mb-4 md:mb-6 pl-2 relative z-30 shrink-0">
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* CUSTOM MONTH DROPDOWN */}
          <div className="relative">
            <button 
              onClick={() => { setIsMonthOpen(!isMonthOpen); setIsYearOpen(false); }}
              className="flex items-center gap-1 text-xl md:text-2xl font-bold text-[var(--foreground)] hover:text-[var(--primary)] transition-colors focus:outline-none"
            >
              {months[currentDate.getMonth()]} <ChevronDown size={18} className={`transition-transform ${isMonthOpen ? "rotate-180" : ""}`} />
            </button>
            
            {isMonthOpen && (
              <div className="absolute top-full left-0 mt-2 w-40 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl shadow-xl py-2 max-h-48 overflow-y-auto no-scrollbar z-50">
                {months.map((m, i) => (
                  <button 
                    key={m} onClick={() => selectMonth(i)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-[var(--primary)] hover:text-[var(--background)] transition-colors ${currentDate.getMonth() === i ? "bg-[var(--primary)]/10 font-bold" : ""}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CUSTOM YEAR DROPDOWN */}
          <div className="relative">
            <button 
              onClick={() => { setIsYearOpen(!isYearOpen); setIsMonthOpen(false); }}
              className="flex items-center gap-1 text-xl md:text-2xl font-bold text-[var(--foreground)] hover:text-[var(--primary)] transition-colors focus:outline-none"
            >
              {currentDate.getFullYear()} <ChevronDown size={18} className={`transition-transform ${isYearOpen ? "rotate-180" : ""}`} />
            </button>
            
            {isYearOpen && (
              <div className="absolute top-full left-0 mt-2 w-32 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl shadow-xl py-2 max-h-48 overflow-y-auto no-scrollbar z-50">
                {years.map(y => (
                  <button 
                    key={y} onClick={() => selectYear(y)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-[var(--primary)] hover:text-[var(--background)] transition-colors ${currentDate.getFullYear() === y ? "bg-[var(--primary)]/10 font-bold" : ""}`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Previous / Next Month Arrows */}
        <div className="flex gap-1 md:gap-2">
          <button onClick={prevMonth} className="p-1.5 md:p-2 rounded-full border border-transparent hover:border-[var(--border-color)] hover:bg-[var(--card-bg)] transition-all">
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>
          <button onClick={nextMonth} className="p-1.5 md:p-2 rounded-full border border-transparent hover:border-[var(--border-color)] hover:bg-[var(--card-bg)] transition-all">
            <ChevronRight size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* --- DAYS OF WEEK HEADER --- */}
      <div className="grid grid-cols-7 mb-2 shrink-0">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-[10px] md:text-xs font-semibold uppercase tracking-widest text-[var(--foreground)] opacity-50 pb-2 border-b border-[var(--border-color)]/70 mx-1 md:mx-2">
            {day}
          </div>
        ))}
      </div>

      {/* --- GRID AREA MAP --- */}
      <div className="grid grid-cols-7 gap-y-1 md:gap-y-2 flex-1 content-start relative z-10">
        {calendarDays.map((day, idx) => {
          const isSelectedStart = startDate && isSameDay(day, startDate);
          const isSelectedEnd = endDate && isSameDay(day, endDate);
          const isSelected = isSelectedStart || isSelectedEnd;
          const isBetween = startDate && endDate && isWithinInterval(day, { start: startDate, end: endDate }) && !isSelected;
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isCurrentDay = isToday(day); 
          
          const dateString = format(day, "yyyy-MM-dd");
          const dayHolidays = holidays[dateString];

          return (
            <div key={idx} className="relative flex justify-center items-center h-10 md:h-12 w-full mt-1">
              
              {/* HIGHLIGHT LAYER (Sits behind the button for ranges) */}
              {isBetween && <div className="absolute inset-y-0 left-0 right-0 bg-[var(--primary)]/10"></div>}
              {isSelectedStart && endDate && !isSelectedEnd && <div className="absolute inset-y-0 right-0 w-1/2 bg-[var(--primary)]/10"></div>}
              {isSelectedEnd && startDate && !isSelectedStart && <div className="absolute inset-y-0 left-0 w-1/2 bg-[var(--primary)]/10"></div>}

              {/* Holiday Tooltip */}
              {dayHolidays && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block w-max bg-[var(--foreground)] text-[var(--background)] text-[10px] py-1 px-2 rounded z-20 whitespace-nowrap shadow-sm">
                  {dayHolidays.join(", ")}
                </div>
              )}
              
              {/* BUTTON LAYER (Sits on top for actual clicking) */}
              <button
                onClick={() => handleDayClick(day)}
                className={`group relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10 text-xs md:text-sm transition-transform z-10
                  ${!isCurrentMonth ? "opacity-30" : "opacity-100"}
                  ${isSelected ? "bg-[var(--primary)] text-[var(--background)] font-bold shadow-md rounded-lg scale-105" : "bg-transparent font-medium text-[var(--foreground)] hover:bg-[var(--primary)]/10"}
                  ${!isSelected && !isBetween ? "rounded-lg" : ""}
                  ${isCurrentDay && !isSelected ? "ring-1 ring-[var(--primary)] text-[var(--primary)] font-bold" : ""} 
                `}
              >
                <span>{format(day, "d")}</span>
                
                {/* Holiday dot indicator */}
                {dayHolidays && (
                  <span className={`absolute bottom-0 md:bottom-1 w-1 h-1 rounded-full ${isSelected ? 'bg-[var(--background)]' : 'bg-[var(--primary)]'}`}></span>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}