"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Clock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Hubungkan dengan Backend API Login di sini nanti
    console.log("Login submitted:", { email, password });
    
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-2xl font-bold text-slate-900">Workly</span>
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-900 text-center mb-2">
          Masuk ke Akun Anda
        </h2>
        <p className="text-xs text-slate-500 text-center mb-6">
          Masukkan email dan kata sandi Anda untuk melanjutkan
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="w-full px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="w-full px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-lg transition duration-200 shadow-sm"
          >
            Log In
          </button>
        </form>

        <p className="text-xs text-center text-slate-500 mt-6">
          Belum punya akun?{" "}
          <Link href="/register" className="text-indigo-600 font-semibold hover:underline">
            Daftar Sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}