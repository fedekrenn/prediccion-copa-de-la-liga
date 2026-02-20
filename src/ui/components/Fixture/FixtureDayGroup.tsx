import type { FixtureDay } from "@typos/fixture";
import MatchRow from "./MatchRow";

interface FixtureDayProps {
  day: FixtureDay;
}

export default function FixtureDayGroup({ day }: FixtureDayProps) {
  return (
    <div>
      <div className="bg-[#0f1923] text-center py-1.5 text-xs text-gray-400 font-medium tracking-wide">
        {day.label}
      </div>
      {day.matches.map((match, index) => (
        <MatchRow
          key={`${match.homeTeam.shortName}-${match.awayTeam.shortName}-${index}`}
          match={match}
        />
      ))}
    </div>
  );
}
