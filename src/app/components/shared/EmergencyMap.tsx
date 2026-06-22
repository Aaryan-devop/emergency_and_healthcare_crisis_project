import { useState, useEffect } from "react";
import { PulsingDot } from "./SharedUI";
import { useSettings } from "../../context/SettingsContext";

// ── Emergency Map ──────────────────────────────────────────────────────
export function EmergencyMap({ compact = false }: { compact?: boolean }) {
  const { settings } = useSettings();
  const gpsTracking = settings["GPS Tracking"];

  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!gpsTracking) return;
    const t = setInterval(() => setTick(p => p + 1), 1200);
    return () => clearInterval(t);
  }, [gpsTracking]);

  const hospitals = [
    { x: 25, y: 35, label: "Metro General", color: "#3B82F6" },
    { x: 68, y: 22, label: "St. Luke's", color: "#3B82F6" },
    { x: 42, y: 62, label: "Riverside Clinic", color: "#EF4444" },
    { x: 78, y: 58, label: "Northside Health", color: "#10B981" },
    { x: 55, y: 42, label: "Downtown Trauma", color: "#3B82F6" },
  ];
  const ambulances = [
    { x: 30 + Math.sin(tick * 0.3) * 3, y: 40 + Math.cos(tick * 0.2) * 2 },
    { x: 65 + Math.cos(tick * 0.25) * 4, y: 55 + Math.sin(tick * 0.35) * 3 },
    { x: 48 + Math.sin(tick * 0.4) * 2, y: 28 + Math.cos(tick * 0.3) * 3 },
  ];
  const bloodBanks = [{ x: 15, y: 60 }, { x: 85, y: 35 }];

  return (
    <div className={`relative rounded-2xl overflow-hidden ${compact ? "h-48" : "h-full min-h-[380px]"} bg-gradient-to-br from-slate-900 via-[#060D1F] to-slate-900`}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className="absolute inset-0">
        {/* Grid */}
        {Array.from({ length: 10 }).map((_, i) => (
          <g key={i}>
            <line x1={i * 10} y1={0} x2={i * 10} y2={100} stroke="rgba(59,130,246,0.07)" strokeWidth="0.3" />
            <line x1={0} y1={i * 10} x2={100} y2={i * 10} stroke="rgba(59,130,246,0.07)" strokeWidth="0.3" />
          </g>
        ))}
        {/* Roads */}
        <path d="M10,50 Q30,45 50,48 Q70,51 90,50" stroke="rgba(148,163,184,0.2)" strokeWidth="0.8" fill="none" />
        <path d="M50,10 Q48,30 50,50 Q52,70 50,90" stroke="rgba(148,163,184,0.2)" strokeWidth="0.8" fill="none" />
        <path d="M20,20 Q35,35 50,48" stroke="rgba(148,163,184,0.12)" strokeWidth="0.5" fill="none" />
        <path d="M80,20 Q65,35 50,48" stroke="rgba(148,163,184,0.12)" strokeWidth="0.5" fill="none" />
        <path d="M20,80 Q35,65 50,48" stroke="rgba(148,163,184,0.12)" strokeWidth="0.5" fill="none" />
        <path d="M80,80 Q65,65 50,48" stroke="rgba(148,163,184,0.12)" strokeWidth="0.5" fill="none" />
        {/* Blood banks */}
        {bloodBanks.map((b, i) => (
          <g key={i}>
            <circle cx={b.x} cy={b.y} r={2} fill="#EF4444" opacity="0.5" />
            <circle cx={b.x} cy={b.y} r={3.5} fill="none" stroke="#EF4444" strokeWidth="0.4" opacity="0.3" />
            <text x={b.x + 3} y={b.y + 1} fontSize="2.5" fill="#EF4444" opacity="0.8">BB</text>
          </g>
        ))}
        {/* Hospital markers */}
        {hospitals.map((h, i) => (
          <g key={i}>
            <circle cx={h.x} cy={h.y} r={4} fill={`${h.color}22`} />
            <circle cx={h.x} cy={h.y} r={2.2} fill={h.color} />
            <text x={h.x} y={h.y + 0.8} textAnchor="middle" fontSize="2" fill="white" fontWeight="bold">H</text>
            {!compact && <text x={h.x} y={h.y + 6} textAnchor="middle" fontSize="2" fill={h.color} opacity="0.9">{h.label}</text>}
          </g>
        ))}
        {/* Ambulance markers */}
        {ambulances.map((a, i) => (
          <g key={i}>
            <circle cx={a.x} cy={a.y} r={4} fill="rgba(251,191,36,0.12)" className="transition-all duration-700" />
            <circle cx={a.x} cy={a.y} r={1.8} fill="#FBB124" className="transition-all duration-700" />
            <text x={a.x} y={a.y + 0.7} textAnchor="middle" fontSize="1.8" fill="white" fontWeight="bold" className="transition-all duration-700">A</text>
          </g>
        ))}
        {/* Pulse rings */}
        {hospitals.slice(0, 2).map((h, i) => (
          <circle key={i} cx={h.x} cy={h.y} r={6 + (tick % 8)} fill="none"
            stroke={h.color} strokeWidth="0.3" opacity={Math.max(0, 1 - (tick % 8) / 8)} />
        ))}
      </svg>
      {/* Legend */}
      <div className="absolute bottom-3 left-3 flex gap-3 text-[10px] text-slate-400">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" />Hospital</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-400" />Ambulance</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" />Blood Bank</span>
      </div>
      <div className={`absolute top-3 right-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-lg px-2 py-1 text-[10px] font-mono ${gpsTracking ? "text-emerald-400" : "text-slate-500"}`}>
        {gpsTracking && <PulsingDot color="bg-emerald-400" />}
        {gpsTracking ? "LIVE" : "OFFLINE"}
      </div>
    </div>
  );
}
