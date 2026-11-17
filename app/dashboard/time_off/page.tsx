"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  X,
  FileText,
} from "lucide-react";

interface TimeOffRequest {
  id: string;
  type: "Annual Leave" | "Sick Leave" | "Unpaid Leave" | "Remote / WFH";
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: "Approved" | "Pending" | "Rejected";
}

export default function TimeOffPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock Data Time Off Requests
  const [requests, setRequests] = useState<TimeOffRequest[]>([
    {
      id: "1",
      type: "Annual Leave",
      startDate: "12 Aug 2026",
      endDate: "14 Aug 2026",
      days: 3,
      reason: "Acara keluarga di luar kota.",
      status: "Approved",
    },
    {
      id: "2",
      type: "Sick Leave",
      startDate: "02 Sep 2026",
      endDate: "02 Sep 2026",
      days: 1,
      reason: "Demam dan butuh istirahat.",
      status: "Approved",
    },
    {
      id: "3",
      type: "Annual Leave",
      startDate: "20 Oct 2026",
      endDate: "22 Oct 2026",
      days: 3,
      reason: "Liburan tahunan.",
      status: "Pending",
    },
  ]);

  // Form State
  const [formType, setFormType] = useState<
    "Annual Leave" | "Sick Leave" | "Unpaid Leave" | "Remote / WFH"
  >("Annual Leave");
  const [formStartDate, setFormStartDate] = useState("");
  const [formEndDate, setFormEndDate] = useState("");
  const [formReason, setFormReason] = useState("");

  const handleOpenModal = () => {
    setFormType("Annual Leave");
    setFormStartDate("");
    setFormEndDate("");
    setFormReason("");
    setIsModalOpen(true);
  };

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formStartDate || !formEndDate) return;

    const newReq: TimeOffRequest = {
      id: Date.now().toString(),
      type: formType,
      startDate: formStartDate,
      endDate: formEndDate,
      days: 2, // Default calculation
      reason: formReason,
      status: "Pending",
    };

    setRequests([newReq, ...requests]);
    setIsModalOpen(false);
  };

  const filteredRequests = requests.filter(
    (req) =>
      req.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: TimeOffRequest["status"]) => {
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
      case "Rejected":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3.5 h-3.5" /> Rejected
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Time Off</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Request leave and view your balance and history.
          </p>
        </div>

        <button
          onClick={handleOpenModal}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Request Time Off
        </button>
      </div>

      {/* Leave Balance Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <p className="text-xs font-semibold text-slate-400">Annual Leave Balance</p>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-800">8 Days</span>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
              Total 12 Days
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <p className="text-xs font-semibold text-slate-400">Used This Year</p>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-emerald-600">4 Days</span>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              2 Requests Approved
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <p className="text-xs font-semibold text-slate-400">Pending Requests</p>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-amber-600">1 Request</span>
            <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
              3 Days
            </span>
          </div>
        </div>
      </div>

      {/* History Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search time off type or reason..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 bg-white rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Type</th>
                <th className="px-6 py-3.5">Date Range</th>
                <th className="px-6 py-3.5">Duration</th>
                <th className="px-6 py-3.5">Reason</th>
                <th className="px-6 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">
                      {req.type}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-600 whitespace-nowrap">
                      {req.startDate} - {req.endDate}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-700 whitespace-nowrap">
                      {req.days} Day{req.days > 1 ? "s" : ""}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-500 max-w-xs truncate">
                      {req.reason}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(req.status)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-400">
                    No time off requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Request Time Off */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-slate-200 shadow-xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-800">
                  Request Time Off
                </h2>
                <p className="text-xs text-slate-400">
                  Submit a leave request for approval.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRequest} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Leave Type *
                </label>
                <select
                  value={formType}
                  onChange={(e) =>
                    setFormType(
                      e.target.value as
                        | "Annual Leave"
                        | "Sick Leave"
                        | "Unpaid Leave"
                        | "Remote / WFH"
                    )
                  }
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-white"
                >
                  <option value="Annual Leave">Annual Leave</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Unpaid Leave">Unpaid Leave</option>
                  <option value="Remote / WFH">Remote / WFH</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formStartDate}
                    onChange={(e) => setFormStartDate(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    End Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formEndDate}
                    onChange={(e) => setFormEndDate(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Reason / Notes
                </label>
                <textarea
                  rows={3}
                  value={formReason}
                  onChange={(e) => setFormReason(e.target.value)}
                  placeholder="Explain why you are requesting time off..."
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}