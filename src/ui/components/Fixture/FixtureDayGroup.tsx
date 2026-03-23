import type { FixtureDay } from "@typos/fixture";
import MatchRow from "./MatchRow";

interface FixtureDayProps {
  day: FixtureDay;
}

export default function FixtureDayGroup({ day }: FixtureDayProps) {
  return (
    <div>
      <div className="border-b border-white/6 bg-white/3 px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 sm:px-6">
        {day.label}
      </div>
      {day.matches.map((match) => (
        <MatchRow
          key={`${day.date}-${match.homeTeam.shortName}-${match.awayTeam.shortName}`}
          match={match}
        />
      ))}
    </div>
  );
}
