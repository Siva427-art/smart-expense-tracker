import React, { useState } from 'react';
import { Target, X, Check, AlertCircle, TrendingUp } from 'lucide-react';
import { useExpense } from '../context/ExpenseContext';
import { formatCurrency } from '../utils/formatters';
import CategoryIcon from './CategoryIcon';

export default function BudgetModal() {
  const { 
    isBudgetModalOpen, 
    setIsBudgetModalOpen, 
    budgets, 
    updateBudget, 
    expenseCategories, 
    analytics,
    currency 
  } = useExpense();

  const [tempBudgets, setTempBudgets] = useState({ ...budgets });

  if (!isBudgetModalOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    Object.entries(tempBudgets).forEach(([catId, val]) => {
      updateBudget(catId, val);
    });
    setIsBudgetModalOpen(false);
  };

  const { categoryExpenses } = analytics;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Monthly Spending Limits & Budgets
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Configure monthly budget ceilings for automated alerts
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsBudgetModalOpen(false)}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6">
          <div className="max-h-[60vh] overflow-y-auto space-y-3.5 pr-2">
            {expenseCategories.map(cat => {
              const currentBudget = tempBudgets[cat.id] ?? 0;
              const spent = categoryExpenses[cat.id] || 0;
              const percent = currentBudget > 0 ? Math.round((spent / currentBudget) * 100) : 0;
              const isOver = percent > 100;
              const isNear = percent >= 80 && !isOver;

              return (
                <div key={cat.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className={`p-1.5 rounded-lg ${cat.bg}`}>
                        <CategoryIcon iconName={cat.icon} className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block truncate">
                          {cat.name}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          Spent: {formatCurrency(spent, currency)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-500">{currency}</span>
                      <input
                        type="number"
                        min="0"
                        step="10"
                        value={currentBudget}
                        onChange={(e) => {
                          const val = Math.max(0, parseFloat(e.target.value) || 0);
                          setTempBudgets(prev => ({ ...prev, [cat.id]: val }));
                        }}
                        className="w-24 px-2 py-1 text-right text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                    </div>
                  </div>

                  {/* Visual Progress Meter */}
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isOver ? 'bg-rose-500' : isNear ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(100, percent)}%` }}
                    />
                  </div>

                  <div className="mt-1 flex items-center justify-between text-[10px]">
                    <span className={isOver ? 'text-rose-500 font-bold' : isNear ? 'text-amber-500 font-bold' : 'text-slate-400'}>
                      {percent}% consumed {isOver && '(Budget Exceeded!)'}
                    </span>
                    <span className="text-slate-400">
                      {currentBudget > spent ? `${formatCurrency(currentBudget - spent, currency)} left` : '0 remaining'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsBudgetModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/20 flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" /> Save Budgets
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

