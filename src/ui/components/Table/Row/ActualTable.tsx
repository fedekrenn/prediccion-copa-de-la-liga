// Components
import { Live } from "@components/Live";
// Types
import type { CompleteTeamData } from "@typos/teamPrediction";

interface Params {
  teamData: CompleteTeamData;
  currentPosition: number;
}

export default function ActualTable({ teamData, currentPosition }: Params) {
  const {
    currentData: {
      totalPoints,
      playedMatches,
      liveData,
      goalsDifference,
      gamesWon,
      gamesLost,
      gamesEven,
    },
    teamInfo: { name, img },
  } = teamData;

  const paintColor = (currentPosition: number): string => {
    if (currentPosition <= 8) return "position-cell cls-libertadores group-highlight";
    return "";
  };

  return (
    <tr>
      <td className={paintColor(currentPosition) || "position-cell"}>{currentPosition || "-"}</td>
      <td>
        <div className="team-cell">
          <div className="team-cell__identity">
            <img src={img} alt={name} width={22} height={22} className="shrink-0" />
            <div className="min-w-0">
              <span className="team-cell__name">{name}</span>
              <span className="team-cell__meta">
                PJ {playedMatches} · PG {gamesWon} · PE {gamesEven} · PP {gamesLost}
              </span>
            </div>
          </div>
          {liveData && <Live liveData={liveData} />}
        </div>
      </td>
      <td>{totalPoints}</td>
      <td className="hidden sm:table-cell">{playedMatches}</td>
      <td className="hidden md:table-cell">{gamesWon}</td>
      <td className="hidden md:table-cell">{gamesEven}</td>
      <td className="hidden md:table-cell">{gamesLost}</td>
      <td>{goalsDifference}</td>
    </tr>
  );
}
