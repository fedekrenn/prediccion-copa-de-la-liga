// Icons
import caretDown from "@assets/caretDown.svg";
import caretUp from "@assets/caretUp.svg";
// Types
import type { SortOrder } from "@typos/sort";

type Params = {
  filterOrder: SortOrder;
  title: string;
};

export default function FilterHead({ filterOrder, title }: Params) {
  return (
    <div className="inline-flex items-center justify-center gap-1.5 text-[0.7rem] font-bold tracking-[0.12em] text-slate-400 transition hover:text-slate-100">
      <span>{title}</span>
      {filterOrder === "asc" ? (
        <img className="w-3.5 opacity-70 sm:w-4" src={caretDown.src} alt="Orden ascendente" />
      ) : (
        <img className="w-3.5 opacity-70 sm:w-4" src={caretUp.src} alt="Orden descendente" />
      )}
    </div>
  );
}
