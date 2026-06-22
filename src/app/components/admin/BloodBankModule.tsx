import { useState } from "react";
import { Droplets, Plus } from "lucide-react";
import { apiClient } from "../../api/client";
import { StatusBadge, GlassCard } from "../shared/SharedUI";
import { Modal } from "../shared/Modal";
import { useData } from "../../api/hooks";

// ── Blood Bank Module ──────────────────────────────────────────────────
export function BloodBankModule() {
  const { data: bloodData, refetch } = useData('/blood');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBlood, setNewBlood] = useState({ type: "O+", units: 10 });

  const handleAddInventory = async (e: React.FormEvent) => {
    e.preventDefault();
    const { type, units } = newBlood;
    
    try {
      await apiClient.post('/blood', {
        type,
        units,
        hospital: "Metro General",
        status: units < 15 ? "critical" : units < 50 ? "limited" : "available"
      });
      setIsModalOpen(false);
      setNewBlood({ type: "O+", units: 10 });
      refetch();
    } catch (err) {
      console.error(err);
      alert("Error adding blood inventory");
    }
  };
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-theme-text-primary">Blood Bank Management</h2>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 rounded-xl text-white text-sm font-semibold transition-colors">
          <Plus size={15} />
          Add Inventory
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(bloodData || []).map((b: any) => (
          <GlassCard key={b.type} className="p-4 text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center mx-auto mb-3">
              <Droplets size={20} className="text-white" />
            </div>
            <div className="text-2xl font-bold font-mono text-theme-text-primary mb-0.5">{b.type}</div>
            <div className={`text-3xl font-bold font-mono mb-2 ${
              b.units < 15 ? "text-red-400" : b.units < 50 ? "text-amber-400" : "text-emerald-400"
            }`}>{b.units}</div>
            <div className="text-theme-text-muted text-[10px] mb-2">units available</div>
            <StatusBadge status={b.status} />
            <div className="text-theme-text-dim text-[10px] mt-2 font-mono">{b.updated}</div>
          </GlassCard>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Blood Inventory">
        <form onSubmit={handleAddInventory} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-theme-text-secondary block mb-1">Blood Type</label>
            <select value={newBlood.type} onChange={e => setNewBlood({...newBlood, type: e.target.value})} className="w-full bg-theme-bg-input border border-theme-border rounded-lg px-3 py-2 text-theme-text-primary focus:outline-none focus:border-red-500">
              {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map(t => (
                <option key={t} value={t} className="bg-theme-bg-modal">{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-theme-text-secondary block mb-1">Units to Add</label>
            <input type="number" required min="1" value={newBlood.units} onChange={e => setNewBlood({...newBlood, units: parseInt(e.target.value)})} className="w-full bg-theme-bg-input border border-theme-border rounded-lg px-3 py-2 text-theme-text-primary focus:outline-none focus:border-red-500" />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg text-theme-text-secondary hover:text-theme-text-primary transition-colors">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-white font-medium transition-colors">Add Units</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

