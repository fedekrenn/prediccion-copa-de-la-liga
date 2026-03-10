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
            <img src={img} alt={name} width={22} height={22} />
            <span className="team-cell__name">{name}</span>
          </div>
          {liveData && <Live liveData={liveData} />}
        </div>
      </td>
      <td>{totalPoints}</td>
      <td>{playedMatches}</td>
      <td>{gamesWon}</td>
      <td>{gamesEven}</td>
      <td>{gamesLost}</td>
      <td>{goalsDifference}</td>
    </tr>
  );
}
