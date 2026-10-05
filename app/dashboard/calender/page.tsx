"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock, X } from "lucide-react";

interface CalendarEvent {
  id: string;
  title: string;
  date: number; // Tanggal dalam bulan
  time: string;
  color: string; // Tailwind class
}

export default function CalendarPage() {
  const [currentView, setCurrentView] = useState<"Month" | "Week" | "Agenda">("Month");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Mock Events sesuai UI mockup
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "Project Discussion",
      date: 29,
      time: "10:00",
      color: "bg-amber-100 text-amber-800 border-amber-300",
    },
    {
      id: "2",
      title: "Focus Work",
      date: 31,
      time: "14:00",
      color: "bg-indigo-100 text-indigo-800 border-indigo-300",
    },
    {
      id: "3",
      title: "API Integration",
      date: 13,
      time: "15:00",
      color: "bg-rose-100 text-rose-800 border-rose-300",
    },
    {
      id: "4",
      title: "UI/UX Review",
      date: 24,
      time: "11:00",
      color: "bg-blue-100 text-blue-800 border-blue-300",
    },
  ]);

  // Form State
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDate, setNewEventDate] = useState("15");
  const [newEventTime, setNewEventTime] = useState("09:00");

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle) return;

    const newEntry: CalendarEvent = {
      id: Date.now().toString(),
      title: newEventTitle,
      date: parseInt(newEventDate, 10),
      time: newEventTime,
      color: "bg-indigo-100 text-indigo-800 border-indigo-300",
    };

    setEvents([...events, newEntry]);
    setNewEventTitle("");
    setIsAddModalOpen(false);
  };

  // Days Grid Generator (August 2026 format)
  // Tanggal 28 - 31 bulan sebelumnya (Juli), lalu 1 - 31 Agustus
  const daysGrid = [
    { day: 28, isCurrentMonth: false },
    { day: 29, isCurrentMonth: false },
    { day: 30, isCurrentMonth: false },
    { day: 31, isCurrentMonth: false },
    ...Array.from({ length: 31 }, (_, i) => ({ day: i + 1, isCurrentMonth: true })),
  ];

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto pb-20">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Calendar - View</h1>
          <p className="text-xs text-slate-500 font-medium">See your schedule and important dates.</p>
        </div>

        {/* Calendar Navigation & View Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
            <button className="p-1 hover:bg-white rounded-lg transition-all text-slate-600">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-slate-800 px-1">August 2026</span>
            <button className="p-1 hover:bg-white rounded-lg transition-all text-slate-600">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
            {(["Month", "Week", "Agenda"] as const).map((view) => (
              <button
                key={view}
                onClick={() => setCurrentView(view)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  currentView === view ? "bg-indigo-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {view}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add Event
          </button>
        </div>
      </div>

      {/* Main Calendar Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Days Header */}
        <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50 text-center text-xs font-bold text-slate-600 py-3">
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
          <div>Sun</div>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-slate-100 border-b border-slate-100">
          {daysGrid.map((item, index) => {
            const dayEvents = events.filter((e) => e.date === item.day && item.isCurrentMonth);
            const isToday = item.day === 4 && item.isCurrentMonth; // Simulasi highlight today

            return (
              <div
                key={index}
                className={`min-h-[110px] p-2 transition-colors relative flex flex-col justify-between ${
                  !item.isCurrentMonth ? "bg-slate-50/50 text-slate-300" : "bg-white text-slate-700"
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span
                    className={`text-xs font-semibold rounded-full w-6 h-6 flex items-center justify-center ${
                      isToday ? "bg-indigo-600 text-white font-bold" : ""
                    }`}
                  >
                    {item.day}
                  </span>
                </div>

                {/* Event Badges */}
                <div className="space-y-1.5 flex-1">
                  {dayEvents.map((evt) => (
                    <div
                      key={evt.id}
                      className={`text-[10px] p-1.5 rounded-lg border font-semibold space-y-0.5 shadow-2xs ${evt.color}`}
                    >
                      <div className="truncate">{evt.title}</div>
                      <div className="text-[9px] opacity-80 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" /> {evt.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
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
                  placeholder="e.g. Sprint Planning Meeting"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Date (August)</label>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Time</label>
                  <input
                    type="time"
                    value={newEventTime}
                    onChange={(e) => setNewEventTime(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500"
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
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}