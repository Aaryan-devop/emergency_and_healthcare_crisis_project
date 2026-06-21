import { useState } from "react";
import {
  Activity, Ambulance, BedDouble, Brain, Droplets, Filter, Globe, HeartPulse,
  Hospital, LogOut, MapPin, Moon, Phone, Search, Sun, User, Wind, X,
  Navigation, Flame, MessageSquare,
} from "lucide-react";
import { StatusBadge, PulsingDot, GlassCard } from "../components/shared/SharedUI";
import { EmergencyMap } from "../components/shared/EmergencyMap";
import { hospitalData, ambulanceData } from "../data/mockData";

// ── User Portal ────────────────────────────────────────────────────────
export function UserPortal({ onLogout, isDark, toggleTheme }: { onLogout: () => void; isDark: boolean; toggleTheme: () => void }) {
  const [search, setSearch] = useState("");
  const [activeResource, setActiveResource] = useState<string | null>(null);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  function handleSearch(q: string) {
    setSearch(q);
    if (q.length > 0) setHasResults(true);
  }

  function activateEmergency() {
    setEmergencyMode(true);
    setTimeout(() => setEmergencyMode(false), 8000);
  }

  const quickActions = [
    { label: "Find Blood", icon: Droplets, color: "from-red-600 to-red-800", query: "O+ Blood" },
    { label: "ICU Bed", icon: BedDouble, color: "from-blue-600 to-blue-800", query: "ICU Bed" },
    { label: "Ambulance", icon: Ambulance, color: "from-amber-600 to-amber-800", query: "Ambulance" },
    { label: "Oxygen", icon: Wind, color: "from-cyan-600 to-cyan-800", query: "Oxygen Cylinder" },
    { label: "Ventilator", icon: Activity, color: "from-purple-600 to-purple-800", query: "Ventilator" },
    { label: "Nearest Hospital", icon: Hospital, color: "from-emerald-600 to-emerald-800", query: "Hospital" },
  ];

  const searchResults = hospitalData.map(h => ({
    name: h.name,
    blood: "O+",
    units: Math.floor(Math.random() * 100) + 20,
    distance: `${(Math.random() * 8 + 0.5).toFixed(1)} km`,
    contact: h.contact,
    status: h.status,
  }));

  return (
    <div className={`min-h-screen bg-[#050A14] font-sans ${emergencyMode ? "ring-4 ring-red-500 ring-inset" : ""} transition-all`}>
      {/* Emergency overlay */}
      {emergencyMode && (
        <div className="fixed inset-0 z-50 bg-red-950/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setEmergencyMode(false)}>
          <div className="bg-[#0D0505] border-2 border-red-500 rounded-3xl p-8 max-w-lg w-full shadow-2xl shadow-red-500/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center animate-pulse">
                <Flame size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-red-400">EMERGENCY MODE</h2>
                <p className="text-red-600 text-sm">Nearest resources activated</p>
              </div>
              <button onClick={() => setEmergencyMode(false)} className="ml-auto text-slate-500 hover:text-white"><X size={20} /></button>
            </div>
            <div className="space-y-3">
              {[
                { icon: Ambulance, label: "Nearest Ambulance", value: "AMB-005 · Carlos Nkosi · 3 min ETA", color: "text-amber-400" },
                { icon: BedDouble, label: "Nearest ICU Bed", value: "Metro General · 12 available", color: "text-blue-400" },
                { icon: Droplets, label: "Nearest Blood Bank", value: "Metro General · O+ 124 units", color: "text-red-400" },
                { icon: Wind, label: "Nearest Oxygen", value: "Northside Health · 200 cylinders", color: "text-cyan-400" },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="flex items-center gap-3 p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                  <Icon size={18} className={color} />
                  <div>
                    <div className="text-slate-300 text-xs">{label}</div>
                    <div className={`text-sm font-semibold ${color}`}>{value}</div>
                  </div>
                  <button className="ml-auto p-1.5 rounded-lg bg-red-600 hover:bg-red-500 transition-colors">
                    <Phone size={13} className="text-white" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#070E1C]/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <HeartPulse size={16} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-white font-bold text-sm">LifeLink</span>
              <span className="text-blue-400 text-xs font-mono ml-2">STAFF PORTAL</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-all">
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button onClick={onLogout} className="flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white text-sm transition-colors">
              <LogOut size={15} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Hero search */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-emerald-400 text-xs font-mono mb-4">
            <PulsingDot color="bg-emerald-400" />
            284 hospitals online · Real-time data
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Find Emergency<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Resources Now</span>
          </h1>
          <p className="text-slate-400 text-base max-w-md mx-auto">Instant access to beds, blood, ambulances, and oxygen across the city network.</p>
          <div className="relative max-w-2xl mx-auto">
            <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              value={search}
              onChange={e => handleSearch(e.target.value)}
              placeholder="What emergency resource are you looking for?"
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-32 py-4 text-white text-base placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-white text-sm font-semibold hover:from-blue-500 hover:to-blue-600 transition-all flex items-center gap-2">
              <Search size={14} />
              Search
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-2 text-xs text-slate-500">
            {["O+ Blood", "ICU Bed", "Ventilator", "Ambulance", "Oxygen Cylinder"].map(ex => (
              <button key={ex} onClick={() => handleSearch(ex)}
                className="bg-white/5 border border-white/8 rounded-lg px-3 py-1.5 hover:text-white hover:bg-white/10 transition-all">
                {ex}
              </button>
            ))}
          </div>
        </div>

        {/* Quick action cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {quickActions.map(({ label, icon: Icon, color, query }) => (
            <button key={label} onClick={() => handleSearch(query)}
              className="group flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/8 hover:bg-white/8 hover:border-white/15 transition-all duration-200 active:scale-[0.97]">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}>
                <Icon size={20} className="text-white" />
              </div>
              <span className="text-slate-300 text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>

        {/* Search results */}
        {hasResults && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-bold text-lg">
                Results for "{search}"
                <span className="text-slate-500 font-normal text-sm ml-2">{searchResults.length} facilities found</span>
              </h2>
              <button className="flex items-center gap-2 text-slate-400 text-sm hover:text-white transition-colors">
                <Filter size={14} />
                Filter
              </button>
            </div>

            {/* AI recommendations banner */}
            <GlassCard className="p-4 border-purple-500/20 bg-purple-500/5">
              <div className="flex items-center gap-3 mb-3">
                <Brain size={18} className="text-purple-400" />
                <span className="text-white font-semibold text-sm">AI Smart Recommendations</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Best Match", value: "Metro General", sub: "Highest availability", color: "text-purple-400" },
                  { label: "Nearest", value: "Downtown Trauma", sub: "1.2 km away", color: "text-blue-400" },
                  { label: "Fastest", value: "AMB-005 · 3 min", sub: "Via Central Ave", color: "text-amber-400" },
                  { label: "Most Available", value: "Northside Health", sub: "200+ cylinders", color: "text-emerald-400" },
                ].map(({ label, value, sub, color }) => (
                  <div key={label} className="bg-white/5 rounded-xl p-3">
                    <div className="text-slate-500 text-[10px] mb-1">{label}</div>
                    <div className={`text-sm font-bold ${color}`}>{value}</div>
                    <div className="text-slate-600 text-[10px] mt-0.5">{sub}</div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <div className="space-y-3">
              {searchResults.map((r, i) => (
                <GlassCard key={i} className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-white font-semibold text-sm">{r.name}</h3>
                        <StatusBadge status={r.status} />
                      </div>
                      <div className="flex flex-wrap gap-4 text-xs text-slate-400 mt-2">
                        <span className="flex items-center gap-1"><Droplets size={11} className="text-red-400" />Blood {r.blood}: <span className="text-white font-mono">{r.units} units</span></span>
                        <span className="flex items-center gap-1"><MapPin size={11} className="text-blue-400" />{r.distance}</span>
                        <span className="flex items-center gap-1"><Phone size={11} className="text-slate-500" />{r.contact}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button className="p-2 rounded-xl bg-emerald-600/20 border border-emerald-600/30 text-emerald-400 hover:bg-emerald-600/30 transition-all">
                        <Phone size={14} />
                      </button>
                      <button className="p-2 rounded-xl bg-blue-600/20 border border-blue-600/30 text-blue-400 hover:bg-blue-600/30 transition-all">
                        <MessageSquare size={14} />
                      </button>
                      <button className="p-2 rounded-xl bg-amber-600/20 border border-amber-600/30 text-amber-400 hover:bg-amber-600/30 transition-all">
                        <Navigation size={14} />
                      </button>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {/* Map + Ambulance booking */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <GlassCard className="p-4 h-72">
              <div className="flex items-center gap-2 mb-3">
                <Globe size={15} className="text-blue-400" />
                <span className="text-white font-semibold text-sm">Nearby Resources Map</span>
              </div>
              <EmergencyMap />
            </GlassCard>
          </div>
          <GlassCard className="p-5">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Ambulance size={16} className="text-amber-400" />
              Book Ambulance
            </h3>
            <div className="space-y-3 mb-4">
              {ambulanceData.filter(a => a.status === "available").slice(0, 2).map(amb => (
                <div key={amb.id} className="p-3 bg-white/3 rounded-xl border border-white/5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white font-mono font-bold text-sm">{amb.id}</span>
                    <span className="text-emerald-400 text-xs font-mono">{amb.eta}</span>
                  </div>
                  <div className="text-slate-400 text-xs">{amb.driver}</div>
                  <div className="text-slate-600 text-xs mt-1 flex items-center gap-1"><MapPin size={10} />{amb.location}</div>
                </div>
              ))}
            </div>
            <button className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all">
              <Ambulance size={15} />
              Request Nearest Ambulance
            </button>
          </GlassCard>
        </div>
      </main>

      {/* Emergency FAB */}
      <button
        onClick={activateEmergency}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center font-bold transition-all duration-200 active:scale-95 z-30 ${
          emergencyMode
            ? "bg-red-600 animate-ping"
            : "bg-gradient-to-br from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 shadow-red-600/50 animate-pulse"
        }`}
      >
        <div className="flex flex-col items-center">
          <Flame size={22} className="text-white" />
          <span className="text-white text-[8px] font-bold mt-0.5">SOS</span>
        </div>
      </button>
    </div>
  );
}

