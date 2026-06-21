import { useState } from "react";
import {
  Ambulance, BedDouble, Droplets, HeartPulse, Hospital, LogIn, Shield, User, CheckCircle,
} from "lucide-react";
import { EmergencyMap } from "../components/shared/EmergencyMap";

// ── Login Page ─────────────────────────────────────────────────────────
export function LoginPage({ onLogin }: { onLogin: (role: "admin" | "user") => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loginType, setLoginType] = useState<"admin" | "user">("admin");

  return (
    <div className="min-h-screen w-full flex overflow-hidden bg-[#050A14] font-sans">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col w-1/2 relative overflow-hidden p-12">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-[#060D1F] to-slate-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.15)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(239,68,68,0.08)_0%,transparent_60%)]" />
        {/* Grid overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          {Array.from({ length: 20 }).map((_, i) => (
            <g key={i}>
              <line x1={i * 5} y1={0} x2={i * 5} y2={100} stroke="#3B82F6" strokeWidth="0.3" />
              <line x1={0} y1={i * 5} x2={100} y2={i * 5} stroke="#3B82F6" strokeWidth="0.3" />
            </g>
          ))}
        </svg>

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3 mb-auto">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <HeartPulse size={22} className="text-white" />
          </div>
          <div>
            <div className="text-white font-bold text-lg tracking-tight leading-none">LifeLink</div>
            <div className="text-blue-400 text-xs font-mono">EMERGENCY NETWORK</div>
          </div>
        </div>

        {/* Tagline */}
        <div className="relative z-10 my-12">
          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            Saving Lives Through<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Real-Time Resource
            </span><br />Connectivity
          </h1>
          <p className="text-slate-400 text-base leading-relaxed max-w-md">
            Enterprise-grade emergency healthcare coordination across the entire city network — beds, blood, ambulances, and oxygen — in one unified platform.
          </p>
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-2 gap-3 mb-12">
          {[
            { icon: Hospital, label: "Active Hospitals", value: "284", color: "text-blue-400" },
            { icon: BedDouble, label: "Available Beds", value: "1,847", color: "text-emerald-400" },
            { icon: Ambulance, label: "Active Ambulances", value: "412", color: "text-amber-400" },
            { icon: Droplets, label: "Blood Units", value: "9,320", color: "text-red-400" },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="backdrop-blur-xl bg-white/5 border border-white/8 rounded-xl p-4">
              <Icon size={16} className={`${color} mb-2`} />
              <div className={`text-2xl font-bold ${color} font-mono tracking-tight`}>{value}</div>
              <div className="text-slate-500 text-xs mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Map preview */}
        <div className="relative z-10 rounded-xl overflow-hidden flex-1 min-h-[160px]">
          <EmergencyMap compact />
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 to-[#050A14]" />
        <div className="relative z-10 w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <HeartPulse size={20} className="text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-lg">LifeLink</div>
              <div className="text-blue-400 text-xs font-mono">EMERGENCY NETWORK</div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">Welcome back</h2>
          <p className="text-slate-400 text-sm mb-8">Secure access to the emergency resource network</p>

          {/* Login type toggle */}
          <div className="flex rounded-xl overflow-hidden border border-white/10 mb-6 p-1 bg-white/5">
            {(["admin", "user"] as const).map(type => (
              <button
                key={type}
                onClick={() => setLoginType(type)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  loginType === type
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {type === "admin" ? <Shield size={15} /> : <User size={15} />}
                {type === "admin" ? "Admin Portal" : "Hospital Staff"}
              </button>
            ))}
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="text-slate-300 text-sm font-semibold block mb-1.5">Email Address</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={loginType === "admin" ? "admin@lifelink.health" : "staff@hospital.org"}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="text-slate-300 text-sm font-semibold block mb-1.5">Password</label>
              <div className="relative">
                <Shield size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  onClick={() => setRemember(!remember)}
                  className={`w-5 h-5 rounded border transition-all flex items-center justify-center ${remember ? "bg-blue-600 border-blue-600" : "border-white/20 bg-white/5"}`}
                >
                  {remember && <CheckCircle size={12} className="text-white" />}
                </div>
                <span className="text-slate-400 text-sm">Remember me</span>
              </label>
              <button className="text-blue-400 text-sm hover:text-blue-300 transition-colors">Forgot password?</button>
            </div>
          </div>

          <button
            onClick={() => onLogin(loginType)}
            className="w-full mt-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all duration-200 active:scale-[0.98]"
          >
            <LogIn size={16} />
            Sign In to {loginType === "admin" ? "Admin Portal" : "Staff Portal"}
          </button>

          {/* Security badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-slate-600 text-xs">
            <Shield size={12} />
            <span>256-bit SSL encrypted · HIPAA compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
}

