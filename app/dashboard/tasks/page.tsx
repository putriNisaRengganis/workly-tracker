"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Pencil,
  Trash2,
  X,
  AlertTriangle,
  Calendar,
  Briefcase,
  User,
  Clock,
} from "lucide-react";

interface Task {
  id: string;
  project: string;
  title: string;
  description: string;
  category: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  status: "To Do" | "In Progress" | "Review" | "Done";
  assignee: string;
}

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState<
    "All" | "To Do" | "In Progress" | "Review" | "Done"
  >("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Modal States
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Selected Task for Update/Delete
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Initial Mock Data
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      project: "Website E-Commerce",
      title: "UI/UX Design",
      description: "Membuat wireframe dan UI kit untuk halaman katalog produk.",
      category: "UI/UX Design",
      dueDate: "10 Aug 2026",
      priority: "High",
      status: "In Progress",
      assignee: "Putri Nisa",
    },
    {
      id: "2",
      project: "Mobile Banking App",
      title: "API Integration",
      description: "Integrasi endpoint rest API autentikasi dan daftar transaksi.",
      category: "Backend",
      dueDate: "15 Aug 2026",
      priority: "Medium",
      status: "To Do",
      assignee: "Fikri S.",
    },
    {
      id: "3",
      project: "Website E-Commerce",
      title: "Frontend Development",
      description: "Slicing UI dari Figma ke React Next.js dan Tailwind CSS.",
      category: "Frontend",
      dueDate: "12 Aug 2026",
      priority: "High",
      status: "In Progress",
      assignee: "Putri Nisa",
    },
    {
      id: "4",
      project: "Mobile Banking App",
      title: "Database Structure",
      description: "Perancangan skema ERD PostgreSQL dan konfigurasi TypeORM.",
      category: "Database",
      dueDate: "05 Aug 2026",
      priority: "Low",
      status: "Done",
      assignee: "Fikri S.",
    },
  ]);

  // Form State
  const [formProject, setFormProject] = useState("Website E-Commerce");
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formCategory, setFormCategory] = useState("UI/UX Design");
  const [formDueDate, setFormDueDate] = useState("2026-08-15");
  const [formPriority, setFormPriority] = useState<"High" | "Medium" | "Low">(
    "Medium"
  );
  const [formStatus, setFormStatus] = useState<
    "To Do" | "In Progress" | "Review" | "Done"
  >("To Do");

  // Open Create Modal
  const handleOpenCreate = () => {
    setFormProject("Website E-Commerce");
    setFormTitle("");
    setFormDescription("");
    setFormCategory("UI/UX Design");
    setFormDueDate("2026-08-15");
    setFormPriority("Medium");
    setFormStatus("To Do");
    setIsCreateOpen(true);
  };

  // Open Edit Modal
  const handleOpenUpdate = (task: Task) => {
    setSelectedTask(task);
    setFormProject(task.project);
    setFormTitle(task.title);
    setFormDescription(task.description);
    setFormCategory(task.category);
    setFormDueDate("2026-08-15");
    setFormPriority(task.priority);
    setFormStatus(task.status);
    setIsUpdateOpen(true);
  };

  // Open Delete Modal
  const handleOpenDelete = (task: Task) => {
    setSelectedTask(task);
    setIsDeleteOpen(true);
  };

  // Create Submit
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle) return;

    const newTask: Task = {
      id: Date.now().toString(),
      project: formProject,
      title: formTitle,
      description: formDescription,
      category: formCategory,
      dueDate: "15 Aug 2026",
      priority: formPriority,
      status: formStatus,
      assignee: "Putri Nisa",
    };

    setTasks([newTask, ...tasks]);
    setIsCreateOpen(false);
  };

  // Update Submit
  const handleUpdateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTask) return;

    setTasks(
      tasks.map((t) =>
        t.id === selectedTask.id
          ? {
              ...t,
              project: formProject,
              title: formTitle,
              description: formDescription,
              category: formCategory,
              priority: formPriority,
              status: formStatus,
            }
          : t
      )
    );
    setIsUpdateOpen(false);
  };

  // Delete Confirm
  const handleDeleteTask = () => {
    if (!selectedTask) return;
    setTasks(tasks.filter((t) => t.id !== selectedTask.id));
    setIsDeleteOpen(false);
  };

  // Filtering
  const filteredTasks = tasks.filter((task) => {
    const matchesTab = activeTab === "All" || task.status === activeTab;
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getPriorityBadge = (priority: Task["priority"]) => {
    switch (priority) {
      case "High":
        return (
          <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-rose-50 text-rose-600 border border-rose-200">
            High
          </span>
        );
      case "Medium":
        return (
          <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-amber-50 text-amber-600 border border-amber-200">
            Medium
          </span>
        );
      case "Low":
        return (
          <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-slate-100 text-slate-600 border border-slate-200">
            Low
          </span>
        );
    }
  };

  const getStatusBadge = (status: Task["status"]) => {
    switch (status) {
      case "To Do":
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 text-slate-600">
            To Do
          </span>
        );
      case "In Progress":
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-blue-50 text-blue-600 border border-blue-200">
            In Progress
          </span>
        );
      case "Review":
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-purple-50 text-purple-600 border border-purple-200">
            Review
          </span>
        );
      case "Done":
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200">
            Done
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Tasks</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Manage and track your tasks.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Task
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold overflow-x-auto">
            {(["All", "To Do", "In Progress", "Review", "Done"] as const).map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === tab
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {tab}
                </button>
              )
            )}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search task or project..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 bg-white rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Tasks Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Task & Project</th>
                <th className="px-6 py-3.5">Category</th>
                <th className="px-6 py-3.5">Due Date</th>
                <th className="px-6 py-3.5">Priority</th>
                <th className="px-6 py-3.5">Assignee</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <tr
                    key={task.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800 text-sm">
                        {task.title}
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium">
                        {task.project}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-600">
                      {task.category}
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-medium whitespace-nowrap">
                      {task.dueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getPriorityBadge(task.priority)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-700">
                      {task.assignee}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(task.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                      <button
                        onClick={() => handleOpenUpdate(task)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
                        title="Edit Task"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenDelete(task)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                        title="Delete Task"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-10 text-center text-slate-400"
                  >
                    No tasks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Create Task */}
      {isCreateOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full border border-slate-200 shadow-xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-800">
                  Create a new task
                </h2>
                <p className="text-xs text-slate-400">Fill in the task details below.</p>
              </div>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Project *
                  </label>
                  <select
                    value={formProject}
                    onChange={(e) => setFormProject(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-white"
                  >
                    <option value="Website E-Commerce">Website E-Commerce</option>
                    <option value="Mobile Banking App">Mobile Banking App</option>
                    <option value="Workly Tracker">Workly Tracker</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Task Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Enter task name"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Enter task description"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-white"
                  >
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Database">Database</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Due Date *
                  </label>
                  <input
                    type="date"
                    value={formDueDate}
                    onChange={(e) => setFormDueDate(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Priority
                  </label>
                  <select
                    value={formPriority}
                    onChange={(e) =>
                      setFormPriority(e.target.value as "High" | "Medium" | "Low")
                    }
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-white"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Status
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) =>
                      setFormStatus(
                        e.target.value as "To Do" | "In Progress" | "Review" | "Done"
                      )
                    }
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-white"
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Review">Review</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Update Task */}
      {isUpdateOpen && selectedTask && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full border border-slate-200 shadow-xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-800">
                  Update task details
                </h2>
                <p className="text-xs text-slate-400">Update the information below.</p>
              </div>
              <button
                onClick={() => setIsUpdateOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateTask} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Project *
                  </label>
                  <select
                    value={formProject}
                    onChange={(e) => setFormProject(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-white"
                  >
                    <option value="Website E-Commerce">Website E-Commerce</option>
                    <option value="Mobile Banking App">Mobile Banking App</option>
                    <option value="Workly Tracker">Workly Tracker</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Task Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-white"
                  >
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Database">Database</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Priority
                  </label>
                  <select
                    value={formPriority}
                    onChange={(e) =>
                      setFormPriority(e.target.value as "High" | "Medium" | "Low")
                    }
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-white"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Status
                </label>
                <select
                  value={formStatus}
                  onChange={(e) =>
                    setFormStatus(
                      e.target.value as "To Do" | "In Progress" | "Review" | "Done"
                    )
                  }
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-white"
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Review">Review</option>
                  <option value="Done">Done</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsUpdateOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                >
                  Update Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Delete Confirmation */}
      {isDeleteOpen && selectedTask && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full border border-slate-200 shadow-xl text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-800">
                Delete this task?
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to delete{" "}
                <span className="font-bold text-slate-700">
                  "{selectedTask.title}"
                </span>
                ?
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-left text-xs space-y-1">
              <div className="text-slate-400">Project: {selectedTask.project}</div>
              <div className="text-slate-400">Due Date: {selectedTask.dueDate}</div>
              <p className="text-rose-500 text-[11px] font-medium pt-1">
                ⚠️ This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="w-full py-2.5 rounded-xl text-xs font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteTask}
                className="w-full py-2.5 rounded-xl text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700 cursor-pointer shadow-xs"
              >
                Delete Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}