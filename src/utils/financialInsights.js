/**
 * Financial Intelligence Engine
 * Computes health scores, overspending alerts, burn rate, and actionable tips.
 */
export function analyzeFinances(transactions, budgets, subscriptions = []) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // Filter current month transactions
  const monthTransactions = transactions.filter(t => {
    const d = new Date(t.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const totalIncome = monthTransactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + Number(t.amount || 0), 0);

  const totalExpenses = monthTransactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + Number(t.amount || 0), 0);

  const netSavings = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? Math.max(0, Math.round((netSavings / totalIncome) * 100)) : 0;

  // Day of month & Burn rate projection
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const dayOfMonth = Math.max(1, now.getDate());
  const dailyBurnRate = totalExpenses / dayOfMonth;
  const projectedMonthlyExpense = dailyBurnRate * daysInMonth;

  // Category totals
  const categoryExpenses = {};
  monthTransactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      categoryExpenses[t.category] = (categoryExpenses[t.category] || 0) + Number(t.amount || 0);
    });

  // Budget checks
  const budgetAlerts = [];
  let totalBudget = 0;
  Object.entries(budgets).forEach(([catId, limit]) => {
    totalBudget += limit;
    const spent = categoryExpenses[catId] || 0;
    const percent = Math.round((spent / limit) * 100);

    if (percent >= 100) {
      budgetAlerts.push({
        categoryId: catId,
        spent,
        limit,
        percent,
        severity: 'danger',
        message: `Exceeded budget by ${(percent - 100)}% (${(spent - limit).toFixed(0)} over limit)`
      });
    } else if (percent >= 80) {
      budgetAlerts.push({
        categoryId: catId,
        spent,
        limit,
        percent,
        severity: 'warning',
        message: `Reached ${percent}% of monthly budget allowance`
      });
    }
  });

  // Calculate Smart Health Score (0 - 100)
  let healthScore = 50;

  // 1. Savings rate component (up to +35 pts)
  if (savingsRate >= 30) healthScore += 35;
  else if (savingsRate >= 20) healthScore += 25;
  else if (savingsRate >= 10) healthScore += 15;
  else if (savingsRate > 0) healthScore += 5;
  else healthScore -= 20;

  // 2. Budget adherence component (up to +20 pts)
  const overBudgetCount = budgetAlerts.filter(a => a.severity === 'danger').length;
  if (overBudgetCount === 0) healthScore += 15;
  else healthScore -= overBudgetCount * 8;

  // 3. Projected vs Income
  if (totalIncome > 0 && projectedMonthlyExpense < totalIncome * 0.75) {
    healthScore += 15;
  } else if (totalIncome > 0 && projectedMonthlyExpense > totalIncome) {
    healthScore -= 15;
  }

  // Bound score between 10 and 99
  healthScore = Math.max(12, Math.min(98, Math.round(healthScore)));

  // Generate Personalized Insights & Tips
  const tips = [];

  if (savingsRate >= 30) {
    tips.push({
      type: 'positive',
      title: 'Superb Savings Discipline',
      description: `You are saving ${savingsRate}% of your income this month! Consider routing the surplus into index funds or high-yield deposits.`
    });
  } else if (savingsRate < 10 && totalIncome > 0) {
    tips.push({
      type: 'warning',
      title: 'Low Savings Cushion',
      description: `Your savings rate is currently ${savingsRate}%. Standard financial hygiene recommends aiming for at least 20% to build emergency reserves.`
    });
  }

  // Top spending category
  let topCategory = null;
  let maxSpend = 0;
  Object.entries(categoryExpenses).forEach(([cat, val]) => {
    if (val > maxSpend) {
      maxSpend = val;
      topCategory = cat;
    }
  });

  if (topCategory && maxSpend > 0) {
    tips.push({
      type: 'info',
      title: 'Top Expenditure Stream',
      description: `Your largest expense sector is ${topCategory} ($${maxSpend.toFixed(0)}), accounting for ${Math.round((maxSpend / (totalExpenses || 1)) * 100)}% of total outflows.`
    });
  }

  // Monthly Subscriptions load
  const activeSubs = subscriptions.filter(s => s.status === 'active');
  const monthlySubCost = activeSubs.reduce((sum, s) => {
    return sum + (s.billingCycle === 'yearly' ? s.amount / 12 : s.amount);
  }, 0);

  if (monthlySubCost > 50) {
    tips.push({
      type: 'tip',
      title: 'Recurring Subscriptions Audit',
      description: `You have ${activeSubs.length} active recurring subscriptions totaling ~$${monthlySubCost.toFixed(2)}/mo. Regular audits often reveal $20-$40 in unused services.`
    });
  }

  return {
    totalIncome,
    totalExpenses,
    netSavings,
    savingsRate,
    dailyBurnRate,
    projectedMonthlyExpense,
    totalBudget,
    categoryExpenses,
    budgetAlerts,
    healthScore,
    tips
  };
}

