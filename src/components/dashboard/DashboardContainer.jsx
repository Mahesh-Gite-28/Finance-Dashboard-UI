import { CategoryPieChart } from "./CategoryPieChart";
import { FinanceLineChart } from "./FinanceLineChart";
import { SummaryCards } from "./SummaryCards";
import { EmptyState } from "../ui/EmptyState";

export function DashboardContainer({ transactions }) {
  if (!transactions.length) {
    return (
      <EmptyState
        icon="chart"
        title="No financial activity yet"
        description="Add your first transaction to unlock summaries, trends, and category analytics."
      />
    );
  }

  return (
    <section className="space-y-5">
      <SummaryCards transactions={transactions} />
      <div className="grid gap-5 lg:grid-cols-2">
        <FinanceLineChart transactions={transactions} />
        <CategoryPieChart transactions={transactions} />
      </div>
    </section>
  );
}
