import { useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";
import { useAppContext } from "../../context/AppContext";
import { exportTransactionsCsv } from "../../utils/helpers";
import { EmptyState } from "../ui/EmptyState";
import { AddTransactionModal } from "./AddTransactionModal";
import { TransactionsTable } from "./TransactionsTable";
import { TransactionsToolbar } from "./TransactionsToolbar";

export function TransactionsContainer() {
  const { transactions, filters, updateFilter } = useTransactions();
  const { role, addTransaction, deleteTransaction } = useAppContext();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const isAdmin = role === "admin";

  return (
    <section className="space-y-4">
      <TransactionsToolbar
        filters={filters}
        onFilterChange={updateFilter}
        isAdmin={isAdmin}
        onAdd={() => setIsAddModalOpen(true)}
        onExport={() => exportTransactionsCsv(transactions)}
      />
      {transactions.length ? (
        <TransactionsTable transactions={transactions} isAdmin={isAdmin} onDelete={deleteTransaction} />
      ) : (
        <EmptyState title="No transactions found" description="Try changing your search/filter or add a new transaction." />
      )}
      <AddTransactionModal isOpen={isAddModalOpen && isAdmin} onClose={() => setIsAddModalOpen(false)} onSubmit={addTransaction} />
    </section>
  );
}
