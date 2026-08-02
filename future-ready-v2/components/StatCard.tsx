export default function StatCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string | number;
  detail?: string;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </p>

      <p className="mt-3 text-4xl font-black text-[#0D1B3D]">
        {value}
      </p>

      {detail ? (
        <p className="mt-2 text-sm leading-6 text-slate-500">
          {detail}
        </p>
      ) : null}
    </article>
  );
}
