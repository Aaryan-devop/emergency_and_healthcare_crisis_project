import { AlertTriangle, Bell, BellRing, CheckCircle, AlertCircle } from "lucide-react";
import { useData } from "../../api/hooks";

// ── Notifications ──────────────────────────────────────────────────────
export function NotificationsModule() {
  const { data: notifications } = useData('/notifications');
  const iconMap = {
    critical: { icon: AlertTriangle, color: "text-red-400", bg: "bg-red-500/15 border-red-500/25" },
    warning: { icon: AlertCircle, color: "text-amber-400", bg: "bg-amber-500/15 border-amber-500/25" },
    info: { icon: Bell, color: "text-blue-400", bg: "bg-blue-500/15 border-blue-500/25" },
    success: { icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/15 border-emerald-500/25" },
  };
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        <BellRing size={20} className="text-blue-400" />
        Notifications
      </h2>
      <div className="space-y-3">
        {(notifications || []).map((n: any) => {
          const { icon: Icon, color, bg } = iconMap[n.type as keyof typeof iconMap] || iconMap.info;
          return (
            <div key={n.id} className={`flex items-start gap-4 p-4 rounded-xl border backdrop-blur-sm ${bg}`}>
              <Icon size={18} className={`${color} flex-shrink-0 mt-0.5`} />
              <div className="flex-1 min-w-0">
                <p className="text-slate-200 text-sm">{n.message}</p>
                <span className="text-slate-500 text-xs font-mono mt-1 block">{n.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

