# 💰 SpendWise PRO — Smart AI Expense Tracker & Financial Intelligence

An advanced, production-grade **Smart Expense Tracker & Financial Copilot** built with **React**, **Vite**, **Tailwind CSS**, and **Recharts**.

---

## ✨ Advanced Features

### 1. 🤖 AI Natural Language Quick Add (Smart NLP Parser)
- Type transactions in plain conversational English:
  - *"Dinner at Italian bistro $54.20 yesterday using credit card"*
  - *"Got 1500 freelance client payment into checking account"*
  - *"Uber ride to downtown 24.50 transport"*
- The smart parser automatically extracts:
  - **Amount**
  - **Type** (Income / Expense)
  - **Category** (Food, Transport, Salary, Freelance, Shopping, etc.)
  - **Date** (Today, Yesterday, relative days)
  - **Account** (Credit Card, Checking, Cash, Savings, Wallet/UPI)

### 2. 📊 Real-Time Financial Analytics & Dynamic Charts
- **Interactive Donut Chart**: Expense distribution by category with percentage tooltips and dynamic color-coded progress bars.
- **7-Day Cashflow Trends**: Comparative bar chart of income inflows vs. expense outflows.
- **Burn Rate & Projection**: Daily burn rate calculation and projected month-end expenditure.

### 3. 🛡️ AI Financial Copilot & Health Score
- **0–100 Financial Health Score** calculated from savings ratios, budget discipline, and spending regularity.
- **Automated Budget Alerts**: Warning at 80% consumption, danger alerts if a category budget is breached.
- **Actionable Tips**: Personalized savings advice and recurring subscription load audits.

### 4. 🎯 Budgets & Category Goals
- Set and adjust custom monthly spending limits per category.
- Visual status meters displaying consumed percentage and remaining buffer.

### 5. 📅 Subscriptions & Recurring Bills Manager
- Track active monthly/yearly subscriptions (e.g., Netflix, Spotify, Gym, Cloud services).
- Calculate total monthly recurring burn and projected annual cost.
- Pause, resume, and manage renewal schedules.

### 6. 👥 Smart Bill Splitter & Share Calculator
- Split group dinners or shared bills with custom tip percentages and tax amounts.
- Distribute equally or custom-tailored per person.
- One-click copy formatted WhatsApp / SMS breakdown summary.
- Direct option to record your personal share straight into the transaction ledger.

### 7. 💾 Local-First Persistence & Data Portability
- Instant offline persistence via `localStorage`.
- **Export to CSV**: Downloadable spreadsheet format for Excel/Google Sheets.
- **Export to JSON**: Full data backup.
- **Reset to Demo Data**: Instant restore option for testing and showcase.
- **Multi-Currency Support**: Switch on-the-fly between USD ($), EUR (€), GBP (£), INR (₹), CAD (CA$), AUD (A$), and JPY (¥).
- **Dark Mode**: High-contrast, clean theme toggling with glassmorphic accents.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:3000` (or the port specified in terminal).

### 3. Build for Production
```bash
npm run build
```

---

## 📁 Project Structure

```
Smart Expense Tracker/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── src/
    ├── main.jsx
    ├── index.css
    ├── App.jsx
    ├── constants/
    │   └── index.js               # Categories, Currencies, Accounts, Sample Data
    ├── context/
    │   └── ExpenseContext.jsx      # Global State, Filter Store, CRUD, LocalStorage
    ├── utils/
    │   ├── formatters.js          # Currency, Date, and Relative time helpers
    │   ├── smartParser.js         # NLP string extraction engine
    │   └── financialInsights.js   # Health score, burn rate & advice generator
    └── components/
        ├── Navbar.jsx             # Top bar, Tabs, Theme toggle, Exporters
        ├── StatCards.jsx          # Balance, Income, Expense, Health score
        ├── ChartsSection.jsx      # Recharts Donut & Bar trends
        ├── FinancialInsightsCard.jsx # AI Copilot advice card
        ├── TransactionList.jsx    # Table, Search, Multi-Filter & Pagination
        ├── TransactionModal.jsx   # Add / Edit modal
        ├── SmartQuickAddModal.jsx # NLP Quick Add dialog
        ├── BudgetModal.jsx        # Budget targets manager
        ├── SubscriptionsView.jsx  # Recurring bills manager
        ├── SplitBillModal.jsx     # Group bill calculator
        └── CategoryIcon.jsx       # Dynamic Lucide icon renderer
```

