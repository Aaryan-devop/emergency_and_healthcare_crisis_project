import { Moon, Settings, Sun, CheckCircle, Loader2, Save } from "lucide-react";
import { GlassCard } from "../shared/SharedUI";
import { useSettings } from "../../context/SettingsContext";

// ── Settings ───────────────────────────────────────────────────────────
export function SettingsModule({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) {
  const { settings, toggleSetting, saveSettings, saving, lastSaved } = useSettings();

  const handleSave = async () => {
    await saveSettings();
  };

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <h2 className="text-xl font-bold text-theme-text-primary">Settings</h2>
      <GlassCard className="p-5 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-theme-text-primary font-semibold text-sm">Dark Mode</div>
            <div className="text-theme-text-muted text-xs mt-0.5">Toggle application theme</div>
          </div>
          <button onClick={toggleTheme}
            className={`w-12 h-6 rounded-full transition-all duration-300 relative ${isDark ? "bg-blue-600" : "bg-slate-400"}`}>
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
              <div className="text-theme-text-primary font-semibold text-sm">{label}</div>
              <div className="text-theme-text-muted text-xs mt-0.5">{desc}</div>
            </div>
            <div 
              onClick={() => toggleSetting(label as any)}
              className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors duration-300 ${settings[label as keyof typeof settings] ? "bg-blue-600" : "bg-slate-400"}`}
            >
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${settings[label as keyof typeof settings] ? "left-6" : "left-0.5"}`} />
            </div>
          </div>
        ))}
      </GlassCard>
      <div className="flex justify-end items-center gap-4 mt-6">
        {lastSaved && (
          <span className="text-emerald-400 text-sm flex items-center gap-1 animate-pulse">
            <CheckCircle size={14} /> Settings saved successfully
          </span>
        )}
        <button onClick={handleSave} disabled={saving}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white text-sm font-semibold transition-colors flex items-center gap-2">
          {saving ? (
            <>
              <Loader2 size={14} className="animate-spin" /> Saving...
            </>
          ) : (
            <>
              <Save size={14} /> Save Settings
            </>
          )}
        </button>
      </div>
    </div>
  );
}

