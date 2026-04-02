import { Fragment } from "react";
import { formatCurrency, formatDisplayDate } from "../../utils/helpers";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

function getGroupKey(transaction, groupBy) {
  if (groupBy === "date") return formatDisplayDate(transaction.date);
  if (groupBy === "category") return transaction.category;
  return "All Transactions";
}

function buildRowsWithGroups(transactions, groupBy) {
  if (groupBy === "none") return [{ kind: "rows", label: "", items: transactions }];

  const groups = transactions.reduce((acc, tx) => {
    const key = getGroupKey(tx, groupBy);
    if (!acc[key]) acc[key] = [];
    acc[key].push(tx);
    return acc;
  }, {});

  return Object.keys(groups).map((label) => ({ kind: "rows", label, items: groups[label] }));
}

export function TransactionsTable({ transactions, isAdmin, onDelete, groupBy = "none" }) {
  const grouped = buildRowsWithGroups(transactions, groupBy);

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Amount</th>
              {isAdmin ? <th className="px-4 py-3">Action</th> : null}
            </tr>
          </thead>
          <tbody>
            {grouped.map((group) => (
              <Fragment key={group.label || "all"}>
                {groupBy !== "none" ? (
                  <tr key={`group-${group.label}`} className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/60">
                    <td
                      className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300"
                      colSpan={isAdmin ? 6 : 5}
                    >
                      {group.label}
                    </td>
                  </tr>
                ) : null}
                {group.items.map((tx) => (
                  <tr key={tx.id} className="border-t border-slate-100 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50">
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-200">{formatDisplayDate(tx.date)}</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-200">{tx.description}</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-200">{tx.category}</td>
                    <td className="px-4 py-3">
                      <Badge type={tx.type} />
                    </td>
                    <td className={`px-4 py-3 font-semibold ${tx.type === "income" ? "text-income" : "text-expense"}`}>
                      {formatCurrency(tx.amount)}
                    </td>
                    {isAdmin ? (
                      <td className="px-4 py-3">
                        <Button variant="danger" onClick={() => onDelete(tx.id)}>
                          Delete
                        </Button>
                      </td>
                    ) : null}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
