export default function Legend() {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-center gap-2.5">
      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-emerald-100">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
        Copa Libertadores
      </div>
      <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-400/10 px-3 py-2 text-xs font-semibold text-amber-100">
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400"></span>
        Copa Sudamericana
      </div>
      <div className="inline-flex items-center gap-2 rounded-full border border-rose-300/20 bg-rose-400/10 px-3 py-2 text-xs font-semibold text-rose-100">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400"></span>
        Descenso por tabla
      </div>
      <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-400/10 px-3 py-2 text-xs font-semibold text-violet-100">
        <span className="h-2.5 w-2.5 rounded-full bg-violet-400"></span>
        Descenso por promedio
      </div>
    </div>
  );
}
