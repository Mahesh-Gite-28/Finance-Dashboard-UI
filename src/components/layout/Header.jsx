import { Select } from "../ui/Select";
import { useAppContext } from "../../context/AppContext";

const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "viewer", label: "Viewer" }
];

export function Header({ role, onRoleChange }) {
  const { theme, setTheme } = useAppContext();

  return (
    <header className="flex flex-col gap-3 border-b border-slate-200 bg-white/95 p-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-900/95">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Finance Dashboard</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Track money, trends, and insights</p>
      </div>
      <div className="flex w-full items-end gap-2 sm:w-auto">
        <button
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
        <div className="w-full sm:w-48">
        <Select
          label="Role"
          options={roleOptions}
          value={role}
          onChange={(event) => onRoleChange(event.target.value)}
        />
        </div>
      </div>
    </header>
  );
}
