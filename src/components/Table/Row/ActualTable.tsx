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
    if (currentPosition <= 8) return "green font-bold";
    return "";
  };

  return (
    <tr>
      <td className={paintColor(currentPosition)}>{currentPosition || "-"}</td>
      <td className="flex items-center justify-between">
        <div className="flex items-center">
          <img src={img} className="mr-2" width={18} height={18} />
          {name}
        </div>
        {liveData && <Live liveData={liveData} />}
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
