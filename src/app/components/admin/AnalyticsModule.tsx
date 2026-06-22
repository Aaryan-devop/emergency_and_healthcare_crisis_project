import { Ambulance, BarChart3 } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { GlassCard } from "../shared/SharedUI";
import { trendData, responseTimeData } from "../../data/mockData";

// ── Analytics ──────────────────────────────────────────────────────────
export function AnalyticsModule() {
  const tooltipStyle = {
    background: "var(--theme-tooltip-bg)",
    border: "1px solid var(--theme-tooltip-border)",
    borderRadius: "12px",
    color: "var(--theme-tooltip-text)",
    fontSize: "12px",
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold text-theme-text-primary flex items-center gap-2">
        <BarChart3 size={20} className="text-blue-400" />
        Analytics Dashboard
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-4">
          <h3 className="text-theme-text-primary font-semibold text-sm mb-4">Emergency Requests Trend (24h)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="reqGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.1)" />
              <XAxis dataKey="time" tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="requests" stroke="#EF4444" strokeWidth={2} fill="url(#reqGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-4">
          <h3 className="text-theme-text-primary font-semibold text-sm mb-4">Ambulance Response Time (min)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={responseTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.1)" />
              <XAxis dataKey="day" tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="avg" fill="#3B82F6" radius={[4, 4, 0, 0]} opacity={0.85} name="Avg Response" />
              <Bar dataKey="target" fill="#EF4444" radius={[4, 4, 0, 0]} opacity={0.35} name="Target" />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-4">
          <h3 className="text-theme-text-primary font-semibold text-sm mb-4">Bed Occupancy Rate (%)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.1)" />
              <XAxis dataKey="time" tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="beds" stroke="#10B981" strokeWidth={2} dot={false} name="Occupancy %" />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-4">
          <h3 className="text-theme-text-primary font-semibold text-sm mb-4">Blood Unit Availability (%)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="bloodGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.1)" />
              <XAxis dataKey="time" tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="blood" stroke="#EF4444" strokeWidth={2} fill="url(#bloodGrad2)" name="Blood %" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </div>
  );
}

