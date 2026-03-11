// Types
import type { LiveData } from "@typos/api";

interface Params {
  liveData: LiveData;
}

export const Live = ({ liveData }: Params) => {
  const { score, status } = liveData;

  const getColor = (status: number) => {
    switch (status) {
      case 1:
        return "bg-emerald-400/15 text-emerald-200 ring-1 ring-emerald-300/20 animate-pulse";
      case 2:
        return "bg-rose-400/15 text-rose-100 ring-1 ring-rose-300/20";
      case 3:
        return "bg-amber-300/20 text-amber-100 ring-1 ring-amber-300/20";
      default:
        return "bg-slate-400/15 text-slate-200 ring-1 ring-white/10";
    }
  };

  return (
    <div className={`live-pill ${getColor(status)}`}>
      {score[0]}:{score[1]}
    </div>
  );
};
