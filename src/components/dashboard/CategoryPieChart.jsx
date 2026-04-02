import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { buildCategoryPieData, formatCurrency } from "../../utils/helpers";
import { EmptyState } from "../ui/EmptyState";

const COLORS = ["#0f172a", "#1d4ed8", "#16a34a", "#d97706", "#dc2626", "#7c3aed"];

export function CategoryPieChart({ transactions }) {
  const data = buildCategoryPieData(transactions);
  if (!data.length) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h3 className="mb-4 text-base font-semibold text-slate-900 dark:text-slate-100">Expense by Category</h3>
        <EmptyState
          icon="chart"
          title="No expense categories yet"
          description="Add at least one expense transaction to visualize category distribution."
        />
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-4 text-base font-semibold text-slate-900 dark:text-slate-100">Expense by Category</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={95}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [formatCurrency(value), "Spent"]}
              contentStyle={{ borderRadius: "12px", border: "1px solid #cbd5e1" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
