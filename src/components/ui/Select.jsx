export function Select({ label, options, className = "", ...props }) {
  return (
    <label className="block w-full">
      {label ? <span className="mb-1 block text-sm text-slate-600">{label}</span> : null}
      <select
        className={`w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-slate-400 ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
