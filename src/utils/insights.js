export function getHighestSpendingCategory(transactions) {
  const expenseTotals = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    }, {});

  const entries = Object.entries(expenseTotals);
  if (!entries.length) return { category: "N/A", amount: 0 };

  const [category, amount] = entries.sort((a, b) => b[1] - a[1])[0];
  return { category, amount };
}

export function getMonthlyComparison(transactions) {
  const monthTotals = transactions.reduce((acc, tx) => {
    const month = tx.date.slice(0, 7);
    if (!acc[month]) acc[month] = { income: 0, expense: 0 };
    if (tx.type === "income") acc[month].income += tx.amount;
    if (tx.type === "expense") acc[month].expense += tx.amount;
    return acc;
  }, {});

  const months = Object.keys(monthTotals).sort();
  if (months.length < 2) {
    return { currentMonth: months[0] || "N/A", previousMonth: "N/A", delta: 0 };
  }

  const currentMonth = months[months.length - 1];
  const previousMonth = months[months.length - 2];
  const currentNet = monthTotals[currentMonth].income - monthTotals[currentMonth].expense;
  const previousNet = monthTotals[previousMonth].income - monthTotals[previousMonth].expense;

  return { currentMonth, previousMonth, delta: currentNet - previousNet };
}

export function buildInsights(transactions) {
  const highest = getHighestSpendingCategory(transactions);
  const monthly = getMonthlyComparison(transactions);
  const totalCount = transactions.length;
  const expenseCount = transactions.filter((tx) => tx.type === "expense").length;
  const expenseRatio = totalCount ? Math.round((expenseCount / totalCount) * 100) : 0;

  return [
    `Highest spending category is ${highest.category} (${highest.amount}).`,
    `Net change from ${monthly.previousMonth} to ${monthly.currentMonth}: ${monthly.delta}.`,
    `${expenseRatio}% of recorded transactions are expenses.`
  ];
}
