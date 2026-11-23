import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  PiggyBank, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight,
  Flame
} from 'lucide-react';
import { useExpense } from '../context/ExpenseContext';
import { formatCurrency } from '../utils/formatters';

export default function StatCards() {
  const { analytics, currency } = useExpense();
  const {
    totalIncome,
    totalExpenses,
    netSavings,
    savingsRate,
    healthScore,
    dailyBurnRate,
    projectedMonthlyExpense
  } = analytics;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Net Balance / Monthly Savings */}
      <div className="relative overflow-hidden p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md group">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Net Monthly Savings
          </span>
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
            netSavings >= 0 
              ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400' 
              : 'bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400'
          }`}>
            <Wallet className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <h3 className={`text-2xl font-bold tracking-tight ${
            netSavings >= 0 ? 'text-slate-900 dark:text-white' : 'text-rose-600 dark:text-rose-400'
          }`}>
            {formatCurrency(netSavings, currency)}
          </h3>
          <span className={`text-xs font-semibold flex items-center ${
            savingsRate >= 20 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-500'
          }`}>
            {savingsRate}% saved
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Income surplus</span>
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            {savingsRate >= 20 ? 'Healthy target' : 'Focus on savings'}
          </span>
        </div>
      </div>

      {/* 2. Total Monthly Income */}
      <div className="relative overflow-hidden p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md group">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Total Inflow / Income
          </span>
          <div className="w-9 h-9 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {formatCurrency(totalIncome, currency)}
          </h3>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center">
            <ArrowUpRight className="w-3.5 h-3.5" />
            Active
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Monthly cashflow</span>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">Salary + Freelance</span>
        </div>
      </div>

      {/* 3. Total Monthly Expenses */}
      <div className="relative overflow-hidden p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md group">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Total Outflow / Expenses
          </span>
          <div className="w-9 h-9 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
            <TrendingDown className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {formatCurrency(totalExpenses, currency)}
          </h3>
          <span className="text-xs font-semibold text-slate-500 flex items-center">
            <Flame className="w-3.5 h-3.5 text-amber-500 mr-0.5" />
            {formatCurrency(dailyBurnRate, currency)}/day
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Est. month end:</span>
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            {formatCurrency(projectedMonthlyExpense, currency)}
          </span>
        </div>
      </div>

      {/* 4. Financial Health Score */}
      <div className="relative overflow-hidden p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md group">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Financial Health Score
          </span>
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
            healthScore >= 75 
              ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400' 
              : healthScore >= 50
              ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
              : 'bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400'
          }`}>
            <Activity className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {healthScore}<span className="text-sm font-normal text-slate-400">/100</span>
          </h3>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
            healthScore >= 75 
              ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400' 
              : healthScore >= 50
              ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400'
              : 'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-400'
          }`}>
            {healthScore >= 80 ? 'Excellent' : healthScore >= 65 ? 'Good' : healthScore >= 50 ? 'Moderate' : 'Needs Care'}
          </span>
        </div>
        {/* Progress meter */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${
              healthScore >= 75 ? 'bg-emerald-500' : healthScore >= 50 ? 'bg-amber-500' : 'bg-rose-500'
            }`}
            style={{ width: `${healthScore}%` }}
          />
        </div>
      </div>
    </div>
  );
}

