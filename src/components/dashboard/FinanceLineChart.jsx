import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { buildLineChartData, formatCurrency } from "../../utils/helpers";

export function FinanceLineChart({ transactions }) {
  const data = buildLineChartData(transactions);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-4 text-base font-semibold text-slate-900 dark:text-slate-100">Balance Trend</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#64748b" }} />
            <YAxis tickFormatter={(value) => formatCurrency(value)} tick={{ fontSize: 12, fill: "#64748b" }} />
            <Tooltip
              formatter={(value) => [formatCurrency(value), "Balance"]}
              labelFormatter={(value) => `Date: ${value}`}
              contentStyle={{ borderRadius: "12px", border: "1px solid #cbd5e1" }}
            />
            <Line type="monotone" dataKey="balance" stroke="#0f172a" strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
