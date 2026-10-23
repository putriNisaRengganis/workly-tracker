"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import {
  Clock,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  Download,
  Calendar,
  Briefcase,
  Filter,
} from "lucide-react";

// Import ApexCharts dynamically to prevent SSR hydration errors in Next.js
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState("This Week");
  const [selectedProject, setSelectedProject] = useState("All Projects");

  // ApexCharts Configuration: Hours Tracked (Bar Chart)
  const barChartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      fontFamily: "inherit",
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: "40%",
        distributed: false,
      },
    },
    colors: ["#2563eb"],
    dataLabels: { enabled: false },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: { colors: "#64748b", fontSize: "11px", fontWeight: 600 },
      },
    },
    yaxis: {
      labels: {
        style: { colors: "#64748b", fontSize: "11px" },
        formatter: (val) => `${val}h`,
      },
    },
    grid: {
      borderColor: "#f1f5f9",
      strokeDashArray: 4,
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} Hours`,
      },
    },
  };

  const barChartSeries = [
    {
      name: "Hours Logged",
      data: [6.5, 8.0, 7.5, 9.0, 6.0, 2.0, 0],
    },
  ];

  // ApexCharts Configuration: Project Breakdown (Donut Chart)
  const donutChartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "donut",
      fontFamily: "inherit",
    },
    labels: [
      "Website E-Commerce",
      "Mobile Banking App",
      "Internal Tools",
      "Meeting",
    ],
    colors: ["#2563eb", "#6366f1", "#10b981", "#f59e0b"],
    legend: {
      position: "bottom",
      fontSize: "12px",
      fontWeight: 500,
      labels: { colors: "#475569" },
    },
    dataLabels: { enabled: false },
    stroke: { width: 0 },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total Hours",
              fontSize: "12px",
              color: "#64748b",
              formatter: () => "39h 00m",
            },
          },
        },
      },
    },
  };

  const donutChartSeries = [18, 12, 6, 3];

  // Table Data
  const reportData = [
    {
      project: "Website E-Commerce",
      trackedHours: "18h 30m",
      billableHours: "18h 30m",
      billableAmount: "$925.00",
      status: "In Progress",
    },
    {
      project: "Mobile Banking App",
      trackedHours: "12h 15m",
      billableHours: "10h 00m",
      billableAmount: "$500.00",
      status: "In Progress",
    },
    {
      project: "Internal Tools",
      trackedHours: "06h 00m",
      billableHours: "00h 00m",
      billableAmount: "$0.00",
      status: "Completed",
    },
    {
      project: "Marketing Website",
      trackedHours: "02h 15m",
      billableHours: "02h 15m",
      billableAmount: "$112.50",
      status: "Planning",
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Reports</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Understand team productivity and work distribution with detailed analytics.
          </p>
        </div>

        {/* Filter & Export Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="text-xs font-semibold text-slate-700 bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="This Week">This Week</option>
              <option value="Last Week">Last Week</option>
              <option value="This Month">This Month</option>
              <option value="Custom">Custom Range</option>
            </select>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
            <Briefcase className="w-4 h-4 text-slate-400" />
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="text-xs font-semibold text-slate-700 bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="All Projects">All Projects</option>
              <option value="Website E-Commerce">Website E-Commerce</option>
              <option value="Mobile Banking App">Mobile Banking App</option>
              <option value="Internal Tools">Internal Tools</option>
            </select>
          </div>

          <button className="flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer">
            <Download className="w-4 h-4 text-slate-500" /> Export Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Total Hours</span>
            <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-800">39h 00m</div>
          <p className="text-[11px] font-medium text-emerald-600 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +12% from last week
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Weekly Avg</span>
            <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-800">07h 48m / day</div>
          <p className="text-[11px] font-medium text-slate-400">Based on 5 work days</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Billable Hours</span>
            <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-800">30h 45m</div>
          <p className="text-[11px] font-medium text-emerald-600">78.8% billable rate</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Tasks Completed</span>
            <div className="w-8 h-8 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-800">14 Tasks</div>
          <p className="text-[11px] font-medium text-emerald-600 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +3 tasks this week
          </p>
        </div>
      </div>

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hours Tracked Bar Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-800">Hours Tracked</h2>
              <p className="text-xs text-slate-400 font-medium">
                Daily time logged across all projects.
              </p>
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
              Total: 39h
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <Chart
              options={barChartOptions}
              series={barChartSeries}
              type="bar"
              height="100%"
            />
          </div>
        </div>

        {/* Project Breakdown Donut Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-800">Project Breakdown</h2>
            <p className="text-xs text-slate-400 font-medium">
              Time distribution per project.
            </p>
          </div>

          <div className="h-64 flex items-center justify-center my-auto">
            <Chart
              options={donutChartOptions}
              series={donutChartSeries}
              type="donut"
              width="100%"
            />
          </div>
        </div>
      </div>

      {/* Detailed Report Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-base font-bold text-slate-800">Detailed Report</h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Summary of hours and estimated value grouped by project.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Project</th>
                <th className="px-6 py-3.5">Tracked Hours</th>
                <th className="px-6 py-3.5">Billable Hours</th>
                <th className="px-6 py-3.5">Billable Amount</th>
                <th className="px-6 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {reportData.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800">
                    {item.project}
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-700">
                    {item.trackedHours}
                  </td>
                  <td className="px-6 py-4 font-semibold text-emerald-600">
                    {item.billableHours}
                  </td>
                  <td className="px-6 py-4 font-extrabold text-slate-800">
                    {item.billableAmount}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 text-[11px] font-bold rounded-lg ${
                        item.status === "Completed"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                          : item.status === "In Progress"
                          ? "bg-blue-50 text-blue-600 border border-blue-200"
                          : "bg-amber-50 text-amber-600 border border-amber-200"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}