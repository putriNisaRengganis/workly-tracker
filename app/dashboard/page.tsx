"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import {
  CheckSquare,
  BarChart2,
  Bell,
  Play,
  Pause,
  Plus,
  ChevronDown,
  Clock,
  Briefcase,
} from "lucide-react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Home() {
  const [isRunning, setIsRunning] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [userName, setUserName] = useState("Putri Nisa");
  const [greeting, setGreeting] = useState("Good evening");
  const [currentDateStr, setCurrentDateStr] = useState("");
  const [timerSeconds, setTimerSeconds] = useState(0);

  const [metrics, setMetrics] = useState({
    totalHours: "07h 42m",
    totalHoursTrend: "+12%",
    tasksCompleted: 12,
    tasksTrend: "+8%",
    totalProjects: 4,
    projectsTrend: "0%",
  });

  const [weeklyHours, setWeeklyHours] = useState<number[]>([4.5, 6.0, 8.0, 9.5, 7.0, 2.0, 1.0]);
  const daysCategory = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const [topProjects, setTopProjects] = useState([
    { name: "Website Development", hours: 14, percentage: 43, color: "bg-blue-600" },
    { name: "Mobile App", hours: 9, percentage: 28, color: "bg-purple-500" },
    { name: "Internal", hours: 6, percentage: 19, color: "bg-indigo-500" },
    { name: "Meeting", hours: 3, percentage: 10, color: "bg-amber-500" },
  ]);

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, title: "API Integration", category: "Website Development", time: "02:15:00", active: true },
    { id: 2, title: "Database Schema", category: "Mobile App", time: "01:30:00", active: false },
  ]);

  const [schedules, setSchedules] = useState([
    { id: 1, time: "10:00 AM", title: "Sprint Planning", type: "Meeting", tagBg: "bg-blue-100 text-blue-700" },
    { id: 2, time: "02:00 PM", title: "Code Review", type: "Internal", tagBg: "bg-purple-100 text-purple-700" },
  ]);

  useEffect(() => {
    setIsMounted(true);

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserName(parsedUser.name || "Putri Nisa");
      } catch {
        setUserName(storedUser);
      }
    }

    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    setCurrentDateStr(`Today, ${today.toLocaleDateString("en-GB", options)}`);

    const currentHour = today.getHours();
    if (currentHour < 12) setGreeting("Good morning");
    else if (currentHour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const token = localStorage.getItem("token");
        const response = await fetch("/api/dashboard", {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        if (response.ok) {
          const result = await response.json();
          const data = result.data || result;
          if (data.metrics) setMetrics(data.metrics);
          if (Array.isArray(data.weeklyHours)) setWeeklyHours(data.weeklyHours);
          if (Array.isArray(data.topProjects)) setTopProjects(data.topProjects);
          if (Array.isArray(data.recentActivities)) setRecentActivities(data.recentActivities);
          if (Array.isArray(data.schedules)) setSchedules(data.schedules);
        }
      } catch (err: unknown) {
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTimer = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const totalWeeklyDecimal = weeklyHours.reduce((acc, curr) => acc + curr, 0);
  const totalWeeklyHours = Math.floor(totalWeeklyDecimal);
  const totalWeeklyMinutes = Math.round((totalWeeklyDecimal - totalWeeklyHours) * 60);
  const totalTopProjectsHours = topProjects.reduce((acc, curr) => acc + curr.hours, 0);

  const chartOptions: ApexOptions = {
    chart: { type: "bar", height: 240, toolbar: { show: false } },
    colors: ["#2563eb"],
    plotOptions: { bar: { columnWidth: "40%", borderRadius: 4 } },
    dataLabels: { enabled: false },
    xaxis: {
      categories: daysCategory,
      axisTicks: { show: false },
      axisBorder: { show: false },
      labels: { style: { colors: "#616161", fontSize: "12px" } },
    },
    yaxis: {
      labels: {
        style: { colors: "#616161", fontSize: "12px" },
        formatter: (val) => `${val}h`,
      },
    },
    grid: {
      show: true,
      borderColor: "#f1f5f9",
      strokeDashArray: 4,
    },
    fill: { opacity: 0.85 },
    tooltip: { theme: "dark", y: { formatter: (val) => `${val} hrs` } },
  };

  const chartSeries = [{ name: "Hours Worked", data: weeklyHours }];

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            {greeting}, {userName ? userName.split(" ")[0] : "Putri"} 👋
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Here's what's happening with your work today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
            {currentDateStr || "Today"}
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors relative shadow-sm">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </header>

      {/* TOP METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center">
          <div>
            <p className="text-xs text-slate-500 mb-1">Total Hours</p>
            <h2 className="text-2xl font-bold text-slate-800">{metrics.totalHours}</h2>
            <span className="text-xs text-emerald-600 font-medium flex items-center gap-1 mt-1">
              {metrics.totalHoursTrend} <span className="text-slate-400">from yesterday</span>
            </span>
          </div>
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center">
          <div>
            <p className="text-xs text-slate-500 mb-1">Tasks Completed</p>
            <h2 className="text-2xl font-bold text-slate-800">{metrics.tasksCompleted}</h2>
            <span className="text-xs text-emerald-600 font-medium flex items-center gap-1 mt-1">
              {metrics.tasksTrend} <span className="text-slate-400">from yesterday</span>
            </span>
          </div>
          <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center shrink-0">
            <CheckSquare className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center">
          <div>
            <p className="text-xs text-slate-500 mb-1">Projects</p>
            <h2 className="text-2xl font-bold text-slate-800">{metrics.totalProjects}</h2>
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-1">
              {metrics.projectsTrend} <span className="text-slate-400">from yesterday</span>
            </span>
          </div>
          <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center shrink-0">
            <Briefcase className="w-5 h-5" />
          </div>
        </div>

        {/* Fix Overlapping Text Timer */}
        <div className="bg-emerald-50/60 border border-emerald-200 p-4 rounded-xl flex justify-between items-center shadow-sm">
          <div className="overflow-hidden mr-2">
            <p className="text-xs text-emerald-700 font-medium mb-1">Active Timer</p>
            <h2 className="text-xl sm:text-2xl font-bold text-emerald-900 font-mono tracking-tight leading-none py-0.5">
              {formatTimer(timerSeconds)}
            </h2>
            <span className="text-xs text-emerald-600 font-medium flex items-center gap-1.5 mt-1">
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${
                  isRunning ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                }`}
              ></span>
              {isRunning ? "Running" : "Paused"}
            </span>
          </div>
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="w-10 h-10 bg-emerald-600 text-white rounded-lg flex items-center justify-center hover:bg-emerald-700 transition-colors shadow shrink-0"
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <BarChart2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Weekly Activity</h3>
                <p className="text-xs text-slate-500">Track your daily worked hours</p>
              </div>
            </div>
            <span className="text-xs text-slate-500 bg-slate-50 px-2.5 py-1 rounded border border-slate-200 font-medium">
              Total {totalWeeklyHours}h {totalWeeklyMinutes > 0 ? `${totalWeeklyMinutes}m` : ""}
            </span>
          </div>

          <div className="pt-4 min-h-[240px]">
            {isMounted && (
              <Chart options={chartOptions} series={chartSeries} type="bar" height={240} />
            )}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <h3 className="font-bold text-slate-800 mb-2">Top Projects</h3>
          <div className="flex items-center justify-center relative my-4">
            <div className="w-32 h-32 rounded-full border-[10px] border-blue-600 border-t-purple-500 border-r-indigo-500 flex items-center justify-center">
              <div className="text-center">
                <span className="text-xl font-bold text-slate-800">{totalTopProjectsHours}h</span>
                <p className="text-[10px] text-slate-400">Total</p>
              </div>
            </div>
          </div>

          <div className="space-y-2.5 text-xs">
            {topProjects.map((proj, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-slate-600">
                  <span className={`w-2.5 h-2.5 rounded-full ${proj.color}`}></span>
                  {proj.name}
                </span>
                <span className="font-semibold text-slate-800">
                  {proj.hours}h ({proj.percentage}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM LISTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800">Recent Activity</h3>
            <a href="#" className="text-xs text-blue-600 font-medium hover:underline">
              View all
            </a>
          </div>
          <div className="space-y-3">
            {recentActivities.map((act) => (
              <div
                key={act.id}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100"
              >
                <div>
                  <h4 className="text-sm font-semibold text-slate-800">{act.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{act.category}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-700 font-mono">
                    {act.active ? formatTimer(timerSeconds) : act.time}
                  </span>
                  {act.active ? (
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-medium rounded-full">
                      Running
                    </span>
                  ) : (
                    <button className="p-1.5 bg-white border border-slate-200 rounded-md text-slate-600 hover:bg-slate-100 transition-colors">
                      <Play className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800">Today's Schedule</h3>
            <a href="#" className="text-xs text-blue-600 font-medium hover:underline">
              View calendar
            </a>
          </div>
          <div className="space-y-3">
            {schedules.map((sched) => (
              <div
                key={sched.id}
                className="flex items-center justify-between p-3 border-l-4 border-blue-600 bg-slate-50 rounded-r-lg"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-medium text-slate-500">{sched.time}</span>
                  <h4 className="text-sm font-semibold text-slate-800">{sched.title}</h4>
                </div>
                <span className={`px-2 py-0.5 text-[10px] font-medium rounded ${sched.tagBg}`}>
                  {sched.type}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 border border-dashed border-slate-300 rounded-lg text-xs font-medium text-slate-500 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1">
            <Plus className="w-3.5 h-3.5" /> Add schedule
          </button>
        </div>
      </div>
    </div>
  );
}