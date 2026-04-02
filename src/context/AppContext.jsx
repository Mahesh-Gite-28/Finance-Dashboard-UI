import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { initialTransactions } from "../data/mockData";

const AppContext = createContext(null);
const STORAGE_KEY = "finance-dashboard-state";

const defaultFilters = {
  search: "",
  type: "all",
  sortBy: "date",
  sortOrder: "desc"
};

function getInitialState() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return {
      transactions: initialTransactions,
      role: "admin",
      filters: defaultFilters
    };
  }

  try {
    const parsed = JSON.parse(stored);
    return {
      transactions: parsed.transactions || initialTransactions,
      role: parsed.role || "admin",
      filters: parsed.filters || defaultFilters
    };
  } catch {
    return {
      transactions: initialTransactions,
      role: "admin",
      filters: defaultFilters
    };
  }
}

export function AppProvider({ children }) {
  const initial = useMemo(() => getInitialState(), []);
  const [transactions, setTransactions] = useState(initial.transactions);
  const [role, setRole] = useState(initial.role);
  const [filters, setFilters] = useState(initial.filters);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ transactions, role, filters }));
  }, [transactions, role, filters]);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [{ ...transaction, id: crypto.randomUUID() }, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  const value = {
    transactions,
    role,
    filters,
    setRole,
    setFilters,
    addTransaction,
    deleteTransaction
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
}
