import { formatCurrency } from "./helpers";

function formatMonthLabel(monthKey) {
  if (!monthKey || monthKey === "N/A") return "N/A";
  const [year, month] = monthKey.split("-");
  return new Date(Number(year), Number(month) - 1, 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric"
  });
}

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
    return {
      currentMonth: months[0] || "N/A",
      previousMonth: "N/A",
      currentNet: months[0] ? monthTotals[months[0]].income - monthTotals[months[0]].expense : 0,
      previousNet: 0,
      delta: 0
    };
  }

  const currentMonth = months[months.length - 1];
  const previousMonth = months[months.length - 2];
  const currentNet = monthTotals[currentMonth].income - monthTotals[currentMonth].expense;
  const previousNet = monthTotals[previousMonth].income - monthTotals[previousMonth].expense;

  return { currentMonth, previousMonth, currentNet, previousNet, delta: currentNet - previousNet };
}

export function buildInsights(transactions) {
  const highest = getHighestSpendingCategory(transactions);
  const monthly = getMonthlyComparison(transactions);
  const totals = transactions.reduce(
    (acc, tx) => {
      if (tx.type === "income") acc.income += tx.amount;
      if (tx.type === "expense") acc.expense += tx.amount;
      return acc;
    },
    { income: 0, expense: 0 }
  );
  const net = totals.income - totals.expense;
  const topCategoryShare = totals.expense ? Math.round((highest.amount / totals.expense) * 100) : 0;
  const monthlyDirection = monthly.delta > 0 ? "up" : monthly.delta < 0 ? "down" : "flat";

  return [
    `${highest.category} is your largest expense at ${formatCurrency(highest.amount)}, about ${topCategoryShare}% of total spending.`,
    `Net cash flow is ${monthlyDirection} by ${formatCurrency(Math.abs(monthly.delta))} from ${formatMonthLabel(monthly.previousMonth)} to ${formatMonthLabel(monthly.currentMonth)}.`,
    `You have ${formatCurrency(net)} net balance across all records (${formatCurrency(totals.income)} income vs ${formatCurrency(totals.expense)} expenses).`
  ];
}
