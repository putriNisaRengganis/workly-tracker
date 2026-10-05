"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar as CalendarIcon,
  Clock,
  Briefcase,
  CheckCircle2,
  X,
  Filter,
} from "lucide-react";

interface CalendarEvent {
  id: string;
  title: string;
  project: string;
  date: string; // YYYY-MM-DD
  time: string;
  color: "blue" | "purple" | "emerald" | "amber";
  completed: boolean;
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 9, 1)); // Oct 2026
  const [selectedDate, setSelectedDate] = useState<string>("2026-10-05");
  const [viewMode, setViewMode] = useState<"month" | "week">("month");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Mock Data Event / Deadline
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "UI Design Review",
      project: "Workly Tracker",
      date: "2026-10-05",
      time: "09:00 - 10:30 AM",
      color: "blue",
      completed: true,
    },
    {
      id: "2",
      title: "Sprint Planning",
      project: "Land Sales Web",
      date: "2026-10-05",
      time: "02:00 - 03:30 PM",
      color: "purple",
      completed: false,
    },
    {
      id: "3",
      title: "API Integration Testing",
      project: "Workly Tracker",
      date: "2026-10-08",
      time: "11:00 AM - 01:00 PM",
      color: "emerald",
      completed: false,
    },
    {
      id: "4",
      title: "Client Presentation",
      project: "Client Project A",
      date: "2026-10-15",
      time: "10:00 - 11:30 AM",
      color: "amber",
      completed: false,
    },
  ]);

  // Form State
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventProject, setNewEventProject] = useState("Workly Tracker");
  const [newEventDate, setNewEventDate] = useState("2026-10-05");
  const [newEventTime, setNewEventTime] = useState("09:00 AM");

  // Navigasi Bulan
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today.toISOString().split("T")[0]);
  };

  // Helper Kalender
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString("en-US", { month: "long" });

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Helper untuk format YYYY-MM-DD
  const formatDateString = (day: number) => {
    const m = String(month + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${year}-${m}-${d}`;
  };

  // Map Warna Badge Event
  const colorMap = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
  };

  const selectedDateEvents = events.filter((e) => e.date === selectedDate);

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle) return;

    const newEntry: CalendarEvent = {
      id: Date.now().toString(),
      title: newEventTitle,
      project: newEventProject,
      date: newEventDate,
      time: newEventTime,
      color: "blue",
      completed: false,
    };

    setEvents([...events, newEntry]);
    setNewEventTitle("");
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto pb-20">
      {/* Top Bar Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
            <CalendarIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">
              {monthName} {year}
            </h1>
            <p className="text-xs text-slate-500 font-medium">Manage your schedule and deadlines</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={prevMonth}
              className="p-1.5 hover:bg-white rounded-lg text-slate-600 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={goToToday}
              className="px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-white rounded-lg transition-all"
            >
              Today
            </button>
            <button
              onClick={nextMonth}
              className="p-1.5 hover:bg-white rounded-lg text-slate-600 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setViewMode("month")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                viewMode === "month" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500"
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode("week")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                viewMode === "week" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500"
              }`}
            >
              Week
            </button>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add Event
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Grid Calendar (2 Cols) */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          {/* Days Header */}
          <div className="grid grid-cols-7 mb-2 text-center">
            {daysOfWeek.map((day) => (
              <div key={day} className="text-xs font-bold text-slate-400 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1.5">
            {/* Empty slots before first day */}
            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <div key={`empty-${index}`} className="h-24 bg-slate-50/50 rounded-xl border border-slate-100/50" />
            ))}

            {/* Day Cells */}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const dateStr = formatDateString(day);
              const dayEvents = events.filter((e) => e.date === dateStr);
              const isSelected = selectedDate === dateStr;

              const isToday =
                new Date().getDate() === day &&
                new Date().getMonth() === month &&
                new Date().getFullYear() === year;

              return (
                <div
                  key={day}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`h-24 p-2 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "border-indigo-600 bg-indigo-50/20 shadow-sm"
                      : "border-slate-100 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-lg ${
                        isToday
                          ? "bg-indigo-600 text-white"
                          : isSelected
                          ? "text-indigo-600 font-extrabold"
                          : "text-slate-700"
                      }`}
                    >
                      {day}
                    </span>
                    {dayEvents.length > 0 && (
                      <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    )}
                  </div>

                  {/* Badges Event (Max 2) */}
                  <div className="space-y-1 overflow-hidden">
                    {dayEvents.slice(0, 2).map((ev) => (
                      <div
                        key={ev.id}
                        className={`text-[10px] font-medium truncate px-1.5 py-0.5 rounded border ${colorMap[ev.color]}`}
                      >
                        {ev.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <p className="text-[9px] text-slate-400 font-semibold pl-1">
                        +{dayEvents.length - 2} more
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar Schedule List (1 Col) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-800">Schedule Details</h2>
              <p className="text-xs text-slate-500 font-medium">{selectedDate}</p>
            </div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
              {selectedDateEvents.length} Tasks
            </span>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto max-h-[420px] pr-1">
            {selectedDateEvents.length === 0 ? (
              <div className="text-center py-12">
                <CalendarIcon className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-500">No events for this day</p>
                <p className="text-[11px] text-slate-400 mt-1">Select another date or add a new schedule.</p>
              </div>
            ) : (
              selectedDateEvents.map((ev) => (
                <div
                  key={ev.id}
                  className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-all space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <h3 className="text-xs font-bold text-slate-800">{ev.title}</h3>
                    <button
                      onClick={() =>
                        setEvents(
                          events.map((item) =>
                            item.id === ev.id ? { ...item, completed: !item.completed } : item
                          )
                        )
                      }
                      className={`p-1 rounded-lg transition-colors ${
                        ev.completed ? "text-emerald-600" : "text-slate-300 hover:text-slate-400"
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {ev.time}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                      {ev.project}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-slate-200 shadow-xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-800">Add New Event</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEvent} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  placeholder="e.g. Client Design Review"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Project</label>
                <select
                  value={newEventProject}
                  onChange={(e) => setNewEventProject(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value="Workly Tracker">Workly Tracker</option>
                  <option value="Land Sales Web">Land Sales Web</option>
                  <option value="Client Project A">Client Project A</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Time</label>
                  <input
                    type="text"
                    required
                    value={newEventTime}
                    onChange={(e) => setNewEventTime(e.target.value)}
                    placeholder="09:00 AM"
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Save Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}