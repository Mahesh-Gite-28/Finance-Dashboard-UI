import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { buildCategoryPieData, formatCurrency } from "../../utils/helpers";

const COLORS = ["#0f172a", "#1d4ed8", "#16a34a", "#d97706", "#dc2626", "#7c3aed"];

export function CategoryPieChart({ transactions }) {
  const data = buildCategoryPieData(transactions);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-base font-semibold">Expense by Category</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" outerRadius={95} label>
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatCurrency(value)} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
