import { useState } from "react";
import {
  Activity, Bell, BookOpen, HeartPulse, Menu, Moon, Package, Sun, Wind,
} from "lucide-react";
import type { AdminTab } from "../types";
import { PulsingDot, GlassCard } from "../components/shared/SharedUI";
import { EmergencyMap } from "../components/shared/EmergencyMap";
import { AdminSidebar } from "../components/admin/AdminSidebar";
import { AdminDashboardContent } from "../components/admin/AdminDashboardContent";
import { HospitalModule } from "../components/admin/HospitalModule";
import { BloodBankModule } from "../components/admin/BloodBankModule";
import { BedModule } from "../components/admin/BedModule";
import { AmbulanceModule } from "../components/admin/AmbulanceModule";
import { EmergencyModule } from "../components/admin/EmergencyModule";
import { AIModule } from "../components/admin/AIModule";
import { AnalyticsModule } from "../components/admin/AnalyticsModule";
import { NotificationsModule } from "../components/admin/NotificationsModule";
import { SettingsModule } from "../components/admin/SettingsModule";

// ── Admin Portal ───────────────────────────────────────────────────────
export function AdminPortal({ onLogout, isDark, toggleTheme }: { onLogout: () => void; isDark: boolean; toggleTheme: () => void }) {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  const contentMap: Record<AdminTab, React.ReactNode> = {
    dashboard: <AdminDashboardContent />,
    hospitals: <HospitalModule />,
    blood: <BloodBankModule />,
    beds: <BedModule />,
    ambulance: <AmbulanceModule />,
    oxygen: (
      <div className="p-6 space-y-4">
        <h2 className="text-xl font-bold text-white">Oxygen & Equipment Inventory</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { icon: Wind, label: "Oxygen Cylinders", value: 3214, unit: "units", color: "from-cyan-600 to-cyan-800" },
            { icon: Activity, label: "Ventilators", value: 124, unit: "units", color: "from-blue-600 to-blue-800" },
            { icon: HeartPulse, label: "Defibrillators", value: 89, unit: "units", color: "from-red-600 to-red-800" },
            { icon: Activity, label: "ECG Machines", value: 212, unit: "units", color: "from-purple-600 to-purple-800" },
            { icon: Package, label: "Dialysis Machines", value: 47, unit: "units", color: "from-emerald-600 to-emerald-800" },
            { icon: BookOpen, label: "Emergency Medicines", value: 8941, unit: "items", color: "from-amber-600 to-amber-800" },
          ].map(({ icon: Icon, label, value, unit, color }) => (
            <GlassCard key={label} className="p-5">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3`}>
                <Icon size={18} className="text-white" />
              </div>
              <div className="text-2xl font-bold font-mono text-white">{value.toLocaleString()}</div>
              <div className="text-slate-500 text-xs mt-0.5">{unit}</div>
              <div className="text-slate-300 text-sm font-medium mt-2">{label}</div>
            </GlassCard>
          ))}
        </div>
      </div>
    ),
    emergency: <EmergencyModule />,
    ai: <AIModule />,
    map: (
      <div className="p-6 h-full flex flex-col gap-4">
        <h2 className="text-xl font-bold text-white">Map Monitoring</h2>
        <div className="flex-1 min-h-[500px]">
          <GlassCard className="h-full p-4">
            <EmergencyMap />
          </GlassCard>
        </div>
      </div>
    ),
    analytics: <AnalyticsModule />,
    notifications: <NotificationsModule />,
    settings: <SettingsModule isDark={isDark} toggleTheme={toggleTheme} />,
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#050A14] font-sans">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} collapsed={collapsed} onLogout={onLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-5 flex-shrink-0 bg-[#070E1C]/80 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <button onClick={() => setCollapsed(!collapsed)} className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-all">
              <Menu size={18} />
            </button>
            <div>
              <span className="text-white font-semibold capitalize">{activeTab.replace(/-/g, " ")}</span>
              <span className="text-slate-600 text-xs font-mono ml-2">/ Admin Portal</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-2.5 py-1.5">
              <PulsingDot color="bg-emerald-400" />
              <span className="hidden sm:inline">System Online</span>
            </div>
            <button onClick={toggleTheme} className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-all">
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button onClick={() => setActiveTab("notifications")} className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-all relative">
              <Bell size={17} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-bold">A</div>
          </div>
        </header>
        {/* Content */}
        <main className="flex-1 overflow-y-auto scrollbar-hide">
          {contentMap[activeTab]}
        </main>
      </div>
    </div>
  );
}

