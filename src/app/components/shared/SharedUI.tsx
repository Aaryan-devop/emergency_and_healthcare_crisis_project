import { TrendingDown, TrendingUp } from "lucide-react";

// ── Helpers ────────────────────────────────────────────────────────────
export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    available: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    limited: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    critical: "bg-red-500/20 text-red-400 border-red-500/30",
    "en-route": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    busy: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    active: "bg-red-500/20 text-red-400 border-red-500/30",
    dispatched: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    resolved: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    high: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    low: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono font-semibold border ${map[status] ?? "bg-slate-500/20 text-slate-400 border-slate-500/30"}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse" />
      {status}
    </span>
  );
}

export function PulsingDot({ color = "bg-emerald-400" }: { color?: string }) {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${color} opacity-75`} />
      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${color}`} />
    </span>
  );
}

// ── Glass Card ─────────────────────────────────────────────────────────
export function GlassCard({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-xl shadow-black/30 ${className} ${onClick ? "cursor-pointer hover:bg-white/8 transition-all duration-200" : ""}`}
    >
      {children}
    </div>
  );
}

// ── KPI Card ───────────────────────────────────────────────────────────
export function KpiCard({ icon: Icon, label, value, delta, color, pulse }: {
  icon: React.ElementType; label: string; value: string | number;
  delta?: string; color: string; pulse?: boolean;
}) {
  return (
    <GlassCard className="p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={18} className="text-white" />
        </div>
        {pulse && <PulsingDot />}
        {delta && !pulse && (
          <span className={`text-xs font-mono font-semibold flex items-center gap-1 ${delta.startsWith("+") ? "text-emerald-400" : "text-red-400"}`}>
            {delta.startsWith("+") ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {delta}
          </span>
        )}
      </div>
      <div>
        <div className="text-2xl font-bold text-white font-sans tracking-tight">{value}</div>
        <div className="text-xs text-slate-400 mt-0.5 font-medium">{label}</div>
      </div>
    </GlassCard>
  );
}
