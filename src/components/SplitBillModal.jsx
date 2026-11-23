import React, { useState } from 'react';
import { Users, Plus, Trash2, Copy, Check, Calculator, Share2, Receipt } from 'lucide-react';
import { useExpense } from '../context/ExpenseContext';
import { formatCurrency } from '../utils/formatters';

export default function SplitBillModal() {
  const { currency, addTransaction } = useExpense();

  const [billAmount, setBillAmount] = useState('120.00');
  const [tipPercent, setTipPercent] = useState(15);
  const [taxAmount, setTaxAmount] = useState('10.00');
  const [copied, setCopied] = useState(false);
  const [recordAsExpense, setRecordAsExpense] = useState(true);

  const [participants, setParticipants] = useState([
    { id: '1', name: 'You (Payer)', sharePercent: 25 },
    { id: '2', name: 'Alex', sharePercent: 25 },
    { id: '3', name: 'Sam', sharePercent: 25 },
    { id: '4', name: 'Jordan', sharePercent: 25 },
  ]);

  const numParticipants = participants.length;
  const baseBill = parseFloat(billAmount) || 0;
  const tipVal = (baseBill * (parseFloat(tipPercent) || 0)) / 100;
  const taxVal = parseFloat(taxAmount) || 0;
  const totalPayable = baseBill + tipVal + taxVal;

  const handleEqualSplit = () => {
    if (numParticipants === 0) return;
    const equalShare = 100 / numParticipants;
    setParticipants(participants.map(p => ({ ...p, sharePercent: Math.round(equalShare * 10) / 10 })));
  };

  const addPerson = () => {
    const newPerson = {
      id: `p-${Date.now()}`,
      name: `Friend ${participants.length + 1}`,
      sharePercent: 0
    };
    const updated = [...participants, newPerson];
    const equal = Math.round((100 / updated.length) * 10) / 10;
    setParticipants(updated.map(p => ({ ...p, sharePercent: equal })));
  };

  const removePerson = (id) => {
    if (participants.length <= 1) return;
    const remaining = participants.filter(p => p.id !== id);
    const equal = Math.round((100 / remaining.length) * 10) / 10;
    setParticipants(remaining.map(p => ({ ...p, sharePercent: equal })));
  };

  const copySummary = () => {
    const lines = [
      `🧾 Bill Split Summary (${formatCurrency(totalPayable, currency)} total)`,
      `Base: ${formatCurrency(baseBill, currency)} | Tip (${tipPercent}%): ${formatCurrency(tipVal, currency)} | Tax: ${formatCurrency(taxVal, currency)}`,
      '--------------------------------',
      ...participants.map(p => {
        const owed = (totalPayable * (p.sharePercent / 100)).toFixed(2);
        return `• ${p.name}: ${formatCurrency(owed, currency)} (${p.sharePercent}%)`;
      }),
      '--------------------------------',
      'Calculated via SpendWise AI Smart Expense Tracker'
    ];
    navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveToTransactions = () => {
    const yourShare = totalPayable * ((participants[0]?.sharePercent || 100) / 100);
    addTransaction({
      description: `Dinner/Group Outing Split (${participants.map(p => p.name).join(', ')})`,
      amount: parseFloat(yourShare.toFixed(2)),
      type: 'expense',
      category: 'food',
      account: 'credit_card',
      notes: `Total bill was ${formatCurrency(totalPayable, currency)}, your share was ${formatCurrency(yourShare, currency)}.`
    });
    alert('Your personal share of the split bill was recorded in your ledger!');
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-md">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Smart Bill Splitter & Share Calculator
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Calculate tips, taxes, individual shares, and generate instant WhatsApp/text summaries
            </p>
          </div>
        </div>

        <button
          onClick={copySummary}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white rounded-xl transition"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied to Clipboard!' : 'Copy Breakdown Text'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Parameters */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Base Bill Total ({currency})
            </label>
            <input
              type="number"
              step="0.01"
              value={billAmount}
              onChange={e => setBillAmount(e.target.value)}
              className="w-full px-3.5 py-2 text-base font-bold bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Tip % ({tipPercent}%)
              </label>
              <div className="flex gap-1">
                {[10, 15, 20].map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setTipPercent(p)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition ${
                      tipPercent === p 
                        ? 'bg-blue-600 border-blue-600 text-white' 
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {p}%
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Tax Amount ({currency})
              </label>
              <input
                type="number"
                step="0.01"
                value={taxAmount}
                onChange={e => setTaxAmount(e.target.value)}
                className="w-full px-3 py-1.5 text-xs font-bold bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Grand Total Summary Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
            <span className="text-xs uppercase tracking-wider text-blue-100 font-medium">
              Grand Total Payable
            </span>
            <div className="text-3xl font-black mt-1">
              {formatCurrency(totalPayable, currency)}
            </div>
            <div className="flex justify-between text-xs text-blue-100 mt-2 pt-2 border-t border-blue-400/40">
              <span>Base: {formatCurrency(baseBill, currency)}</span>
              <span>Tip: {formatCurrency(tipVal, currency)}</span>
              <span>Tax: {formatCurrency(taxVal, currency)}</span>
            </div>
          </div>

          <button
            onClick={handleSaveToTransactions}
            className="w-full py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-1.5"
          >
            <Receipt className="w-4 h-4" />
            Record Your Personal Share to Ledger
          </button>
        </div>

        {/* Participants & Share Distribution */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              Participants ({participants.length})
            </span>
            <div className="flex gap-2">
              <button
                onClick={handleEqualSplit}
                className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Split Evenly
              </button>
              <button
                onClick={addPerson}
                className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:underline"
              >
                <Plus className="w-3.5 h-3.5" /> Add Friend
              </button>
            </div>
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {participants.map((person, index) => {
              const individualOwed = totalPayable * (person.sharePercent / 100);
              return (
                <div 
                  key={person.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 gap-3"
                >
                  <input
                    type="text"
                    value={person.name}
                    onChange={(e) => {
                      const val = e.target.value;
                      setParticipants(participants.map(p => p.id === person.id ? { ...p, name: val } : p));
                    }}
                    className="text-xs font-semibold bg-transparent text-slate-800 dark:text-slate-200 outline-none flex-1"
                  />

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-medium">
                      {person.sharePercent}%
                    </span>
                    <span className="text-sm font-extrabold text-slate-900 dark:text-white min-w-[70px] text-right">
                      {formatCurrency(individualOwed, currency)}
                    </span>
                    {participants.length > 1 && index > 0 && (
                      <button
                        onClick={() => removePerson(person.id)}
                        className="p-1 text-slate-400 hover:text-rose-500 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

