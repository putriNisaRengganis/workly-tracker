"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Timer,
  FileText,
  Calendar,
  Briefcase,
  CheckSquare,
  BarChart2,
  Users,
  Settings,
  Bell,
  LogOut,
  Palmtree,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userName, setUserName] = useState("Putri Nisa");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserName(parsedUser.name || "Putri Nisa");
      } catch {
        setUserName(storedUser);
      }
    }
  }, []);

  const menuGroups = [
    {
      group: null,
      items: [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Time Tracker", href: "/dashboard/time_tracker", icon: Timer },
        { name: "Timesheet", href: "/dashboard/timesheet", icon: FileText },
        { name: "Calendar", href: "/dashboard/calender", icon: Calendar },
      ],
    },
    {
      group: "WORKSPACE",
      items: [
        { name: "Projects", href: "/dashboard/projects", icon: Briefcase },
        { name: "Tasks", href: "/dashboard/tasks", icon: CheckSquare },
        { name: "Reports", href: "/dashboard/reports", icon: BarChart2 },
      ],
    },
    {
      group: "TEAM",
      items: [
        { name: "Members", href: "/dashboard/members", icon: Users },
        { name: "Time Off", href: "/dashboard/time_off", icon: Palmtree },
      ],
    },
    {
      group: "MORE",
      items: [
        { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
        { name: "Settings", href: "/dashboard/settings", icon: Settings },
      ],
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Mobile Header Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between z-40">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            W
          </div>
          <span className="font-bold text-lg text-slate-800">Workly</span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Overlay Mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-slate-900/30 z-40 md:hidden"
        />
      )}

      {/* Sidebar Component */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col justify-between p-4 transition-transform duration-200 ease-in-out md:sticky md:top-0 md:h-screen md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="flex items-center gap-2 px-2 py-3 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              W
            </div>
            <span className="font-bold text-xl text-slate-800">Workly</span>
          </div>

          <nav className="space-y-5 overflow-y-auto max-h-[calc(100vh-160px)] pr-1">
            {menuGroups.map((group, idx) => (
              <div key={idx}>
                {group.group && (
                  <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    {group.group}
                  </p>
                )}
                <ul className="space-y-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setIsSidebarOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                            isActive
                              ? "bg-blue-50 text-blue-600"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          }`}
                        >
                          <Icon
                            className={`w-4 h-4 ${
                              isActive ? "text-blue-600" : "text-slate-400"
                            }`}
                          />
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom User Info */}
        <div className="border-t border-slate-100 pt-3 flex items-center justify-between px-2">
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-2.5 overflow-hidden hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs shrink-0 border border-slate-300 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col truncate">
              <span className="text-xs font-bold text-slate-800 truncate">
                {userName}
              </span>
              <span className="text-[10px] text-slate-400">View profile</span>
            </div>
          </Link>
          <button
            onClick={handleLogout}
            title="Logout"
            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Render Area */}
      <div className="flex-1 flex flex-col min-w-0 mt-14 md:mt-0">
        {/* Top Navbar Header (Date, Notification Bell, & Profile Avatar) */}
        <header className="hidden md:flex h-14 bg-white border-b border-slate-200 px-8 items-center justify-between shrink-0">
          <div></div> {/* Spacer */}

          <div className="flex items-center gap-3">
            {/* Today Date Dropdown */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
              <span>Today, 10 Aug 2026</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>

            {/* Notification Bell */}
            <Link
              href="/dashboard/notifications"
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
            </Link>

            {/* Top Right Profile Avatar */}
            <Link
              href="/dashboard/settings"
              className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden border border-slate-300 hover:ring-2 hover:ring-blue-500/20 transition-all shrink-0"
              title="View profile"
            >
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
                alt="Profile Avatar"
                className="w-full h-full object-cover"
              />
            </Link>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}