import { Droplets, Plus } from "lucide-react";
import { StatusBadge, GlassCard } from "../shared/SharedUI";
import { bloodData } from "../../data/mockData";

// ── Blood Bank Module ──────────────────────────────────────────────────
export function BloodBankModule() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Blood Bank Management</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 rounded-xl text-white text-sm font-semibold transition-colors">
          <Plus size={15} />
          Add Inventory
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {bloodData.map(b => (
          <GlassCard key={b.type} className="p-4 text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center mx-auto mb-3">
              <Droplets size={20} className="text-white" />
            </div>
            <div className="text-2xl font-bold font-mono text-white mb-0.5">{b.type}</div>
            <div className={`text-3xl font-bold font-mono mb-2 ${
              b.units < 15 ? "text-red-400" : b.units < 50 ? "text-amber-400" : "text-emerald-400"
            }`}>{b.units}</div>
            <div className="text-slate-500 text-[10px] mb-2">units available</div>
            <StatusBadge status={b.status} />
            <div className="text-slate-600 text-[10px] mt-2 font-mono">{b.updated}</div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

