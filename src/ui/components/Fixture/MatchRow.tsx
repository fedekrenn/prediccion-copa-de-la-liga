import type { FixtureMatch } from "@typos/fixture";

interface MatchRowProps {
  match: FixtureMatch;
}

const statusColor = (status: FixtureMatch["status"]): string => {
  switch (status) {
    case "live":
      return "text-green-400";
    case "finished":
      return "text-gray-400";
    case "postponed":
      return "text-red-400";
    default:
      return "text-gray-300";
  }
};

export default function MatchRow({ match }: MatchRowProps) {
  const { homeTeam, awayTeam, displayTime, status, homeScore, awayScore } =
    match;
  const hasScore = homeScore !== undefined && awayScore !== undefined;
  const isPostponed = status === "postponed";
  const isFinished = status === "finished";

  return (
    <div
      className={`grid grid-cols-[64px_1fr_auto_1fr] items-center gap-2 border-b border-white/6 px-4 py-3 text-xs sm:px-6 sm:text-sm ${
        isPostponed ? "opacity-50" : ""
      }`}
    >
      <div className="text-center">
        <span
          className={`font-medium ${
            isPostponed
              ? `text-[0.7rem] ${statusColor(status)}`
              : isFinished
                ? "text-[0.75rem] text-slate-500"
                : status === "live"
                  ? statusColor(status)
                  : "text-slate-300"
          }`}
        >
          {displayTime}
        </span>
      </div>

      <div className="flex min-w-0 items-center justify-end gap-2 pr-2">
        <span className="truncate text-right font-medium text-slate-100">
          {homeTeam.shortName}
        </span>
        <img
          src={homeTeam.img}
          alt={homeTeam.shortName}
          width={22}
          height={22}
          loading="lazy"
          decoding="async"
          className="shrink-0"
        />
      </div>

      <div className="min-w-14 text-center font-bold text-white sm:min-w-17 sm:text-base">
        {hasScore ? (
          <span className={status === "live" ? "text-emerald-300" : ""}>
            {homeScore} - {awayScore}
          </span>
        ) : (
          <span className="text-slate-600">-</span>
        )}
      </div>

      <div className="flex min-w-0 items-center gap-2 pl-2">
        <img
          src={awayTeam.img}
          alt={awayTeam.shortName}
          width={22}
          height={22}
          loading="lazy"
          decoding="async"
          className="shrink-0"
        />
        <span className="truncate font-medium text-slate-100">
          {awayTeam.shortName}
        </span>
      </div>
    </div>
  );
}
