import { useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";
import { useAppContext } from "../../context/AppContext";
import { exportTransactionsCsv } from "../../utils/helpers";
import { EmptyState } from "../ui/EmptyState";
import { AddTransactionModal } from "./AddTransactionModal";
import { TransactionsTable } from "./TransactionsTable";
import { TransactionsToolbar } from "./TransactionsToolbar";

export function TransactionsContainer() {
  const { transactions, categories, filters, updateFilter } = useTransactions();
  const { role, addTransaction, deleteTransaction, updateTransaction } = useAppContext();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const isAdmin = role === "admin";

  const handleExport = () => {
    setIsExporting(true);
    exportTransactionsCsv(transactions);
    window.setTimeout(() => setIsExporting(false), 450);
  };

  return (
    <section className="space-y-4">
      <TransactionsToolbar
        filters={{
          ...filters,
          categoryOptions: categories,
          isExporting
        }}
        onFilterChange={updateFilter}
        isAdmin={isAdmin}
        onAdd={() => setIsAddModalOpen(true)}
        onExport={handleExport}
      />
      {transactions.length ? (
        <TransactionsTable
          transactions={transactions}
          isAdmin={isAdmin}
          onDelete={deleteTransaction}
          onEdit={setEditingTransaction}
          groupBy={filters.groupBy}
        />
      ) : (
        <EmptyState
          icon="filter"
          title="No transactions found"
          description="Try changing your search or advanced filters to find matching records."
        />
      )}
      <AddTransactionModal
        isOpen={isAddModalOpen && isAdmin}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={addTransaction}
        mode="add"
      />
      <AddTransactionModal
        isOpen={Boolean(editingTransaction) && isAdmin}
        onClose={() => setEditingTransaction(null)}
        onSubmit={updateTransaction}
        initialValues={editingTransaction}
        mode="edit"
      />
    </section>
  );
}
