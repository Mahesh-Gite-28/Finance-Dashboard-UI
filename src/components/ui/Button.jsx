export function Button({ children, variant = "primary", className = "", ...props }) {
  const styles = {
    primary: "bg-slate-900 text-white hover:bg-slate-800",
    secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200",
    danger: "bg-expense text-white hover:bg-red-700"
  };

  return (
    <button
      className={`rounded-lg px-4 py-2 text-sm font-medium transition ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
