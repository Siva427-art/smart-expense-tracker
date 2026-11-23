export const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar (USD)' },
  { code: 'EUR', symbol: '€', name: 'Euro (EUR)' },
  { code: 'GBP', symbol: '£', name: 'British Pound (GBP)' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee (INR)' },
  { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar (CAD)' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar (AUD)' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen (JPY)' },
];

export const EXPENSE_CATEGORIES = [
  { id: 'food', name: 'Food & Dining', icon: 'Utensils', color: '#f97316', bg: 'bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400' },
  { id: 'housing', name: 'Housing & Rent', icon: 'Home', color: '#6366f1', bg: 'bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400' },
  { id: 'transport', name: 'Transportation', icon: 'Car', color: '#0ea5e9', bg: 'bg-sky-100 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400' },
  { id: 'shopping', name: 'Shopping & Groceries', icon: 'ShoppingBag', color: '#ec4899', bg: 'bg-pink-100 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400' },
  { id: 'entertainment', name: 'Entertainment & Leisure', icon: 'Film', color: '#8b5cf6', bg: 'bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400' },
  { id: 'bills', name: 'Utilities & Bills', icon: 'Zap', color: '#eab308', bg: 'bg-yellow-100 dark:bg-yellow-950/40 text-yellow-600 dark:text-yellow-400' },
  { id: 'health', name: 'Health & Medical', icon: 'HeartPulse', color: '#ef4444', bg: 'bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400' },
  { id: 'education', name: 'Education & Courses', icon: 'GraduationCap', color: '#14b8a6', bg: 'bg-teal-100 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400' },
  { id: 'travel', name: 'Travel & Vacations', icon: 'Plane', color: '#06b6d4', bg: 'bg-cyan-100 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400' },
  { id: 'investments', name: 'Investments & Savings', icon: 'TrendingUp', color: '#10b981', bg: 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400' },
  { id: 'other_expense', name: 'Other Expenses', icon: 'HelpCircle', color: '#64748b', bg: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400' },
];

export const INCOME_CATEGORIES = [
  { id: 'salary', name: 'Main Salary', icon: 'Briefcase', color: '#10b981', bg: 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400' },
  { id: 'freelance', name: 'Freelance & Consulting', icon: 'Laptop', color: '#0ea5e9', bg: 'bg-sky-100 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400' },
  { id: 'invest_returns', name: 'Dividends & Returns', icon: 'LineChart', color: '#8b5cf6', bg: 'bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400' },
  { id: 'rental', name: 'Rental Income', icon: 'Building2', color: '#f59e0b', bg: 'bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400' },
  { id: 'gifts', name: 'Gifts & Bonus', icon: 'Gift', color: '#ec4899', bg: 'bg-pink-100 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400' },
  { id: 'other_income', name: 'Other Income', icon: 'Coins', color: '#64748b', bg: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400' },
];

export const ACCOUNTS = [
  { id: 'checking', name: 'Checking Account', type: 'bank', color: '#3b82f6' },
  { id: 'credit_card', name: 'Credit Card', type: 'card', color: '#8b5cf6' },
  { id: 'savings', name: 'High Yield Savings', type: 'savings', color: '#10b981' },
  { id: 'cash', name: 'Cash in Hand', type: 'cash', color: '#f59e0b' },
  { id: 'digital_wallet', name: 'Digital Wallet / UPI', type: 'wallet', color: '#ec4899' },
];

export const INITIAL_BUDGETS = {
  food: 600,
  housing: 1500,
  transport: 300,
  shopping: 400,
  entertainment: 250,
  bills: 350,
  health: 200,
  education: 150,
  travel: 500,
  investments: 1000,
  other_expense: 200,
};

export const INITIAL_SUBSCRIPTIONS = [
  { id: 'sub-1', name: 'Netflix Premium', amount: 19.99, billingCycle: 'monthly', category: 'entertainment', nextRenewal: '2026-12-05', status: 'active' },
  { id: 'sub-2', name: 'Spotify Duo', amount: 14.99, billingCycle: 'monthly', category: 'entertainment', nextRenewal: '2026-12-12', status: 'active' },
  { id: 'sub-3', name: 'Amazon Prime', amount: 139.00, billingCycle: 'yearly', category: 'shopping', nextRenewal: '2027-03-15', status: 'active' },
  { id: 'sub-4', name: 'Gym Membership', amount: 55.00, billingCycle: 'monthly', category: 'health', nextRenewal: '2026-12-01', status: 'active' },
  { id: 'sub-5', name: 'ChatGPT Plus', amount: 20.00, billingCycle: 'monthly', category: 'education', nextRenewal: '2026-12-18', status: 'active' },
  { id: 'sub-6', name: 'GitHub Copilot', amount: 10.00, billingCycle: 'monthly', category: 'education', nextRenewal: '2026-12-20', status: 'active' },
];

// Helper to generate dynamic recent dates
const daysAgo = (n) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split('T')[0];
};

export const INITIAL_TRANSACTIONS = [
  {
    id: 'tx-1',
    description: 'Tech Corp Monthly Salary',
    amount: 5200,
    type: 'income',
    category: 'salary',
    account: 'checking',
    date: daysAgo(2),
    notes: 'Direct deposit monthly payroll',
    tags: ['work', 'payroll']
  },
  {
    id: 'tx-2',
    description: 'Apartment Monthly Rent',
    amount: 1450,
    type: 'expense',
    category: 'housing',
    account: 'checking',
    date: daysAgo(3),
    notes: 'Downtown 2BHK rental payment',
    tags: ['fixed', 'essential']
  },
  {
    id: 'tx-3',
    description: 'Trader Joe\'s Grocery Haul',
    amount: 124.60,
    type: 'expense',
    category: 'shopping',
    account: 'credit_card',
    date: daysAgo(1),
    notes: 'Weekly fresh groceries and organics',
    tags: ['food', 'groceries']
  },
  {
    id: 'tx-4',
    description: 'Freelance UI/UX Client Project',
    amount: 850,
    type: 'income',
    category: 'freelance',
    account: 'digital_wallet',
    date: daysAgo(5),
    notes: 'Mobile app design deliverables milestone 2',
    tags: ['freelance', 'design']
  },
  {
    id: 'tx-5',
    description: 'Olive Garden Dinner with Friends',
    amount: 86.40,
    type: 'expense',
    category: 'food',
    account: 'credit_card',
    date: daysAgo(0),
    notes: 'Italian dinner party',
    tags: ['social', 'dining']
  },
  {
    id: 'tx-6',
    description: 'Electric & Gas Utility Bill',
    amount: 115.30,
    type: 'expense',
    category: 'bills',
    account: 'checking',
    date: daysAgo(4),
    notes: 'Monthly utility provider statement',
    tags: ['utilities']
  },
  {
    id: 'tx-7',
    description: 'Shell Gas Station Refuel',
    amount: 52.80,
    type: 'expense',
    category: 'transport',
    account: 'credit_card',
    date: daysAgo(2),
    notes: 'Full tank premium gas',
    tags: ['car', 'fuel']
  },
  {
    id: 'tx-8',
    description: 'Monthly Index Fund Investment',
    amount: 750,
    type: 'expense',
    category: 'investments',
    account: 'savings',
    date: daysAgo(6),
    notes: 'Automated transfer to S&P 500 ETF',
    tags: ['wealth', 'stocks']
  },
  {
    id: 'tx-9',
    description: 'High-Yield Savings Interest',
    amount: 42.15,
    type: 'income',
    category: 'invest_returns',
    account: 'savings',
    date: daysAgo(7),
    notes: 'Monthly APY interest payment',
    tags: ['passive']
  },
  {
    id: 'tx-10',
    description: 'IMAX Cinema Movie Tickets & Snacks',
    amount: 44.50,
    type: 'expense',
    category: 'entertainment',
    account: 'credit_card',
    date: daysAgo(3),
    notes: 'Sci-fi movie premiere',
    tags: ['fun']
  },
  {
    id: 'tx-11',
    description: 'Pharmacy & Wellness Supplements',
    amount: 38.90,
    type: 'expense',
    category: 'health',
    account: 'credit_card',
    date: daysAgo(8),
    notes: 'Vitamins and protein powder',
    tags: ['health']
  },
  {
    id: 'tx-12',
    description: 'Online Masterclass & Course',
    amount: 89.00,
    type: 'expense',
    category: 'education',
    account: 'digital_wallet',
    date: daysAgo(10),
    notes: 'Full Stack React & Architecture Masterclass',
    tags: ['upskilling']
  },
  {
    id: 'tx-13',
    description: 'Starbucks Coffee & Croissant',
    amount: 12.75,
    type: 'expense',
    category: 'food',
    account: 'cash',
    date: daysAgo(1),
    notes: 'Morning coffee before work',
    tags: ['coffee']
  },
  {
    id: 'tx-14',
    description: 'Uber Ride to Downtown',
    amount: 24.50,
    type: 'expense',
    category: 'transport',
    account: 'credit_card',
    date: daysAgo(4),
    notes: 'Evening ride',
    tags: ['transport']
  },
  {
    id: 'tx-15',
    description: 'Consulting Advisory Call',
    amount: 300,
    type: 'income',
    category: 'freelance',
    account: 'checking',
    date: daysAgo(9),
    notes: '1-hour tech roadmap advisory',
    tags: ['consulting']
  }
];

