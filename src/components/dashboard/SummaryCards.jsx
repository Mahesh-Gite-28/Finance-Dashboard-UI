import { Card } from "../ui/Card";
import { formatCurrency, summarizeTransactions } from "../../utils/helpers";

export function SummaryCards({ transactions }) {
  const { income, expense } = summarizeTransactions(transactions);
  const balance = income - expense;

  const cards = [
    { title: "Balance", value: formatCurrency(balance), valueClassName: "text-slate-900 dark:text-slate-100" },
    { title: "Income", value: formatCurrency(income), valueClassName: "text-income" },
    { title: "Expense", value: formatCurrency(expense), valueClassName: "text-expense" }
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((item) => (
        <Card key={item.title} title={item.title} value={item.value} valueClassName={item.valueClassName} />
      ))}
    </section>
  );
}
