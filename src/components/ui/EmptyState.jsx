export function EmptyState({ title, description, icon = "inbox" }) {
  const iconMap = {
    inbox: "📭",
    chart: "📉",
    filter: "🔎",
    lightbulb: "💡"
  };

  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-3 text-3xl" aria-hidden>
        {iconMap[icon] || iconMap.inbox}
      </div>
      <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{description}</p>
    </div>
  );
}
