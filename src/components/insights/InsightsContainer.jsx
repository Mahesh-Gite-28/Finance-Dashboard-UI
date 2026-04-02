import { useAppContext } from "../../context/AppContext";
import { buildInsights, getHighestSpendingCategory, getMonthlyComparison } from "../../utils/insights";
import { formatCurrency } from "../../utils/helpers";
import { EmptyState } from "../ui/EmptyState";
import { InsightCard } from "./InsightCard";

export function InsightsContainer() {
  const { transactions } = useAppContext();

  if (!transactions.length) {
    return <EmptyState title="No insights available" description="Add transactions to unlock spending insights." />;
  }

  const highest = getHighestSpendingCategory(transactions);
  const monthly = getMonthlyComparison(transactions);
  const notes = buildInsights(transactions);

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <InsightCard title="Top Expense Category" content={`${highest.category} with ${formatCurrency(highest.amount)} spent.`} />
      <InsightCard title="Monthly Net Comparison" content={`Change from ${monthly.previousMonth} to ${monthly.currentMonth}: ${formatCurrency(monthly.delta)}.`} />
      <InsightCard title="Behavioral Insight #1" content={notes[0]} />
      <InsightCard title="Behavioral Insight #2" content={notes[1]} />
      <InsightCard title="Behavioral Insight #3" content={notes[2]} />
    </section>
  );
}
