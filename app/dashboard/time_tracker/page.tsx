"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  ChevronDown,
  Globe,
  Code,
  Layout,
  Users,
  Check,
} from "lucide-react";

interface TimeEntry {
  id: number;
  title: string;
  subtitle: string;
  duration: string;
  isRunning?: boolean;
  iconBg: string;
  iconColor: string;
  icon: React.ElementType;
}

export default function TimeTrackerPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  // States Pilihan Menu
  const [workingOn, setWorkingOn] = useState("Website Development");
  const [project, setProject] = useState("Website Client A");
  const [task, setTask] = useState("Frontend Development");

  // States Control Dropdown Open/Close
  const [openDropdown, setOpenDropdown] = useState<"workingOn" | "project" | "task" | null>(null);

  // Opsi Pilihan
  const workingOnOptions = [
    { name: "Website Development", icon: Globe, iconBg: "bg-indigo-100", iconColor: "text-indigo-600" },
    { name: "API Integration", icon: Code, iconBg: "bg-amber-100", iconColor: "text-amber-600" },
    { name: "UI/UX Design", icon: Layout, iconBg: "bg-purple-100", iconColor: "text-purple-600" },
    { name: "Team Meeting", icon: Users, iconBg: "bg-rose-100", iconColor: "text-rose-600" },
  ];

  const projectOptions = [
    "Website Client A",
    "Mobile App Client B",
    "Internal Dashboard",
    "Marketing Campaign",
  ];

  const taskOptions = [
    "Frontend Development",
    "Backend Development",
    "UI/UX Design",
    "API Testing",
    "Daily Standup",
  ];

  const [entries, setEntries] = useState<TimeEntry[]>([
    {
      id: 1,
      title: "Website Development",
      subtitle: "Frontend Development",
      duration: "02:34:12",
      isRunning: true,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      icon: Globe,
    },
    {
      id: 2,
      title: "API Integration",
      subtitle: "Backend Development",
      duration: "01:20:43",
      isRunning: false,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      icon: Code,
    },
    {
      id: 3,
      title: "UI/UX Design",
      subtitle: "Design System",
      duration: "01:45:21",
      isRunning: false,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      icon: Layout,
    },
    {
      id: 4,
      title: "Team Meeting",
      subtitle: "Daily Standup",
      duration: "00:30:00",
      isRunning: false,
      iconBg: "bg-rose-100",
      iconColor: "text-rose-600",
      icon: Users,
    },
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTimer = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return {
      hrs: hrs.toString().padStart(2, "0"),
      mins: mins.toString().padStart(2, "0"),
      secs: secs.toString().padStart(2, "0"),
    };
  };

  const timerObj = formatTimer(seconds);
  const currentWorkingOnObj = workingOnOptions.find((opt) => opt.name === workingOn) || workingOnOptions[0];
  const CurrentIcon = currentWorkingOnObj.icon;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-slate-900">Time Tracker</h1>

      {/* HERO TIMER CARD */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
        
        {/* Dropdown 1: What are you working on? */}
        <div className="relative">
          <label className="block text-xs font-semibold text-slate-500 mb-1.5">
            What are you working on?
          </label>
          <div
            onClick={() => setOpenDropdown(openDropdown === "workingOn" ? null : "workingOn")}
            className="w-full flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 cursor-pointer hover:bg-slate-100/80 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className={`w-6 h-6 rounded-lg ${currentWorkingOnObj.iconBg} ${currentWorkingOnObj.iconColor} flex items-center justify-center`}>
                <CurrentIcon className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-slate-800">
                {workingOn}
              </span>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openDropdown === "workingOn" ? "rotate-180" : ""}`} />
          </div>

          {/* Menu Pilihan Working On */}
          {openDropdown === "workingOn" && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-20 py-1 overflow-hidden">
              {workingOnOptions.map((opt) => {
                const IconComp = opt.icon;
                const isSelected = opt.name === workingOn;
                return (
                  <div
                    key={opt.name}
                    onClick={() => {
                      setWorkingOn(opt.name);
                      setOpenDropdown(null);
                    }}
                    className="flex items-center justify-between px-3.5 py-2.5 hover:bg-slate-50 cursor-pointer text-xs font-semibold text-slate-700"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-6 h-6 rounded-lg ${opt.iconBg} ${opt.iconColor} flex items-center justify-center`}>
                        <IconComp className="w-3.5 h-3.5" />
                      </div>
                      <span>{opt.name}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-indigo-600" />}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Project & Task Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Dropdown 2: Project */}
          <div className="relative">
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Project
            </label>
            <div
              onClick={() => setOpenDropdown(openDropdown === "project" ? null : "project")}
              className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <span className="text-xs font-semibold text-slate-700">
                {project}
              </span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openDropdown === "project" ? "rotate-180" : ""}`} />
            </div>

            {/* Menu Pilihan Project */}
            {openDropdown === "project" && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-20 py-1 max-h-48 overflow-y-auto">
                {projectOptions.map((projOption) => (
                  <div
                    key={projOption}
                    onClick={() => {
                      setProject(projOption);
                      setOpenDropdown(null);
                    }}
                    className="flex items-center justify-between px-3.5 py-2 hover:bg-slate-50 cursor-pointer text-xs font-semibold text-slate-700"
                  >
                    <span>{projOption}</span>
                    {projOption === project && <Check className="w-4 h-4 text-indigo-600" />}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dropdown 3: Task */}
          <div className="relative">
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Task
            </label>
            <div
              onClick={() => setOpenDropdown(openDropdown === "task" ? null : "task")}
              className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <span className="text-xs font-semibold text-slate-700">
                {task}
              </span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openDropdown === "task" ? "rotate-180" : ""}`} />
            </div>

            {/* Menu Pilihan Task */}
            {openDropdown === "task" && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-20 py-1 max-h-48 overflow-y-auto">
                {taskOptions.map((taskOption) => (
                  <div
                    key={taskOption}
                    onClick={() => {
                      setTask(taskOption);
                      setOpenDropdown(null);
                    }}
                    className="flex items-center justify-between px-3.5 py-2 hover:bg-slate-50 cursor-pointer text-xs font-semibold text-slate-700"
                  >
                    <span>{taskOption}</span>
                    {taskOption === task && <Check className="w-4 h-4 text-indigo-600" />}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Big Display Clock */}
        <div className="text-center py-4">
          <div className="text-5xl sm:text-6xl font-bold tracking-wider text-slate-900 font-sans">
            {timerObj.hrs} : {timerObj.mins} : {timerObj.secs}
          </div>
          <p className="text-xs font-medium text-slate-400 mt-3">{task}</p>
        </div>

        {/* Pause / Start Button */}
        <div className="flex justify-center">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="w-full sm:w-56 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-200 transition-all active:scale-95"
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 fill-white" /> Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" /> Start
              </>
            )}
          </button>
        </div>
      </div>

      {/* TODAY LOGS SECTION */}
      <div className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h2 className="font-bold text-slate-800 text-sm">Today</h2>
          <span className="text-xs text-slate-500 font-medium">
            Total: <strong className="text-slate-800 font-mono">06:10:16</strong>
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-100 overflow-hidden">
          {entries.map((item) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.id}
                className="p-4 flex items-center justify-between hover:bg-slate-50/60 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0`}
                  >
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-800">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs font-semibold text-slate-700 font-mono">
                    {item.duration}
                  </span>

                  {item.isRunning ? (
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[11px] font-bold rounded-full border border-emerald-100">
                      Running
                    </span>
                  ) : (
                    <button className="w-8 h-8 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors">
                      <Play className="w-3.5 h-3.5 fill-slate-600 ml-0.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}