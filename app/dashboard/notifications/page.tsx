"use client";

import React, { useState } from "react";
import {
  CheckSquare,
  FolderKanban,
  Clock,
  AlertCircle,
  MessageSquare,
  CheckCheck,
  Trash2,
} from "lucide-react";

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  category: "task" | "project" | "timesheet" | "mention";
  isRead: boolean;
}

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<"All" | "Unread" | "Mentions">("All");

  // Mock Data disesuaikan dengan layar Notifications - List pada mockup
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "1",
      title: "Task 'API Integration' was assigned to you",
      description: "Fikri S. assigned you to API Integration in Mobile Banking App.",
      time: "Just now",
      category: "task",
      isRead: false,
    },
    {
      id: "2",
      title: "Fikri S. mentioned you in 'Website E-Commerce'",
      description: "@Putri Nisa boleh bantu cek komponen card produknya?",
      time: "2 hours ago",
      category: "mention",
      isRead: false,
    },
    {
      id: "3",
      title: "Your timesheet for 10–16 Aug 2026 was approved",
      description: "Teh Alya approved your weekly time logs (39h 00m).",
      time: "1 day ago",
      category: "timesheet",
      isRead: true,
    },
    {
      id: "4",
      title: "Deadline 'Project Dashboard' is due in 2 days",
      description: "Make sure all frontend views are finalized before 20 Aug 2026.",
      time: "2 days ago",
      category: "project",
      isRead: true,
    },
    {
      id: "5",
      title: "Task 'UI/UX Design' was marked as Done",
      description: "Putri Nisa completed UI/UX Design in Website E-Commerce.",
      time: "3 days ago",
      category: "task",
      isRead: true,
    },
  ]);

  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const handleToggleRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (activeTab === "Unread") return !notif.isRead;
    if (activeTab === "Mentions") return notif.category === "mention";
    return true;
  });

  const getCategoryIcon = (category: NotificationItem["category"]) => {
    switch (category) {
      case "task":
        return (
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
            <CheckSquare className="w-5 h-5" />
          </div>
        );
      case "mention":
        return (
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
        );
      case "timesheet":
        return (
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
        );
      case "project":
        return (
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
        );
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      {/* Top Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Notifications</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Stay updated with what&apos;s happening across your workspace.
          </p>
        </div>

        <button
          onClick={handleMarkAllRead}
          disabled={unreadCount === 0}
          className="flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-700 disabled:text-slate-400 px-3 py-2 rounded-xl hover:bg-blue-50 disabled:hover:bg-transparent transition-all cursor-pointer disabled:cursor-default"
        >
          <CheckCheck className="w-4 h-4" /> Mark all as read
        </button>
      </div>

      {/* Filter Tabs & Notification List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Tabs Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
            {(["All", "Unread", "Mentions"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === tab
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab}
                {tab === "Unread" && unreadCount > 0 && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      activeTab === "Unread"
                        ? "bg-white text-blue-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="divide-y divide-slate-100">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => handleToggleRead(notif.id)}
                className={`p-5 flex items-start justify-between gap-4 transition-colors cursor-pointer ${
                  notif.isRead ? "bg-white hover:bg-slate-50/80" : "bg-blue-50/30 hover:bg-blue-50/50"
                }`}
              >
                <div className="flex items-start gap-4">
                  {getCategoryIcon(notif.category)}

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3
                        className={`text-sm ${
                          notif.isRead
                            ? "font-semibold text-slate-700"
                            : "font-bold text-slate-900"
                        }`}
                      >
                        {notif.title}
                      </h3>
                      {!notif.isRead && (
                        <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 font-medium">
                      {notif.description}
                    </p>
                    <p className="text-[11px] text-slate-400 font-medium pt-0.5">
                      {notif.time}
                    </p>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteNotification(notif.id);
                  }}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer shrink-0"
                  title="Delete notification"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-slate-400 space-y-2">
              <FolderKanban className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-sm font-medium">No notifications in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}