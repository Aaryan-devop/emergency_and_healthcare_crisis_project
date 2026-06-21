import { useState } from "react";
import { Ambulance, Brain, Droplets, Hospital, Clock, CheckCircle } from "lucide-react";
import { GlassCard } from "../shared/SharedUI";

// ── AI Recommendations ─────────────────────────────────────────────────
export function AIModule() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const suggestions = [
    "Find nearest ICU bed for cardiac emergency",
    "Recommend O- blood source within 5km",
    "Best ambulance route to Metro General",
    "Predict blood shortage for next 6 hours",
  ];

  function runQuery(q: string) {
    setQuery(q);
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setLoading(false);
      setResult(`AI Analysis: Based on real-time data, the optimal recommendation for "${q}" is Metro General Hospital (2.1km, ETA 4 min). ICU availability: 12 beds. Confidence: 94.7%. Route: Via Central Ave → Harbor Blvd.`);
    }, 1500);
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
          <Brain size={18} className="text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">AI Recommendation Engine</h2>
          <p className="text-slate-500 text-xs">Powered by real-time resource intelligence</p>
        </div>
      </div>

      <GlassCard className="p-5">
        <div className="flex gap-3">
          <input value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Ask about resources, routes, or predictions..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50 transition-all" />
          <button onClick={() => runQuery(query)} disabled={!query}
            className="px-5 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 disabled:opacity-40 rounded-xl text-white text-sm font-semibold flex items-center gap-2 transition-all">
            <Brain size={15} />
            Analyze
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {suggestions.map(s => (
            <button key={s} onClick={() => runQuery(s)}
              className="text-xs text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded-lg px-3 py-1.5 hover:bg-purple-500/20 transition-colors">
              {s}
            </button>
          ))}
        </div>
      </GlassCard>

      {loading && (
        <GlassCard className="p-6 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
          <div>
            <div className="text-white font-semibold">Analyzing emergency data...</div>
            <div className="text-slate-500 text-xs font-mono mt-0.5">Processing 284 hospitals · 9,320 blood units · 89 ambulances</div>
          </div>
        </GlassCard>
      )}

      {result && (
        <GlassCard className="p-5 border-purple-500/20">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle size={16} className="text-emerald-400" />
            <span className="text-white font-semibold text-sm">AI Response</span>
            <span className="text-xs font-mono text-slate-500 ml-auto">94.7% confidence</span>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{result}</p>
        </GlassCard>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Hospital, label: "Nearest Hospital", desc: "Metro General · 2.1km", color: "from-blue-600 to-blue-800" },
          { icon: Droplets, label: "Best Blood Source", desc: "Metro General · O+ · 124 units", color: "from-red-600 to-red-800" },
          { icon: Ambulance, label: "Fastest Ambulance", desc: "AMB-005 · 3 min ETA", color: "from-amber-600 to-amber-800" },
          { icon: Clock, label: "Arrival Estimate", desc: "4–6 min via Central Ave", color: "from-emerald-600 to-emerald-800" },
        ].map(({ icon: Icon, label, desc, color }) => (
          <GlassCard key={label} className="p-4">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3`}>
              <Icon size={16} className="text-white" />
            </div>
            <div className="text-white text-sm font-semibold mb-1">{label}</div>
            <div className="text-slate-500 text-xs">{desc}</div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

