import React, { useState } from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  Legend
} from 'recharts';
import { useExpense } from '../context/ExpenseContext';
import { formatCurrency } from '../utils/formatters';
import CategoryIcon from './CategoryIcon';

export default function ChartsSection() {
  const { transactions, expenseCategories, currency, isDarkMode, setActiveTab } = useExpense();
  const [chartView, setChartView] = useState('category'); // 'category' | 'trends'

  // Prepare Category breakdown data
  const categoryTotals = {};
  let totalSpent = 0;

  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      const amt = Number(t.amount || 0);
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + amt;
      totalSpent += amt;
    });

  const pieData = Object.entries(categoryTotals)
    .map(([catId, amount]) => {
      const catObj = expenseCategories.find(c => c.id === catId);
      return {
        name: catObj ? catObj.name : catId,
        id: catId,
        value: Math.round(amount * 100) / 100,
        color: catObj ? catObj.color : '#64748b',
        icon: catObj ? catObj.icon : 'CircleDollarSign'
      };
    })
    .sort((a, b) => b.value - a.value);

  // Prepare Monthly / Daily trend data (last 7 days or weeks)
  const dateMap = {};
  // Get last 7 days
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    const label = d.toLocaleDateString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric' });
    dateMap[key] = { name: label, income: 0, expense: 0 };
  }

  transactions.forEach(t => {
    if (dateMap[t.date]) {
      if (t.type === 'income') dateMap[t.date].income += Number(t.amount || 0);
      if (t.type === 'expense') dateMap[t.date].expense += Number(t.amount || 0);
    }
  });

  const trendData = Object.values(dateMap);

  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      const percent = totalSpent > 0 ? ((item.value / totalSpent) * 100).toFixed(1) : 0;
      return (
        <div className="bg-slate-900 text-white p-2.5 rounded-xl shadow-xl text-xs border border-slate-700">
          <p className="font-semibold text-slate-200">{item.name}</p>
          <p className="text-emerald-400 font-bold mt-1">
            {formatCurrency(item.value, currency)} ({percent}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white p-2.5 rounded-xl shadow-xl text-xs border border-slate-700">
          <p className="font-semibold text-slate-300 mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color }} className="font-medium">
              {entry.name}: {formatCurrency(entry.value, currency)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Spending & Cashflow Analytics
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Interactive breakdown of category outflows and daily patterns
          </p>
        </div>
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setChartView('category')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
              chartView === 'category'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            By Category
          </button>
          <button
            onClick={() => setChartView('trends')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
              chartView === 'trends'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            7-Day Cashflow
          </button>
        </div>
      </div>

      {chartView === 'category' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Donut Chart */}
          <div className="lg:col-span-6 h-64 sm:h-72 w-full flex items-center justify-center">
            {pieData.length === 0 ? (
              <div className="text-center text-slate-400 text-xs py-10">
                No expense data recorded yet.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Category Legend & Breakdown List */}
          <div className="lg:col-span-6 space-y-2.5 max-h-72 overflow-y-auto pr-1">
            {pieData.slice(0, 6).map((item) => {
              const percent = totalSpent > 0 ? Math.round((item.value / totalSpent) * 100) : 0;
              return (
                <div key={item.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {item.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                      <span>{formatCurrency(item.value, currency)}</span>
                      <span className="text-[11px] font-medium text-slate-400">({percent}%)</span>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${percent}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              );
            })}

            {pieData.length > 6 && (
              <button 
                onClick={() => setActiveTab('budgets')}
                className="w-full text-center py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                + View remaining categories in Budgets tab
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Trend Bar Chart */
        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#334155' : '#f1f5f9'} vertical={false} />
              <XAxis 
                dataKey="name" 
                tick={{ fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 11 }}
                axisLine={{ stroke: isDarkMode ? '#334155' : '#e2e8f0' }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(val) => `$${val}`}
              />
              <Tooltip content={<CustomBarTooltip />} />
              <Legend 
                wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                iconType="circle"
              />
              <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expense" name="Expense" fill="#f43f5e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

