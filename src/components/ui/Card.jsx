export function Card({ title, value, subtitle, valueClassName = "" }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
      <h3 className={`mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100 ${valueClassName}`}>{value}</h3>
      {subtitle ? <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">{subtitle}</p> : null}
    </article>
  );
}
