import { useMemo, useState } from "react";
import { AppProvider, useAppContext } from "./context/AppContext";
import { AppShell } from "./components/layout/AppShell";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";

function AppContent() {
  const { role, setRole } = useAppContext();
  const [page, setPage] = useState("dashboard");

  const pageContent = useMemo(() => {
    if (page === "transactions") return <Transactions />;
    if (page === "insights") return <Insights />;
    return <Dashboard />;
  }, [page]);

  return (
    <AppShell role={role} onRoleChange={setRole} currentPage={page} onChangePage={setPage}>
      {pageContent}
    </AppShell>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
