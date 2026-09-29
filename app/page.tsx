import Link from "next/link";
import {
  Clock,
  ChevronDown,
  LayoutDashboard,
  Timer,
  Calendar,
  Play,
  FolderKanban,
  BarChart3,
  Users,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 antialiased font-sans">
      {/* Header / Navbar */}
      <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <Clock className="w-4 h-4" />
            </div>
            <span className="text-xl font-bold text-slate-900">Workly</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-indigo-600 transition">Features</a>
            <a href="#solutions" className="hover:text-indigo-600 transition">Solutions</a>
            <a href="#pricing" className="hover:text-indigo-600 transition">Pricing</a>
            <div className="flex items-center space-x-1 cursor-pointer hover:text-indigo-600 transition">
              <span>Resources</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <a href="#about" className="hover:text-indigo-600 transition">About</a>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/login"
              className="text-sm font-medium text-slate-700 hover:text-indigo-600 px-3 py-2 transition"
      >
              Log in
            </Link>
            <Link href="/register"
              className="text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition shadow-sm"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pt-12 pb-20">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-5 space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1]">
              Track time. <br />
              <span className="text-indigo-600">Get more done.</span>
            </h1>

            <p className="text-base text-slate-600 leading-relaxed max-w-md">
              Workly helps teams track time, manage projects, and boost productivity — all in one place.
            </p>

            <div className="flex items-center space-x-4 pt-2">
              <Link href="/register"
                className="text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition shadow-sm"
              >
                Get Started Free
              </Link>
              <Link
                href="/dashboard"
                className="text-sm font-semibold text-slate-700 bg-white border border-gray-200 hover:bg-gray-50 px-6 py-3 rounded-lg transition"
              >
                View Demo
              </Link>
            </div>

            <div className="pt-8">
              <p className="text-xs text-slate-400 font-medium mb-3">Trusted by modern teams</p>
              <div className="flex items-center space-x-6 opacity-60 grayscale text-slate-600">
                <span className="font-bold text-sm tracking-wider">⚡ Boltshift</span>
                <span className="font-bold text-sm tracking-wider">kanba</span>
                <span className="font-bold text-sm tracking-wider">aven.</span>
                <span className="font-bold text-sm tracking-wider">layers</span>
              </div>
            </div>
          </div>

          {/* Right Hero Image Preview */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-xl shadow-xl border border-gray-200/80 p-4 relative overflow-hidden">
              <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-gray-100">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="text-xs text-gray-400 ml-2 font-mono">workly.app/dashboard</span>
              </div>

              <div className="grid grid-cols-12 gap-4 bg-gray-50 p-4 rounded-lg">
                <div className="col-span-3 bg-white p-3 rounded-lg border border-gray-100 space-y-3">
                  <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xs pb-2 border-b border-gray-100">
                    <Clock className="w-4 h-4" />
                    <span>Workly</span>
                  </div>
                  <div className="space-y-1">
                    <div className="bg-indigo-50 text-indigo-600 text-[11px] font-semibold p-1.5 rounded flex items-center space-x-2">
                      <LayoutDashboard className="w-3.5 h-3.5" />
                      <span>Dashboard</span>
                    </div>
                    <div className="text-gray-500 text-[11px] p-1.5 flex items-center space-x-2">
                      <Timer className="w-3.5 h-3.5" />
                      <span>Time Tracker</span>
                    </div>
                    <div className="text-gray-500 text-[11px] p-1.5 flex items-center space-x-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Calendar</span>
                    </div>
                  </div>
                </div>

                <div className="col-span-9 space-y-3">
                  <div className="bg-white p-3 rounded-lg border border-gray-100 flex justify-between items-center">
                    <div>
                      <div className="text-[10px] text-gray-400 font-medium">This Week Overview</div>
                      <div className="text-base font-bold text-gray-800">32h 42m</div>
                    </div>
                    <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                      <Play className="w-4 h-4 fill-white" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-lg border border-gray-100">
                      <div className="text-[10px] text-gray-400">Tasks Completed</div>
                      <div className="text-sm font-bold text-gray-800">18</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-100">
                      <div className="text-[10px] text-gray-400">Active Projects</div>
                      <div className="text-sm font-bold text-gray-800">6</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="pt-8" id="features">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-900">
              Everything you need <br /> to manage time better
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Time Tracking</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Track time effortlessly with one click timer.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center mb-4">
                <FolderKanban className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Projects & Tasks</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Organize projects, break down tasks, and stay on track.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Reports</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Understand productivity with powerful reports.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Team Management</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Manage your team and collaborate seamlessly.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}