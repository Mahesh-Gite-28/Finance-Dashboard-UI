import { Select } from "../ui/Select";

const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "viewer", label: "Viewer" }
];

export function Header({ role, onRoleChange }) {
  return (
    <header className="flex flex-col gap-3 border-b border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Finance Dashboard</h1>
        <p className="text-sm text-slate-500">Track money, trends, and insights</p>
      </div>
      <div className="w-full sm:w-48">
        <Select
          label="Role"
          options={roleOptions}
          value={role}
          onChange={(event) => onRoleChange(event.target.value)}
        />
      </div>
    </header>
  );
}
