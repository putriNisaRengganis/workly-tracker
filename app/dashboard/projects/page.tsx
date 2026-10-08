"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  AlertTriangle,
  Folder,
  Calendar,
  CheckCircle2,
  Users,
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  client: string;
  startDate: string;
  dueDate: string;
  status: "In Progress" | "Planning" | "Completed" | "On Hold";
  progress: number; // 0 - 100
  tasksCount: number;
  color: string; // Tailind bg class for tag
  members: string[];
}

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All Status");

  // Modal States
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Initial Mock Data (disesuaikan dengan mockup Workly)
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "Website E-Commerce",
      description: "Pengembangan website e-commerce untuk toko pakaian online.",
      client: "Budi Store",
      startDate: "01 Aug 2026",
      dueDate: "25 Aug 2026",
      status: "In Progress",
      progress: 68,
      tasksCount: 12,
      color: "bg-blue-500",
      members: ["Putri Nisa", "Fikri S."],
    },
    {
      id: "2",
      name: "Mobile Banking App",
      description: "Aplikasi mobile banking untuk nasabah bank daerah.",
      client: "Bank Fintech",
      startDate: "10 Aug 2026",
      dueDate: "30 Sep 2026",
      status: "In Progress",
      progress: 42,
      tasksCount: 18,
      color: "bg-indigo-500",
      members: ["Putri Nisa", "Fikri S.", "Teh Alya"],
    },
    {
      id: "3",
      name: "Internal Tools",
      description: "Dashboard internal manajemen stok dan laporan penjualan.",
      client: "Internal Team",
      startDate: "15 Jul 2026",
      dueDate: "10 Aug 2026",
      status: "Completed",
      progress: 100,
      tasksCount: 8,
      color: "bg-emerald-500",
      members: ["Putri Nisa"],
    },
    {
      id: "4",
      name: "Marketing Website",
      description: "Landing page dan profil perusahaan untuk campaign produk baru.",
      client: "Shaka Agency",
      startDate: "01 Sep 2026",
      dueDate: "15 Oct 2026",
      status: "Planning",
      progress: 15,
      tasksCount: 6,
      color: "bg-amber-500",
      members: ["Putri Nisa", "Teh Alya"],
    },
  ]);

  // Form State
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formClient, setFormClient] = useState("");
  const [formStartDate, setFormStartDate] = useState("2026-08-01");
  const [formDueDate, setFormDueDate] = useState("2026-08-25");
  const [formStatus, setFormStatus] = useState<
    "In Progress" | "Planning" | "Completed" | "On Hold"
  >("In Progress");
  const [formColor, setFormColor] = useState("bg-blue-500");

  const colorOptions = [
    { label: "Blue", value: "bg-blue-500" },
    { label: "Indigo", value: "bg-indigo-500" },
    { label: "Emerald", value: "bg-emerald-500" },
    { label: "Amber", value: "bg-amber-500" },
    { label: "Rose", value: "bg-rose-500" },
    { label: "Purple", value: "bg-purple-500" },
  ];

  // Handlers
  const handleOpenCreate = () => {
    setFormName("");
    setFormDescription("");
    setFormClient("");
    setFormStartDate("2026-08-01");
    setFormDueDate("2026-08-25");
    setFormStatus("In Progress");
    setFormColor("bg-blue-500");
    setIsCreateOpen(true);
  };

  const handleOpenUpdate = (project: Project) => {
    setSelectedProject(project);
    setFormName(project.name);
    setFormDescription(project.description);
    setFormClient(project.client);
    setFormStartDate("2026-08-01");
    setFormDueDate("2026-08-25");
    setFormStatus(project.status);
    setFormColor(project.color);
    setIsUpdateOpen(true);
  };

  const handleOpenDelete = (project: Project) => {
    setSelectedProject(project);
    setIsDeleteOpen(true);
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName) return;

    const newProject: Project = {
      id: Date.now().toString(),
      name: formName,
      description: formDescription,
      client: formClient || "Client",
      startDate: "01 Aug 2026",
      dueDate: "25 Aug 2026",
      status: formStatus,
      progress: formStatus === "Completed" ? 100 : 0,
      tasksCount: 0,
      color: formColor,
      members: ["Putri Nisa"],
    };

    setProjects([newProject, ...projects]);
    setIsCreateOpen(false);
  };

  const handleUpdateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;

    setProjects(
      projects.map((p) =>
        p.id === selectedProject.id
          ? {
              ...p,
              name: formName,
              description: formDescription,
              client: formClient,
              status: formStatus,
              color: formColor,
              progress: formStatus === "Completed" ? 100 : p.progress,
            }
          : p
      )
    );
    setIsUpdateOpen(false);
  };

  const handleDeleteProject = () => {
    if (!selectedProject) return;
    setProjects(projects.filter((p) => p.id !== selectedProject.id));
    setIsDeleteOpen(false);
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All Status" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Project["status"]) => {
    switch (status) {
      case "In Progress":
        return (
          <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-blue-50 text-blue-600 border border-blue-200">
            In Progress
          </span>
        );
      case "Planning":
        return (
          <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-amber-50 text-amber-600 border border-amber-200">
            Planning
          </span>
        );
      case "Completed":
        return (
          <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200">
            Completed
          </span>
        );
      case "On Hold":
        return (
          <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-slate-100 text-slate-600 border border-slate-200">
            On Hold
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Projects</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Manage your project portfolio and track progress.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" /> New Project
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects or clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-xs font-semibold text-slate-500 whitespace-nowrap">
            Filter:
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 font-medium focus:outline-none focus:border-blue-500 w-full sm:w-auto"
          >
            <option value="All Status">All Status</option>
            <option value="In Progress">In Progress</option>
            <option value="Planning">Planning</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              {/* Card Header */}
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3.5 h-3.5 rounded-full ${project.color}`}
                    />
                    <div>
                      <h3 className="font-bold text-slate-800 text-base">
                        {project.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-medium">
                        Client: {project.client}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(project.status)}
                </div>

                <p className="text-xs text-slate-600 mt-3 line-clamp-2">
                  {project.description}
                </p>
              </div>

              {/* Progress Section */}
              <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-600">
                  <span>Progress</span>
                  <span className="text-blue-600 font-bold">
                    {project.progress}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-4 text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                    {project.tasksCount} Tasks
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {project.dueDate}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenUpdate(project)}
                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
                    title="Edit Project"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleOpenDelete(project)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-white p-12 rounded-2xl border border-slate-200 text-center text-slate-400 space-y-2">
            <Folder className="w-8 h-8 mx-auto text-slate-300" />
            <p className="text-sm font-medium">No projects found.</p>
          </div>
        )}
      </div>

      {/* Modal: Create Project */}
      {isCreateOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full border border-slate-200 shadow-xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-800">
                  Projects - Create
                </h2>
                <p className="text-xs text-slate-400">
                  Create a new project workspace.
                </p>
              </div>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Project Name *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Enter project name"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Enter project description"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={formClient}
                    onChange={(e) => setFormClient(e.target.value)}
                    placeholder="Select or enter client"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Status
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) =>
                      setFormStatus(
                        e.target.value as
                          | "In Progress"
                          | "Planning"
                          | "Completed"
                          | "On Hold"
                      )
                    }
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-white"
                  >
                    <option value="In Progress">In Progress</option>
                    <option value="Planning">Planning</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formStartDate}
                    onChange={(e) => setFormStartDate(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={formDueDate}
                    onChange={(e) => setFormDueDate(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Color Tag Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2">
                  Color Tag
                </label>
                <div className="flex items-center gap-3">
                  {colorOptions.map((c) => (
                    <button
                      type="button"
                      key={c.value}
                      onClick={() => setFormColor(c.value)}
                      className={`w-6 h-6 rounded-full ${c.value} transition-all cursor-pointer ${
                        formColor === c.value
                          ? "ring-2 ring-offset-2 ring-blue-600 scale-110"
                          : "opacity-80 hover:opacity-100"
                      }`}
                    />
                  ))}
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
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Update Project */}
      {isUpdateOpen && selectedProject && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full border border-slate-200 shadow-xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-800">
                  Projects - Update
                </h2>
                <p className="text-xs text-slate-400">Update project details.</p>
              </div>
              <button
                onClick={() => setIsUpdateOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Project Name *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                />
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
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={formClient}
                    onChange={(e) => setFormClient(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Status
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) =>
                      setFormStatus(
                        e.target.value as
                          | "In Progress"
                          | "Planning"
                          | "Completed"
                          | "On Hold"
                      )
                    }
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-white"
                  >
                    <option value="In Progress">In Progress</option>
                    <option value="Planning">Planning</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                </div>
              </div>

              {/* Color Tag Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2">
                  Color Tag
                </label>
                <div className="flex items-center gap-3">
                  {colorOptions.map((c) => (
                    <button
                      type="button"
                      key={c.value}
                      onClick={() => setFormColor(c.value)}
                      className={`w-6 h-6 rounded-full ${c.value} transition-all cursor-pointer ${
                        formColor === c.value
                          ? "ring-2 ring-offset-2 ring-blue-600 scale-110"
                          : "opacity-80 hover:opacity-100"
                      }`}
                    />
                  ))}
                </div>
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
                  Update Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Delete Confirmation */}
      {isDeleteOpen && selectedProject && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full border border-slate-200 shadow-xl text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-800">
                Delete this project?
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to delete{" "}
                <span className="font-bold text-slate-700">
                  "{selectedProject.name}"
                </span>
                ?
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-left text-xs space-y-1">
              <div className="text-slate-400">
                Client: {selectedProject.client}
              </div>
              <div className="text-slate-400">
                Due Date: {selectedProject.dueDate}
              </div>
              <p className="text-rose-500 text-[11px] font-medium pt-1">
                ⚠️ All related tasks will also be removed.
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
                onClick={handleDeleteProject}
                className="w-full py-2.5 rounded-xl text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700 cursor-pointer shadow-xs"
              >
                Delete Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}