import { AlertTriangle, Ambulance, CheckCircle, XCircle } from "lucide-react";
import { StatusBadge, GlassCard } from "../shared/SharedUI";
import { useData } from "../../api/hooks";

// ── Emergency Requests ─────────────────────────────────────────────────
export function EmergencyModule() {
  const { data: emergencyRequests } = useData('/emergencies');
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <AlertTriangle size={20} className="text-red-400" />
          Emergency Requests
        </h2>
        <span className="text-xs font-mono bg-red-500/15 text-red-400 border border-red-500/25 rounded-lg px-3 py-1.5">
          {(emergencyRequests || []).filter((r: any) => r.status === "active").length} Active
        </span>
      </div>
      <GlassCard>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {["Request ID", "Patient", "Emergency", "Blood Req.", "Bed Type", "Ambulance", "Priority", "Status", "Time"].map(h => (
                  <th key={h} className="text-left text-slate-500 font-mono text-xs px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(emergencyRequests || []).map((req: any) => (
                <tr key={req.id} className={`border-b border-white/3 hover:bg-white/3 transition-colors ${req.status === "active" && req.priority === "critical" ? "bg-red-500/5" : ""}`}>
                  <td className="px-4 py-3 font-mono text-blue-400 text-xs font-semibold">{req.id}</td>
                  <td className="px-4 py-3 text-white text-xs font-medium">{req.patient}</td>
                  <td className="px-4 py-3 text-slate-300 text-xs">{req.type}</td>
                  <td className="px-4 py-3 font-mono text-xs text-red-400">{req.blood ?? "—"}</td>
                  <td className="px-4 py-3 text-xs text-slate-400">{req.bed}</td>
                  <td className="px-4 py-3">
                    {req.ambulance
                      ? <CheckCircle size={14} className="text-emerald-400" />
                      : <XCircle size={14} className="text-slate-600" />}
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={req.priority} /></td>
                  <td className="px-4 py-3"><StatusBadge status={req.status} /></td>
                  <td className="px-4 py-3 text-slate-500 text-xs font-mono">{req.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}

