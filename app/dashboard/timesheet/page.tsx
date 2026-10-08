"use client";

import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Filter,
  Plus,
  Send,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  Search,
} from "lucide-react";

interface TimesheetEntry {
  id: string;
  date: string;
  project: string;
  task: string;
  startTime: string;
  endTime: string;
  duration: string; // HH:MM
  status: "Approved" | "Pending" | "Draft";
}

export default function TimesheetPage() {
  const [selectedWeek, setSelectedWeek] = useState("05 Oct - 11 Oct 2026");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");

  const [entries, setEntries] = useState<TimesheetEntry[]>([
    {
      id: "1",
      date: "Mon, 05 Oct 2026",
      project: "Workly Tracker",
      task: "Front-end UI Design & Component Setup",
      startTime: "08:30",
      endTime: "12:30",
      duration: "04:00",
      status: "Approved",
    },
    {
      id: "2",
      date: "Mon, 05 Oct 2026",
      project: "Workly Tracker",
      task: "Calendar & Dashboard Layout Integration",
      startTime: "13:30",
      endTime: "17:30",
      duration: "04:00",
      status: "Approved",
    },
    {
      id: "3",
      date: "Tue, 06 Oct 2026",
      project: "Land Sales Web App",
      task: "React Component Refactoring & State Fixes",
      startTime: "09:00",
      endTime: "12:00",
      duration: "03:00",
      status: "Approved",
    },
    {
      id: "4",
      date: "Wed, 07 Oct 2026",
      project: "Data Pipeline Airflow",
      task: "Debugging ETL Pipeline & Remediation",
      startTime: "08:00",
      endTime: "16:00",
      duration: "08:00",
      status: "Pending",
    },
    {
      id: "5",
      date: "Thu, 08 Oct 2026",
      project: "Workly Tracker",
      task: "Timesheet Page UI Implementation",
      startTime: "09:00",
      endTime: "13:00",
      duration: "04:00",
      status: "Draft",
    },
  ]);

  const filteredEntries = entries.filter((entry) => {
    const matchesStatus =
      statusFilter === "All" || entry.status === statusFilter;
    const matchesSearch =
      entry.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.task.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: TimesheetEntry["status"]) => {
    switch (status) {
      case "Approved":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> Approved
          </span>
        );
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3.5 h-3.5" /> Pending
          </span>
        );
      case "Draft":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
            <AlertCircle className="w-3.5 h-3.5" /> Draft
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Timesheet</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Review and submit your logged work hours for approval.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Week Selector */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
            <button className="p-1 hover:bg-white rounded-lg transition-all text-slate-600 cursor-pointer">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 px-1">
              <CalendarIcon className="w-3.5 h-3.5 text-blue-600" />
              <span>{selectedWeek}</span>
            </div>
            <button className="p-1 hover:bg-white rounded-lg transition-all text-slate-600 cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button className="flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer">
            <Download className="w-4 h-4 text-slate-500" /> Export CSV
          </button>

          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer">
            <Send className="w-4 h-4" /> Submit Timesheet
          </button>
        </div>
      </div>

      {/* Summary Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <p className="text-xs font-semibold text-slate-400">Total Hours Logged</p>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-800">23h 00m</span>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
              Target: 40h
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <p className="text-xs font-semibold text-slate-400">Approved Hours</p>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-emerald-600">11h 00m</span>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              2 Entries
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <p className="text-xs font-semibold text-slate-400">Pending Approval</p>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-amber-600">08h 00m</span>
            <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
              1 Entry
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <p className="text-xs font-semibold text-slate-400">Unsubmitted Drafts</p>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-700">04h 00m</span>
            <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
              1 Entry
            </span>
          </div>
        </div>
      </div>

      {/* Filter & Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Table Filters */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          <div className="relative flex-1 max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search project or task..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 bg-white rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs font-semibold">
              {["All", "Approved", "Pending", "Draft"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    statusFilter === status
                      ? "bg-blue-600 text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Timesheet Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Date</th>
                <th className="px-6 py-3.5">Project</th>
                <th className="px-6 py-3.5">Task Description</th>
                <th className="px-6 py-3.5">Time Range</th>
                <th className="px-6 py-3.5">Duration</th>
                <th className="px-6 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredEntries.length > 0 ? (
                filteredEntries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-800 whitespace-nowrap">
                      {entry.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg">
                        <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                        {entry.project}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-600 min-w-[220px]">
                      {entry.task}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-500 font-medium">
                      {entry.startTime} - {entry.endTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-bold text-slate-800">
                      {entry.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(entry.status)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-400">
                    No timesheet entries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}