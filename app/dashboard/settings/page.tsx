"use client";

import React, { useState } from "react";
import { User, Building2, Save, Mail, Phone, MapPin, Shield } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "organisation">("profile");

  // Profile Form State
  const [name, setName] = useState("Putri Nisa Rengganis");
  const [email, setEmail] = useState("putri.nisa@example.com");
  const [phone, estejaPhone] = useState("+62 812-3456-7890");
  const [location, setLocation] = useState("Sumedang, West Java, Indonesia");

  // Organisation Form State
  const [orgName, setOrgName] = useState("PT Inovasi Mitra Sejati");
  const [orgAddress, setOrgAddress] = useState("Bandung, West Java, Indonesia");

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile changes saved successfully!");
  };

  const handleSaveOrg = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Organisation settings updated successfully!");
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Manage your account profile and organisation preferences.
        </p>

        {/* Settings Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6 border-b border-slate-100 pb-0">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 pb-3 px-1 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === "profile"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <User className="w-4 h-4" /> Profile Information
          </button>
          <button
            onClick={() => setActiveTab("organisation")}
            className={`flex items-center gap-2 pb-3 px-1 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === "organisation"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Building2 className="w-4 h-4" /> Organisation Settings
          </button>
        </div>
      </div>

      {/* Tab Content: Profile Information */}
      {activeTab === "profile" && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover border-2 border-slate-200 shadow-xs"
            />
            <div>
              <h2 className="text-base font-bold text-slate-800">{name}</h2>
              <p className="text-xs text-slate-400 font-medium">
                Front-End Developer &middot; Joined August 2025
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => estejaPhone(e.target.value)}
                    className="w-full text-xs pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full text-xs pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                type="submit"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
              >
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab Content: Organisation Settings */}
      {activeTab === "organisation" && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-bold text-xl">
              IMS
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">{orgName}</h2>
              <p className="text-xs text-slate-400 font-medium">
                Workspace ID: #IMS-88290 &middot; 4 Active Members
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveOrg} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Organisation Name
                </label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  HQ Address
                </label>
                <input
                  type="text"
                  value={orgAddress}
                  onChange={(e) => setOrgAddress(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                type="submit"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
              >
                <Save className="w-4 h-4" /> Save Organisation
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}