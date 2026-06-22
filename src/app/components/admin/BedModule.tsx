import { Hospital } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { StatusBadge, GlassCard } from "../shared/SharedUI";
import { bedPieData } from "../../data/mockData";
import { useData } from "../../api/hooks";

// ── Bed Module ─────────────────────────────────────────────────────────
export function BedModule() {
  const { data: hospitalData } = useData('/hospitals');

  const tooltipStyle = {
    background: "var(--theme-tooltip-bg)",
    border: "1px solid var(--theme-tooltip-border)",
    borderRadius: "12px",
    color: "var(--theme-tooltip-text)",
    fontSize: "12px",
  };

  const stats = [
    { label: "ICU Available", value: 412, max: 680, color: "#10B981" },
    { label: "ICU Occupied", value: 268, max: 680, color: "#EF4444" },
    { label: "Gen. Available", value: 1435, max: 2200, color: "#3B82F6" },
    { label: "Gen. Occupied", value: 765, max: 2200, color: "#F59E0B" },
    { label: "Emergency Beds", value: 89, max: 120, color: "#8B5CF6" },
  ];
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold text-theme-text-primary">Bed Management Dashboard</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {stats.map(s => (
            <GlassCard key={s.label} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-theme-text-secondary text-sm font-medium">{s.label}</span>
                <span className="font-mono font-bold text-theme-text-primary">{s.value}<span className="text-theme-text-muted text-xs">/{s.max}</span></span>
              </div>
              <div className="h-2 bg-theme-bg-card rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${(s.value / s.max) * 100}%`, background: s.color }} />
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                <span className="text-xs text-theme-text-muted font-mono">{Math.round((s.value / s.max) * 100)}% utilized</span>
              </div>
            </GlassCard>
          ))}
        </div>
        <GlassCard className="p-4 flex flex-col">
          <h3 className="text-theme-text-primary font-semibold mb-4">Bed Occupancy Overview</h3>
          <div className="flex-1 flex items-center justify-center">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={bedPieData} cx="50%" cy="50%" innerRadius={70} outerRadius={110}
                  paddingAngle={3} dataKey="value">
                  {bedPieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} opacity={0.85} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: "12px", color: "var(--theme-text-secondary)" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>
      {/* Hospital bed table */}
      <GlassCard>
        <div className="p-4 border-b border-theme-border-light">
          <h3 className="text-theme-text-primary font-semibold">Hospital-wise Bed Status</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-theme-border-light">
                {["Hospital", "ICU Available", "ICU Occupied", "Gen. Available", "Gen. Occupied", "Status"].map(h => (
                  <th key={h} className="text-left text-theme-text-muted font-mono text-xs px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(hospitalData || []).map((h: any) => (
                <tr key={h.id} className="border-b border-theme-border-light hover:bg-theme-table-hover transition-colors">
                  <td className="px-4 py-3 text-theme-text-primary font-medium text-xs">{h.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-emerald-400">{h.icu}</td>
                  <td className="px-4 py-3 font-mono text-xs text-red-400">{Math.max(0, 25 - h.icu)}</td>
                  <td className="px-4 py-3 font-mono text-xs text-blue-400">{h.general}</td>
                  <td className="px-4 py-3 font-mono text-xs text-amber-400">{Math.max(0, 100 - h.general)}</td>
                  <td className="px-4 py-3"><StatusBadge status={h.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}

