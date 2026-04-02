export function Card({ title, value, subtitle, valueClassName = "" }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <h3 className={`mt-2 text-2xl font-bold text-slate-900 ${valueClassName}`}>{value}</h3>
      {subtitle ? <p className="mt-1 text-xs text-slate-400">{subtitle}</p> : null}
    </article>
  );
}
