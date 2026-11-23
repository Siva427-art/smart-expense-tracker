import React from 'react';
import { 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Lightbulb, 
  ArrowRight,
  TrendingDown,
  ShieldCheck
} from 'lucide-react';
import { useExpense } from '../context/ExpenseContext';

export default function FinancialInsightsCard() {
  const { analytics, setIsBudgetModalOpen, setActiveTab } = useExpense();
  const { tips, budgetAlerts, healthScore } = analytics;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-2xl p-5 shadow-lg border border-slate-800 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
              AI Financial Copilot
              <span className="text-[10px] bg-emerald-500/30 text-emerald-300 font-semibold px-1.5 py-0.5 rounded-full border border-emerald-500/30">
                Live
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Autonomous budget audit & health diagnosis
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsBudgetModalOpen(true)}
          className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold transition"
        >
          Manage Limits <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Overbudget Warnings if any */}
      {budgetAlerts.length > 0 && (
        <div className="mb-4 space-y-2">
          {budgetAlerts.map((alert, idx) => (
            <div 
              key={idx} 
              className={`flex items-start gap-2.5 p-2.5 rounded-xl text-xs border ${
                alert.severity === 'danger'
                  ? 'bg-rose-950/40 border-rose-800/60 text-rose-200'
                  : 'bg-amber-950/40 border-amber-800/60 text-amber-200'
              }`}
            >
              <AlertTriangle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                alert.severity === 'danger' ? 'text-rose-400' : 'text-amber-400'
              }`} />
              <div className="flex-1">
                <span className="font-bold uppercase tracking-wider text-[10px] mr-1.5 opacity-90">
                  {alert.categoryId}
                </span>
                <span>{alert.message}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Generated Intelligence Recommendations */}
      <div className="space-y-3">
        {tips.map((tip, idx) => (
          <div key={idx} className="flex items-start gap-3 bg-white/5 rounded-xl p-3 border border-white/5 hover:border-white/10 transition">
            <div className="mt-0.5">
              {tip.type === 'positive' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : tip.type === 'warning' ? (
                <TrendingDown className="w-4 h-4 text-amber-400" />
              ) : tip.type === 'tip' ? (
                <Lightbulb className="w-4 h-4 text-yellow-400" />
              ) : (
                <Info className="w-4 h-4 text-cyan-400" />
              )}
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-100">{tip.title}</h4>
              <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">{tip.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 
          Safe offline local encryption
        </span>
        <button 
          onClick={() => setActiveTab('split')}
          className="text-emerald-400 hover:text-emerald-300 font-medium"
        >
          Split a group bill &rarr;
        </button>
      </div>
    </div>
  );
}

