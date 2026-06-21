import { Moon, Settings, Sun } from "lucide-react";
import { GlassCard } from "../shared/SharedUI";

// ── Settings ───────────────────────────────────────────────────────────
export function SettingsModule({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) {
  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <h2 className="text-xl font-bold text-white">Settings</h2>
      <GlassCard className="p-5 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white font-semibold text-sm">Dark Mode</div>
            <div className="text-slate-500 text-xs mt-0.5">Toggle application theme</div>
          </div>
          <button onClick={toggleTheme}
            className={`w-12 h-6 rounded-full transition-all duration-300 relative ${isDark ? "bg-blue-600" : "bg-slate-600"}`}>
            <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 flex items-center justify-center ${isDark ? "left-6" : "left-0.5"}`}>
              {isDark ? <Moon size={10} className="text-blue-600" /> : <Sun size={10} className="text-amber-500" />}
            </span>
          </button>
        </div>
        {[
          { label: "Real-time Updates", desc: "Auto-refresh resource data every 30s" },
          { label: "Emergency Alerts", desc: "Push notifications for critical events" },
          { label: "GPS Tracking", desc: "Enable live ambulance GPS" },
          { label: "AI Auto-Recommend", desc: "Automatic AI resource suggestions" },
        ].map(({ label, desc }) => (
          <div key={label} className="flex items-center justify-between">
            <div>
              <div className="text-white font-semibold text-sm">{label}</div>
              <div className="text-slate-500 text-xs mt-0.5">{desc}</div>
            </div>
            <div className="w-12 h-6 rounded-full bg-blue-600 relative cursor-pointer">
              <span className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow" />
            </div>
          </div>
        ))}
      </GlassCard>
    </div>
  );
}

