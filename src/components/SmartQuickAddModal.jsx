import React, { useState } from 'react';
import { X, Sparkles, Send, Check, ArrowRight, CornerDownLeft, Zap } from 'lucide-react';
import { useExpense } from '../context/ExpenseContext';
import { parseNaturalLanguageTransaction } from '../utils/smartParser';
import { formatCurrency } from '../utils/formatters';
import CategoryIcon from './CategoryIcon';

export default function SmartQuickAddModal() {
  const { isSmartAddOpen, setIsSmartAddOpen, addTransaction, currency, expenseCategories, incomeCategories } = useExpense();
  const [inputPrompt, setInputPrompt] = useState('');
  const [parsedResult, setParsedResult] = useState(null);

  if (!isSmartAddOpen) return null;

  const handleInputChange = (val) => {
    setInputPrompt(val);
    if (val.trim().length > 3) {
      const parsed = parseNaturalLanguageTransaction(val);
      setParsedResult(parsed);
    } else {
      setParsedResult(null);
    }
  };

  const handleConfirm = () => {
    if (!parsedResult || !parsedResult.amount) return;
    addTransaction(parsedResult);
    setInputPrompt('');
    setParsedResult(null);
    setIsSmartAddOpen(false);
  };

  const samplePrompts = [
    "Dinner at Italian bistro $54.20 yesterday using credit card",
    "Got 1500 freelance client payment into checking account",
    "Uber ride to office 22.50 transport",
    "Bought groceries at Trader Joes 85.30",
    "Gas station refuel $48"
  ];

  const currentCat = parsedResult 
    ? [...expenseCategories, ...incomeCategories].find(c => c.id === parsedResult.category)
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-transparent border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-500 text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Smart Natural Language Quick Add
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Type in plain English — the AI extracts amount, category, date & account
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsSmartAddOpen(false);
              setInputPrompt('');
              setParsedResult(null);
            }}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Input text box */}
          <div className="relative">
            <textarea
              rows="3"
              autoFocus
              value={inputPrompt}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey && parsedResult && parsedResult.amount > 0) {
                  e.preventDefault();
                  handleConfirm();
                }
              }}
              placeholder="e.g. Paid $65 for dinner at bistro yesterday with credit card"
              className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-teal-500 outline-none resize-none placeholder:text-slate-400"
            />
            {inputPrompt && (
              <button
                onClick={() => handleInputChange('')}
                className="absolute top-3 right-3 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick example click tags */}
          <div>
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
              Try an example:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {samplePrompts.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleInputChange(p)}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/40 text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-300 transition text-left"
                >
                  &ldquo;{p}&rdquo;
                </button>
              ))}
            </div>
          </div>

          {/* Live Extracted Preview Card */}
          {parsedResult && (
            <div className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-4 border border-teal-500/30 animate-in fade-in duration-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-teal-600 dark:text-teal-400 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" /> AI Extracted Parameters:
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                  parsedResult.type === 'income' 
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-400'
                    : 'bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-400'
                }`}>
                  {parsedResult.type}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Description</span>
                  <span className="font-semibold text-slate-900 dark:text-white truncate block">
                    {parsedResult.description || 'Expense'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Parsed Amount</span>
                  <span className="font-bold text-base text-slate-900 dark:text-white">
                    {formatCurrency(parsedResult.amount, currency)}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Identified Category</span>
                  <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5 mt-0.5">
                    {currentCat && <CategoryIcon iconName={currentCat.icon} className="w-3.5 h-3.5 text-teal-500" />}
                    {currentCat ? currentCat.name : parsedResult.category}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Date & Account</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {parsedResult.date} &bull; {parsedResult.account}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleConfirm}
                  disabled={!parsedResult.amount}
                  className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 rounded-xl shadow-md transition flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Check className="w-4 h-4" />
                  Confirm & Add to Ledger
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

