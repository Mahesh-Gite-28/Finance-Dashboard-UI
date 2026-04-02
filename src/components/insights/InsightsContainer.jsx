import { useAppContext } from "../../context/AppContext";
import { buildInsights, getHighestSpendingCategory, getMonthlyComparison } from "../../utils/insights";
import { formatCurrency } from "../../utils/helpers";
import { EmptyState } from "../ui/EmptyState";
import { InsightCard } from "./InsightCard";

function formatMonthLabel(monthKey) {
  if (!monthKey || monthKey === "N/A") return "N/A";
  const [year, month] = monthKey.split("-");
  return new Date(Number(year), Number(month) - 1, 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric"
  });
}

export function InsightsContainer() {
  const { transactions } = useAppContext();

  if (!transactions.length) {
    return (
      <EmptyState
        icon="lightbulb"
        title="No insights available"
        description="Add transactions to unlock spending behavior insights and monthly comparisons."
      />
    );
  }

  const highest = getHighestSpendingCategory(transactions);
  const monthly = getMonthlyComparison(transactions);
  const notes = buildInsights(transactions);

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <InsightCard title="Top Expense Category" content={`${highest.category} with ${formatCurrency(highest.amount)} spent.`} />
      <InsightCard
        title="Monthly Net Comparison"
        content={`Change from ${formatMonthLabel(monthly.previousMonth)} to ${formatMonthLabel(monthly.currentMonth)}: ${formatCurrency(
          monthly.delta
        )}.`}
      />
      <InsightCard title="Behavioral Insight #1" content={notes[0]} />
      <InsightCard title="Behavioral Insight #2" content={notes[1]} />
      <InsightCard title="Behavioral Insight #3" content={notes[2]} />
    </section>
  );
}
