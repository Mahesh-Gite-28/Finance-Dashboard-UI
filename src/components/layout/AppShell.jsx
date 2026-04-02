import { Header } from "./Header";
import { SidebarNav } from "./SidebarNav";

export function AppShell({ role, onRoleChange, theme, currentPage, onChangePage, children }) {
  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"}`}>
      <Header role={role} onRoleChange={onRoleChange} />
      <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-[220px_1fr]">
        <SidebarNav currentPage={currentPage} onChangePage={onChangePage} />
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
