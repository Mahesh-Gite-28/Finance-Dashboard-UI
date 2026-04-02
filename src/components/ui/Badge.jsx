export function Badge({ type }) {
  const styles =
    type === "income"
      ? "bg-green-100 text-income border-green-200 dark:bg-green-900/30 dark:border-green-800"
      : "bg-red-100 text-expense border-red-200 dark:bg-red-900/30 dark:border-red-800";

  return <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${styles}`}>{type}</span>;
}
