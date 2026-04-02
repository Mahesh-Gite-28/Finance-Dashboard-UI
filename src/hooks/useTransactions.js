import { useMemo } from "react";
import { useAppContext } from "../context/AppContext";

function byDate(a, b, order) {
  const result = new Date(a.date) - new Date(b.date);
  return order === "asc" ? result : -result;
}

function byAmount(a, b, order) {
  const result = a.amount - b.amount;
  return order === "asc" ? result : -result;
}

export function useTransactions() {
  const { transactions, filters, setFilters } = useAppContext();

  const categories = useMemo(() => {
    const unique = new Set(transactions.map((tx) => tx.category));
    return ["all", ...Array.from(unique).sort((a, b) => a.localeCompare(b))];
  }, [transactions]);

  const processedTransactions = useMemo(() => {
    const searchTerm = filters.search.toLowerCase().trim();
    const filtered = transactions.filter((tx) => {
      const matchesSearch =
        !searchTerm ||
        tx.description.toLowerCase().includes(searchTerm) ||
        tx.category.toLowerCase().includes(searchTerm);
      const matchesType = filters.type === "all" || tx.type === filters.type;
      const matchesCategory = filters.category === "all" || tx.category === filters.category;
      return matchesSearch && matchesType && matchesCategory;
    });

    return filtered.sort((a, b) => {
      if (filters.sortBy === "amount") return byAmount(a, b, filters.sortOrder);
      return byDate(a, b, filters.sortOrder);
    });
  }, [transactions, filters]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return {
    transactions: processedTransactions,
    categories,
    filters,
    updateFilter
  };
}
