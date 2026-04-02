export function Input({ label, className = "", ...props }) {
  return (
    <label className="block w-full">
      {label ? <span className="mb-1 block text-sm text-slate-600 dark:text-slate-300">{label}</span> : null}
      <input
        className={`w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-800 ${className}`}
        {...props}
      />
    </label>
  );
}
