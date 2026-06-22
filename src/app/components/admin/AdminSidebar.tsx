import { AlertTriangle, Ambulance, BarChart3, BedDouble, Bell, Brain, Droplets, Globe, HeartPulse, Hospital, LayoutDashboard, LogOut, Settings, Wind } from "lucide-react";
import type { AdminTab } from "../../types";

// ── Sidebar ────────────────────────────────────────────────────────────
const sidebarItems: { icon: React.ElementType; label: string; tab: AdminTab; badge?: number }[] = [
  { icon: LayoutDashboard, label: "Dashboard", tab: "dashboard" },
  { icon: Hospital, label: "Hospitals", tab: "hospitals" },
  { icon: Droplets, label: "Blood Bank", tab: "blood", badge: 2 },
  { icon: BedDouble, label: "Bed Management", tab: "beds" },
  { icon: Ambulance, label: "Ambulance Tracking", tab: "ambulance" },
  { icon: Wind, label: "Oxygen & Equipment", tab: "oxygen" },
  { icon: AlertTriangle, label: "Emergency Requests", tab: "emergency", badge: 3 },
  { icon: Brain, label: "AI Recommendations", tab: "ai" },
  { icon: Globe, label: "Map Monitoring", tab: "map" },
  { icon: BarChart3, label: "Analytics", tab: "analytics" },
  { icon: Bell, label: "Notifications", tab: "notifications", badge: 5 },
  { icon: Settings, label: "Settings", tab: "settings" },
];

export function AdminSidebar({
  activeTab, setActiveTab, collapsed, onLogout,
}: {
  activeTab: AdminTab; setActiveTab: (t: AdminTab) => void;
  collapsed: boolean; onLogout: () => void;
}) {
  return (
    <aside className={`flex flex-col h-full bg-theme-bg-secondary border-r border-theme-sidebar-border transition-all duration-300 ${collapsed ? "w-16" : "w-60"}`}>
      {/* Logo */}
      <div className="p-4 border-b border-theme-sidebar-border flex items-center gap-3 min-h-[64px]">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30">
          <HeartPulse size={18} className="text-white" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <div className="text-theme-text-primary font-bold text-sm truncate">LifeLink</div>
            <div className="text-blue-400 text-[10px] font-mono truncate">ADMIN PORTAL</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 overflow-y-auto scrollbar-hide">
        {sidebarItems.map(({ icon: Icon, label, tab, badge }) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-150 group relative ${
              activeTab === tab
                ? "bg-blue-600/15 text-blue-400 border-r-2 border-blue-500"
                : "text-theme-text-muted hover:text-theme-text-primary hover:bg-theme-bg-card"
            }`}
          >
            <Icon size={17} className="flex-shrink-0" />
            {!collapsed && <span className="font-medium truncate">{label}</span>}
            {!collapsed && badge && (
              <span className="ml-auto bg-red-500 text-white text-[10px] font-mono font-bold rounded-full w-4.5 h-4.5 min-w-[1.1rem] flex items-center justify-center">
                {badge}
              </span>
            )}
            {collapsed && badge && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-theme-sidebar-border">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-theme-text-muted hover:text-red-400 hover:bg-red-500/10 transition-all text-sm"
        >
          <LogOut size={16} className="flex-shrink-0" />
          {!collapsed && <span className="font-medium">Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}

