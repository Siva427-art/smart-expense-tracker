import React, { useState } from 'react';
import { 
  CalendarClock, 
  Plus, 
  Trash2, 
  CheckCircle, 
  PauseCircle, 
  AlertCircle,
  Sparkles,
  CreditCard,
  DollarSign
} from 'lucide-react';
import { useExpense } from '../context/ExpenseContext';
import { formatCurrency, formatDate } from '../utils/formatters';

export default function SubscriptionsView() {
  const { 
    subscriptions, 
    addSubscription, 
    deleteSubscription, 
    toggleSubscriptionStatus, 
    currency 
  } = useExpense();

  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [category, setCategory] = useState('entertainment');
  const [nextRenewal, setNextRenewal] = useState('');

  // Computations
  const activeSubs = subscriptions.filter(s => s.status === 'active');
  const totalMonthlyBurn = activeSubs.reduce((acc, sub) => {
    return acc + (sub.billingCycle === 'yearly' ? sub.amount / 12 : sub.amount);
  }, 0);
  const totalYearlyBurn = totalMonthlyBurn * 12;

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim() || !amount) return;

    addSubscription({
      name: name.trim(),
      amount: parseFloat(amount),
      billingCycle,
      category,
      nextRenewal: nextRenewal || new Date().toISOString().split('T')[0],
      status: 'active'
    });

    setName('');
    setAmount('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Active Subscriptions
          </span>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {activeSubs.length} <span className="text-sm font-normal text-slate-400">services</span>
          </h3>
          <span className="text-xs text-slate-400 mt-2 block">
            {subscriptions.length - activeSubs.length} paused or cancelled
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Monthly Recurring Burn
          </span>
          <h3 className="text-2xl font-extrabold text-rose-600 dark:text-rose-400">
            {formatCurrency(totalMonthlyBurn, currency)}
            <span className="text-xs font-semibold text-slate-400">/mo</span>
          </h3>
          <span className="text-xs text-slate-400 mt-2 block">
            Auto-debited from linked cards
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Projected Annual Outlay
          </span>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {formatCurrency(totalYearlyBurn, currency)}
            <span className="text-xs font-semibold text-slate-400">/yr</span>
          </h3>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 block font-medium">
            Reviewing twice a year saves ~15%
          </span>
        </div>
      </div>

      {/* Subscriptions List Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CalendarClock className="w-5 h-5 text-indigo-500" />
              Subscriptions & Recurring Bills
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Never get caught by surprise renewals or zombie memberships
            </p>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-3.5 py-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm transition flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            {showAddForm ? 'Close Form' : 'New Subscription'}
          </button>
        </div>

        {/* Add Subscription Dropdown Form */}
        {showAddForm && (
          <form onSubmit={handleAdd} className="mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3 animate-in fade-in duration-150">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">Track New Subscription</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <input
                type="text"
                required
                placeholder="Service name (e.g. Netflix, Gym)"
                value={name}
                onChange={e => setName(e.target.value)}
                className="px-3 py-2 text-xs bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="number"
                step="0.01"
                required
                placeholder="Amount (e.g. 19.99)"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="px-3 py-2 text-xs bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <select
                value={billingCycle}
                onChange={e => setBillingCycle(e.target.value)}
                className="px-3 py-2 text-xs bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="monthly">Monthly Cycle</option>
                <option value="yearly">Yearly / Annual Cycle</option>
                <option value="weekly">Weekly Cycle</option>
              </select>
              <input
                type="date"
                value={nextRenewal}
                onChange={e => setNextRenewal(e.target.value)}
                className="px-3 py-2 text-xs bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm"
              >
                Save Subscription
              </button>
            </div>
          </form>
        )}

        {/* Subscription Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {subscriptions.map((sub) => {
            const isActive = sub.status === 'active';
            return (
              <div 
                key={sub.id} 
                className={`p-4 rounded-2xl border transition-all ${
                  isActive 
                    ? 'bg-white dark:bg-slate-900/90 border-slate-100 dark:border-slate-800 hover:border-indigo-400' 
                    : 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200/50 dark:border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                      {sub.name}
                    </h3>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      {sub.billingCycle} billing
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive 
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-400' 
                      : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                  }`}>
                    {sub.status}
                  </span>
                </div>

                <div className="flex items-baseline gap-1 my-2">
                  <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                    {formatCurrency(sub.amount, currency)}
                  </span>
                  <span className="text-xs text-slate-400">/{sub.billingCycle === 'yearly' ? 'yr' : 'mo'}</span>
                </div>

                <div className="text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span>Renewal: {formatDate(sub.nextRenewal)}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleSubscriptionStatus(sub.id)}
                      className="p-1 text-slate-400 hover:text-indigo-600 rounded-lg"
                      title={isActive ? 'Pause subscription' : 'Activate subscription'}
                    >
                      {isActive ? <PauseCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4 text-emerald-500" />}
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete ${sub.name}?`)) deleteSubscription(sub.id);
                      }}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded-lg"
                      title="Remove subscription"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

