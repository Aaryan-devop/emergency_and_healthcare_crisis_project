import { useState } from "react";
import { Hospital, MapPin, Phone, Plus, Search, Users } from "lucide-react";
import { StatusBadge, GlassCard } from "../shared/SharedUI";
import { hospitalData } from "../../data/mockData";

// ── Hospital Module ────────────────────────────────────────────────────
export function HospitalModule() {
  const [search, setSearch] = useState("");
  const filtered = hospitalData.filter(h => h.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Hospital Management</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-white text-sm font-semibold transition-colors">
          <Plus size={15} />
          Add Hospital
        </button>
      </div>
      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search hospitals..."
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map(h => (
          <GlassCard key={h.id} className="p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-white font-semibold">{h.name}</h3>
                <p className="text-slate-500 text-xs mt-0.5 flex items-center gap-1"><MapPin size={11} />{h.address}</p>
              </div>
              <StatusBadge status={h.status} />
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: "ICU Beds", value: h.icu, color: h.icu < 5 ? "text-red-400" : "text-emerald-400" },
                { label: "Gen Beds", value: h.general, color: h.general < 20 ? "text-amber-400" : "text-emerald-400" },
                { label: "Oxygen", value: h.oxygen, color: "text-cyan-400" },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-white/3 rounded-xl p-2.5 text-center">
                  <div className={`text-lg font-bold font-mono ${color}`}>{value}</div>
                  <div className="text-slate-500 text-[10px] mt-0.5">{label}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1"><Phone size={11} />{h.contact}</span>
              <span className="flex items-center gap-1"><Users size={11} />{h.doctors} doctors</span>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

