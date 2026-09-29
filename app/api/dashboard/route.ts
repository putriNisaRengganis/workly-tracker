import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "success",
    data: {
      metrics: {
        totalHours: "07h 42m",
        totalHoursTrend: "↑ 12%",
        tasksCompleted: 12,
        tasksTrend: "↑ 8%",
        totalProjects: 4,
        projectsTrend: "0%",
      },
      weeklyHours: [4.0, 6.0, 8.0, 9.7, 7.0, 2.0, 1.0],
      topProjects: [
        { name: "Website Development", hours: 14, percentage: 43, color: "bg-blue-600" },
        { name: "Mobile App", hours: 9, percentage: 28, color: "bg-indigo-500" },
        { name: "Internal", hours: 6, percentage: 19, color: "bg-purple-500" },
        { name: "Meeting", hours: 3, percentage: 10, color: "bg-amber-500" },
      ],
      recentActivities: [
        { id: 1, title: "Website Development", category: "Frontend Development", time: "02:34:12", active: true },
        { id: 2, title: "API Integration", category: "Backend Development", time: "01:20:45", active: false },
        { id: 3, title: "UI/UX Design", category: "Design System", time: "01:45:20", active: false },
        { id: 4, title: "Team Meeting", category: "Daily Standup", time: "00:30:00", active: false },
      ],
      schedules: [
        { id: 1, time: "09:00 - 10:00", title: "Daily Standup", type: "Meeting", tagBg: "bg-purple-100 text-purple-700" },
        { id: 2, time: "11:00 - 13:00", title: "Project Discussion", type: "Meeting", tagBg: "bg-purple-100 text-purple-700" },
        { id: 3, time: "14:00 - 17:00", title: "Focus Work", type: "Focus", tagBg: "bg-emerald-100 text-emerald-700" },
      ],
    },
  });
}