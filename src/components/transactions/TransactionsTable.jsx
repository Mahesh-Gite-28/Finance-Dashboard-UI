import { formatCurrency, formatDisplayDate } from "../../utils/helpers";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

export function TransactionsTable({ transactions, isAdmin, onDelete }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-600">
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
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3">{formatDisplayDate(tx.date)}</td>
                <td className="px-4 py-3">{tx.description}</td>
                <td className="px-4 py-3">{tx.category}</td>
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
          </tbody>
        </table>
      </div>
    </div>
  );
}
