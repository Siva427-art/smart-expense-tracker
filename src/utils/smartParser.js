/**
 * Natural Language Transaction Parser
 * Parses natural strings like:
 * "Spent $45.50 on dinner with team at Bistro yesterday using credit card"
 * "Got $3200 freelance payment into checking account"
 * "Uber ride $24 transport"
 * "Bought headphones 89 on amazon"
 */
export function parseNaturalLanguageTransaction(text) {
  if (!text || typeof text !== 'string') return null;

  const raw = text.trim();
  let type = 'expense';
  let amount = null;
  let category = 'other_expense';
  let account = 'checking';
  let date = new Date().toISOString().split('T')[0];
  let description = raw;

  // 1. Detect Type
  const incomeKeywords = ['income', 'salary', 'received', 'got', 'deposit', 'bonus', 'freelance', 'dividend', 'refund', 'earned', 'credited'];
  const lower = raw.toLowerCase();
  
  if (incomeKeywords.some(kw => lower.includes(kw))) {
    type = 'income';
    category = 'other_income';
  }

  // 2. Extract Amount ($45.50, 45$, 45.50, ₹500, €30, etc.)
  const amountRegex = /(?:[\$€£₹¥]\s*|\b(?:rs|usd|eur|gbp|inr)\s*)?(\d+(?:[.,]\d{1,2})?)(?:\s*[\$€£₹¥])?/i;
  const matchAmount = raw.match(amountRegex);
  if (matchAmount && matchAmount[1]) {
    amount = parseFloat(matchAmount[1].replace(',', '.'));
  }

  // 3. Extract Date (yesterday, today, days ago, or dates like 2026-11-20 or Nov 20)
  if (/\byesterday\b/i.test(lower)) {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    date = d.toISOString().split('T')[0];
  } else if (/\b(\d+)\s*days?\s*ago\b/i.test(lower)) {
    const days = parseInt(lower.match(/\b(\d+)\s*days?\s*ago\b/i)[1], 10);
    const d = new Date();
    d.setDate(d.getDate() - days);
    date = d.toISOString().split('T')[0];
  }

  // 4. Category Classification
  const categoryRules = [
    { cat: 'food', type: 'expense', keywords: ['food', 'dinner', 'lunch', 'breakfast', 'pizza', 'burger', 'restaurant', 'cafe', 'coffee', 'starbucks', 'bistro', 'bar', 'drinks', 'mcdonalds', 'kfc', 'swiggy', 'zomato', 'eat'] },
    { cat: 'shopping', type: 'expense', keywords: ['shopping', 'grocery', 'groceries', 'walmart', 'supermarket', 'target', 'clothes', 'shoes', 'amazon', 'mall', 'bought', 'purchase', 'gear'] },
    { cat: 'transport', type: 'expense', keywords: ['uber', 'lyft', 'taxi', 'gas', 'fuel', 'petrol', 'diesel', 'metro', 'subway', 'bus', 'train', 'parking', 'toll', 'flight'] },
    { cat: 'housing', type: 'expense', keywords: ['rent', 'mortgage', 'maintenance', 'repairs', 'plumber', 'furniture', 'apartment', 'house'] },
    { cat: 'bills', type: 'expense', keywords: ['bill', 'utility', 'electricity', 'water', 'internet', 'wifi', 'phone', 'recharge', 'gas bill'] },
    { cat: 'entertainment', type: 'expense', keywords: ['netflix', 'spotify', 'movie', 'cinema', 'game', 'steam', 'concert', 'club', 'party', 'disney'] },
    { cat: 'health', type: 'expense', keywords: ['doctor', 'hospital', 'medicine', 'pharmacy', 'gym', 'fitness', 'dentist', 'clinic', 'vitamins'] },
    { cat: 'education', type: 'expense', keywords: ['course', 'book', 'udemy', 'tuition', 'school', 'university', 'bootcamp', 'copilot', 'chatgpt'] },
    { cat: 'investments', type: 'expense', keywords: ['crypto', 'stocks', 'etf', 'index fund', 'shares', 'invest', 'bitcoin', 'mutual fund'] },
    { cat: 'salary', type: 'income', keywords: ['salary', 'paycheck', 'payroll', 'wages', 'compensation'] },
    { cat: 'freelance', type: 'income', keywords: ['freelance', 'client', 'consulting', 'gig', 'upwork', 'fiverr'] },
    { cat: 'invest_returns', type: 'income', keywords: ['dividend', 'interest', 'capital gain', 'crypto profit'] },
    { cat: 'rental', type: 'income', keywords: ['rent received', 'tenant', 'rental income'] },
    { cat: 'gifts', type: 'income', keywords: ['gift', 'reward', 'cashback', 'prize', 'bonus'] },
  ];

  for (const rule of categoryRules) {
    if (rule.keywords.some(kw => lower.includes(kw))) {
      category = rule.cat;
      type = rule.type;
      break;
    }
  }

  // 5. Detect Account
  if (/credit\s*card|credit/i.test(lower)) {
    account = 'credit_card';
  } else if (/cash/i.test(lower)) {
    account = 'cash';
  } else if (/savings/i.test(lower)) {
    account = 'savings';
  } else if (/upi|wallet|paypal|apple\s*pay|google\s*pay/i.test(lower)) {
    account = 'digital_wallet';
  } else {
    account = 'checking';
  }

  // 6. Clean Description
  // Remove filler words to make description clean
  let cleaned = raw
    .replace(/(?:spent|paid|bought|received|got|earned|credited)\s+/gi, '')
    .replace(/for\s+/gi, '')
    .replace(/using\s+(?:credit\s*card|cash|checking|savings|upi|wallet)/gi, '')
    .replace(/(?:today|yesterday|\d+\s*days?\s*ago)/gi, '')
    .replace(/(?:[\$€£₹¥]\s*|\b(?:rs|usd|eur|gbp|inr)\s*)?(\d+(?:[.,]\d{1,2})?)(?:\s*[\$€£₹¥])?/i, '')
    .trim();

  // Capitalize first letter
  if (cleaned.length > 0) {
    cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
    description = cleaned;
  } else {
    description = type === 'income' ? 'Income' : 'Expense';
  }

  return {
    description,
    amount: amount || 0,
    type,
    category,
    account,
    date,
    notes: `Added via Smart Assistant: "${raw}"`
  };
}

