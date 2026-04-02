export const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

export function formatCurrency(value) {
  return currency.format(value || 0);
}

export function formatDisplayDate(value) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

export function summarizeTransactions(transactions) {
  return transactions.reduce(
    (acc, tx) => {
      if (tx.type === "income") acc.income += tx.amount;
      if (tx.type === "expense") acc.expense += tx.amount;
      return acc;
    },
    { income: 0, expense: 0 }
  );
}

export function buildLineChartData(transactions) {
  const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
  let runningBalance = 0;
  return sorted.map((tx) => {
    runningBalance += tx.type === "income" ? tx.amount : -tx.amount;
    return {
      date: formatDisplayDate(tx.date),
      balance: runningBalance
    };
  });
}

export function buildCategoryPieData(transactions) {
  const categoryTotals = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    }, {});

  return Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));
}

export function exportTransactionsCsv(transactions) {
  const header = ["Date", "Description", "Category", "Type", "Amount"];
  const rows = transactions.map((tx) => [tx.date, tx.description, tx.category, tx.type, tx.amount]);
  const sanitize = (value) => `"${String(value).replace(/"/g, '""')}"`;
  const csv = [header, ...rows]
    .map((row) => row.map(sanitize).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  const timestamp = new Date().toISOString().slice(0, 10);
  link.setAttribute("download", `transactions-${timestamp}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
