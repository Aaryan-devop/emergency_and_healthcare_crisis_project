import { Ambulance, Globe, MapPin, Zap, Clock } from "lucide-react";
import { StatusBadge, PulsingDot, GlassCard } from "../shared/SharedUI";
import { useData } from "../../api/hooks";
import { EmergencyMap } from "../shared/EmergencyMap";

// ── Ambulance Module ───────────────────────────────────────────────────
export function AmbulanceModule() {
  const { data: ambulanceData } = useData('/ambulances');
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Ambulance Tracking</h2>
        <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-1.5">
          <PulsingDot color="bg-emerald-400" />
          Live GPS Active
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <GlassCard className="p-4 h-[380px]">
            <div className="flex items-center gap-2 mb-3">
              <Globe size={15} className="text-blue-400" />
              <span className="text-white font-semibold text-sm">Live Ambulance Map</span>
            </div>
            <EmergencyMap />
          </GlassCard>
        </div>
        <div className="space-y-3">
          {(ambulanceData || []).map((amb: any) => (
            <GlassCard key={amb.id} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-mono font-bold text-sm">{amb.id}</span>
                <StatusBadge status={amb.status} />
              </div>
              <div className="text-slate-400 text-xs font-medium mb-2">{amb.driver}</div>
              <div className="space-y-1 text-xs text-slate-500">
                <div className="flex items-center gap-1.5"><MapPin size={11} />{amb.location}</div>
                <div className="flex items-center gap-1.5"><Clock size={11} />ETA: {amb.eta}</div>
                {amb.speed > 0 && <div className="flex items-center gap-1.5"><Zap size={11} />{amb.speed} km/h</div>}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}

