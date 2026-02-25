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
      className={`grid grid-cols-[55px_1fr_30px_1fr] items-center py-2.5 px-2 border-b border-[#1a2634] text-xs sm:text-sm ${
        isPostponed ? "opacity-50" : ""
      }`}
    >
      <div className="text-center">
        <span
          className={`font-medium ${
            isPostponed
              ? `text-[0.65rem] ${statusColor(status)}`
              : isFinished
                ? "text-[0.65rem] text-gray-400"
                : status === "live"
                  ? statusColor(status)
                  : "text-gray-300"
          }`}
        >
          {displayTime}
        </span>
      </div>

      <div className="flex items-center justify-end gap-1.5 pr-2 truncate">
        <span className="truncate text-right">{homeTeam.shortName}</span>
        <img
          src={homeTeam.img}
          alt={homeTeam.shortName}
          width={18}
          height={18}
          className="shrink-0"
        />
      </div>

      <div className="text-center font-semibold">
        {hasScore ? (
          <span className={status === "live" ? "text-green-400" : ""}>
            {homeScore} - {awayScore}
          </span>
        ) : (
          <span className="text-gray-500">-</span>
        )}
      </div>

      <div className="flex items-center gap-1.5 pl-2 truncate">
        <img
          src={awayTeam.img}
          alt={awayTeam.shortName}
          width={18}
          height={18}
          className="shrink-0"
        />
        <span className="truncate">{awayTeam.shortName}</span>
      </div>
    </div>
  );
}
