import { Activity, AlertTriangle, Ambulance, BedDouble, Droplets, Globe, Hospital, RefreshCw, Wind } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { StatusBadge, PulsingDot, GlassCard, KpiCard } from "../shared/SharedUI";
import { EmergencyMap } from "../shared/EmergencyMap";
import { trendData } from "../../data/mockData";
import { useData } from "../../api/hooks";

// ── Admin Dashboard ────────────────────────────────────────────────────
export function AdminDashboardContent() {
  const { data: emergencyRequests } = useData('/emergencies');
  return (
    <div className="p-6 space-y-6">
      {/* KPI grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard icon={Hospital} label="Total Hospitals" value="284" delta="+3" color="bg-gradient-to-br from-blue-600 to-blue-800" />
        <KpiCard icon={BedDouble} label="Available ICU Beds" value="412" pulse color="bg-gradient-to-br from-purple-600 to-purple-800" />
        <KpiCard icon={BedDouble} label="Available Gen. Beds" value="1,435" delta="-28" color="bg-gradient-to-br from-cyan-600 to-cyan-800" />
        <KpiCard icon={Ambulance} label="Active Ambulances" value="89" pulse color="bg-gradient-to-br from-amber-600 to-amber-800" />
        <KpiCard icon={Wind} label="Oxygen Cylinders" value="3,214" delta="+120" color="bg-gradient-to-br from-teal-600 to-teal-800" />
        <KpiCard icon={Droplets} label="Blood Units" value="9,320" pulse color="bg-gradient-to-br from-red-600 to-red-800" />
        <KpiCard icon={AlertTriangle} label="Pending Requests" value="17" pulse color="bg-gradient-to-br from-orange-600 to-orange-800" />
        <KpiCard icon={RefreshCw} label="Updated Today" value="1,089" delta="+204" color="bg-gradient-to-br from-emerald-600 to-emerald-800" />
      </div>

      {/* Map + recent requests */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <GlassCard className="p-4 h-full">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <Globe size={16} className="text-blue-400" />
                Live Resource Map
              </h3>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                <PulsingDot />
                <span>Real-time GPS</span>
              </div>
            </div>
            <EmergencyMap />
          </GlassCard>
        </div>
        <GlassCard className="p-4">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle size={16} className="text-orange-400" />
            Active Emergencies
          </h3>
          <div className="space-y-3">
            {(emergencyRequests || []).slice(0, 4).map((req: any) => (
              <div key={req.id} className="flex items-start gap-3 p-3 rounded-xl bg-white/3 border border-white/5">
                <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${
                  req.priority === "critical" ? "bg-red-500 animate-pulse" : req.priority === "high" ? "bg-orange-500" : "bg-amber-500"
                }`} />
                <div className="min-w-0 flex-1">
                  <div className="text-white text-xs font-semibold truncate">{req.patient} — {req.type}</div>
                  <div className="text-slate-500 text-[11px] font-mono mt-0.5">{req.id} · {req.time}</div>
                </div>
                <StatusBadge status={req.status} />
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Trend chart */}
      <GlassCard className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Activity size={16} className="text-blue-400" />
            24-Hour Resource Trend
          </h3>
          <span className="text-xs text-slate-500 font-mono">Last 24 hours</span>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={trendData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="redGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="time" tick={{ fill: "#64748B", fontSize: 11, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#64748B", fontSize: 11, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "#0D1830", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "12px", color: "#F0F4FF", fontSize: "12px" }} />
            <Area type="monotone" dataKey="requests" stroke="#EF4444" strokeWidth={2} fill="url(#redGrad)" name="Requests" />
            <Area type="monotone" dataKey="beds" stroke="#3B82F6" strokeWidth={2} fill="url(#blueGrad)" name="Bed %" />
            <Area type="monotone" dataKey="blood" stroke="#10B981" strokeWidth={2} fill="url(#greenGrad)" name="Blood %" />
          </AreaChart>
        </ResponsiveContainer>
      </GlassCard>
    </div>
  );
}

