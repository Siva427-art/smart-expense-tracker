import React from 'react';
import Navbar from './components/Navbar';
import StatCards from './components/StatCards';
import ChartsSection from './components/ChartsSection';
import FinancialInsightsCard from './components/FinancialInsightsCard';
import TransactionList from './components/TransactionList';
import TransactionModal from './components/TransactionModal';
import SmartQuickAddModal from './components/SmartQuickAddModal';
import BudgetModal from './components/BudgetModal';
import SubscriptionsView from './components/SubscriptionsView';
import SplitBillModal from './components/SplitBillModal';
import { useExpense } from './context/ExpenseContext';

export default function App() {
  const { activeTab } = useExpense();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Dashboard View */}
        {activeTab === 'dashboard' && (
          <>
            <StatCards />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-8">
                <ChartsSection />
              </div>
              <div className="lg:col-span-4">
                <FinancialInsightsCard />
              </div>
            </div>
            <TransactionList />
          </>
        )}

        {/* Transactions View */}
        {activeTab === 'transactions' && (
          <div className="space-y-6">
            <StatCards />
            <TransactionList />
          </div>
        )}

        {/* Budgets & Goals View */}
        {activeTab === 'budgets' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7">
                <ChartsSection />
              </div>
              <div className="lg:col-span-5">
                <FinancialInsightsCard />
              </div>
            </div>
            <TransactionList />
          </div>
        )}

        {/* Subscriptions View */}
        {activeTab === 'subscriptions' && (
          <SubscriptionsView />
        )}

        {/* Split Bills View */}
        {activeTab === 'split' && (
          <SplitBillModal />
        )}
      </main>

      {/* Persistent Modals */}
      <TransactionModal />
      <SmartQuickAddModal />
      <BudgetModal />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800/80 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <p>Smart Expense Tracker & Financial Copilot &bull; Built with React, Tailwind CSS & Vite</p>
      </footer>
    </div>
  );
}

