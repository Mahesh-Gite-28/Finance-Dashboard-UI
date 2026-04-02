export function Badge({ type }) {
  const styles =
    type === "income"
      ? "bg-green-100 text-income border-green-200"
      : "bg-red-100 text-expense border-red-200";

  return <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${styles}`}>{type}</span>;
}
