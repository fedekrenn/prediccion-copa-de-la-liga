// Types
import type { CompleteTeamData } from "@typos/teamPrediction";

interface Params {
  teamData: CompleteTeamData;
  currentPosition: number;
}

export default function NextSeasonTable({ teamData, currentPosition }: Params) {
  const {
    nextSeasonData: { nextSeasonAverage },
    teamInfo: { name, img },
  } = teamData;

  return (
    <tr>
      <td className="position-cell">{currentPosition || "-"}</td>
      <td>
        <div className="team-cell">
          <div className="team-cell__identity">
            <img
              src={img}
              alt={name}
              width={22}
              height={22}
              loading="lazy"
              decoding="async"
              className="shrink-0"
            />
            <div className="min-w-0">
              <span className="team-cell__name">{name}</span>
            </div>
          </div>
        </div>
      </td>
      <td>{isNaN(nextSeasonAverage) ? "-" : nextSeasonAverage.toFixed(3)}</td>
    </tr>
  );
}
