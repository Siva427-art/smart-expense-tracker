import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_TRANSACTIONS, 
  INITIAL_BUDGETS, 
  INITIAL_SUBSCRIPTIONS,
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
  ACCOUNTS,
  CURRENCIES 
} from '../constants';
import { analyzeFinances } from '../utils/financialInsights';

const ExpenseContext = createContext(null);

export function ExpenseProvider({ children }) {
  // 1. Transactions state with LocalStorage
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem('smart_expense_transactions');
      return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
    } catch {
      return INITIAL_TRANSACTIONS;
    }
  });

  // 2. Budgets state with LocalStorage
  const [budgets, setBudgets] = useState(() => {
    try {
      const saved = localStorage.getItem('smart_expense_budgets');
      return saved ? JSON.parse(saved) : INITIAL_BUDGETS;
    } catch {
      return INITIAL_BUDGETS;
    }
  });

  // 3. Subscriptions state with LocalStorage
  const [subscriptions, setSubscriptions] = useState(() => {
    try {
      const saved = localStorage.getItem('smart_expense_subscriptions');
      return saved ? JSON.parse(saved) : INITIAL_SUBSCRIPTIONS;
    } catch {
      return INITIAL_SUBSCRIPTIONS;
    }
  });

  // 4. Currency
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('smart_expense_currency') || 'USD';
  });

  // 5. Dark Mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('smart_expense_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // 6. Active Tab Navigation: 'dashboard' | 'transactions' | 'analytics' | 'budgets' | 'subscriptions' | 'split'
  const [activeTab, setActiveTab] = useState('dashboard');

  // 7. Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSmartAddOpen, setIsSmartAddOpen] = useState(false);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [isSplitModalOpen, setIsSplitModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  // 8. Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'expense' | 'income'
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterAccount, setFilterAccount] = useState('all');
  const [dateRange, setDateRange] = useState('all'); // 'all' | 'this_month' | 'last_30_days' | 'last_90_days'
  const [sortBy, setSortBy] = useState('date_desc'); // 'date_desc' | 'date_asc' | 'amount_desc' | 'amount_asc'

  // Persist to LocalStorage
  useEffect(() => {
    localStorage.setItem('smart_expense_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('smart_expense_budgets', JSON.stringify(budgets));
  }, [budgets]);

  useEffect(() => {
    localStorage.setItem('smart_expense_subscriptions', JSON.stringify(subscriptions));
  }, [subscriptions]);

  useEffect(() => {
    localStorage.setItem('smart_expense_currency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('smart_expense_theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Financial Analysis derived state
  const analytics = analyzeFinances(transactions, budgets, subscriptions);

  // CRUD Operations
  const addTransaction = (tx) => {
    const newTx = {
      ...tx,
      id: `tx-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      amount: parseFloat(tx.amount) || 0,
      date: tx.date || new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };
    setTransactions(prev => [newTx, ...prev]);
    return newTx;
  };

  const updateTransaction = (id, updated) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...updated, amount: parseFloat(updated.amount) || 0 } : t));
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const resetToSampleData = () => {
    setTransactions(INITIAL_TRANSACTIONS);
    setBudgets(INITIAL_BUDGETS);
    setSubscriptions(INITIAL_SUBSCRIPTIONS);
    setCurrency('USD');
  };

  const clearAllData = () => {
    setTransactions([]);
  };

  const updateBudget = (categoryId, amount) => {
    setBudgets(prev => ({
      ...prev,
      [categoryId]: Math.max(0, parseFloat(amount) || 0)
    }));
  };

  const addSubscription = (sub) => {
    const newSub = {
      ...sub,
      id: `sub-${Date.now()}`,
      amount: parseFloat(sub.amount) || 0,
    };
    setSubscriptions(prev => [...prev, newSub]);
  };

  const deleteSubscription = (id) => {
    setSubscriptions(prev => prev.filter(s => s.id !== id));
  };

  const toggleSubscriptionStatus = (id) => {
    setSubscriptions(prev => prev.map(s => {
      if (s.id === id) {
        return { ...s, status: s.status === 'active' ? 'paused' : 'active' };
      }
      return s;
    }));
  };

  // Filtered transactions computed list
  const filteredTransactions = transactions.filter(t => {
    // 1. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchDesc = t.description?.toLowerCase().includes(q);
      const matchNotes = t.notes?.toLowerCase().includes(q);
      const matchCat = t.category?.toLowerCase().includes(q);
      const matchTags = t.tags?.some(tag => tag.toLowerCase().includes(q));
      if (!matchDesc && !matchNotes && !matchCat && !matchTags) return false;
    }

    // 2. Type Filter
    if (filterType !== 'all' && t.type !== filterType) return false;

    // 3. Category Filter
    if (filterCategory !== 'all' && t.category !== filterCategory) return false;

    // 4. Account Filter
    if (filterAccount !== 'all' && t.account !== filterAccount) return false;

    // 5. Date Range Filter
    if (dateRange !== 'all') {
      const txDate = new Date(t.date);
      const now = new Date();
      if (dateRange === 'this_month') {
        if (txDate.getMonth() !== now.getMonth() || txDate.getFullYear() !== now.getFullYear()) return false;
      } else if (dateRange === 'last_30_days') {
        const past = new Date();
        past.setDate(past.getDate() - 30);
        if (txDate < past) return false;
      } else if (dateRange === 'last_90_days') {
        const past = new Date();
        past.setDate(past.getDate() - 90);
        if (txDate < past) return false;
      }
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'date_desc') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'date_asc') return new Date(a.date) - new Date(b.date);
    if (sortBy === 'amount_desc') return b.amount - a.amount;
    if (sortBy === 'amount_asc') return a.amount - b.amount;
    return 0;
  });

  return (
    <ExpenseContext.Provider value={{
      transactions,
      filteredTransactions,
      budgets,
      subscriptions,
      currency,
      setCurrency,
      isDarkMode,
      setIsDarkMode,
      activeTab,
      setActiveTab,
      analytics,
      
      // Modals
      isAddModalOpen,
      setIsAddModalOpen,
      isSmartAddOpen,
      setIsSmartAddOpen,
      isBudgetModalOpen,
      setIsBudgetModalOpen,
      isSplitModalOpen,
      setIsSplitModalOpen,
      editingTransaction,
      setEditingTransaction,

      // Filter State
      searchQuery,
      setSearchQuery,
      filterType,
      setFilterType,
      filterCategory,
      setFilterCategory,
      filterAccount,
      setFilterAccount,
      dateRange,
      setDateRange,
      sortBy,
      setSortBy,

      // Actions
      addTransaction,
      updateTransaction,
      deleteTransaction,
      resetToSampleData,
      clearAllData,
      updateBudget,
      addSubscription,
      deleteSubscription,
      toggleSubscriptionStatus,
      
      // Constants
      categories: [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES],
      expenseCategories: EXPENSE_CATEGORIES,
      incomeCategories: INCOME_CATEGORIES,
      accounts: ACCOUNTS,
      currencies: CURRENCIES,
    }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpense() {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
}

