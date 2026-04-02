import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { initialTransactions } from "../data/mockData";

const AppContext = createContext(null);
const STORAGE_KEY = "finance-dashboard-state";

const defaultFilters = {
  search: "",
  type: "all",
  category: "all",
  sortBy: "date",
  sortOrder: "desc",
  groupBy: "none"
};

function getInitialState() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return {
      transactions: initialTransactions,
      role: "admin",
      theme: "light",
      filters: defaultFilters
    };
  }

  try {
    const parsed = JSON.parse(stored);
    return {
      transactions: parsed.transactions || initialTransactions,
      role: parsed.role || "admin",
      theme: parsed.theme || "light",
      filters: { ...defaultFilters, ...(parsed.filters || {}) }
    };
  } catch {
    return {
      transactions: initialTransactions,
      role: "admin",
      theme: "light",
      filters: defaultFilters
    };
  }
}

export function AppProvider({ children }) {
  const initial = useMemo(() => getInitialState(), []);
  const [transactions, setTransactions] = useState(initial.transactions);
  const [role, setRole] = useState(initial.role);
  const [theme, setTheme] = useState(initial.theme);
  const [filters, setFilters] = useState(initial.filters);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ transactions, role, theme, filters }));
  }, [transactions, role, theme, filters]);

  const addTransaction = (transaction) => {
    if (role !== "admin") return;
    setTransactions((prev) => [{ ...transaction, id: crypto.randomUUID() }, ...prev]);
  };

  const deleteTransaction = (id) => {
    if (role !== "admin") return;
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  const updateTransaction = (updatedTransaction) => {
    if (role !== "admin") return;
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === updatedTransaction.id ? { ...tx, ...updatedTransaction } : tx))
    );
  };

  const value = {
    transactions,
    role,
    theme,
    filters,
    setRole,
    setTheme,
    setFilters,
    addTransaction,
    deleteTransaction,
    updateTransaction
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
}
