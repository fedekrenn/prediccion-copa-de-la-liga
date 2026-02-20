// Components
import { Live } from "@components/Live";
// Types
import type { CompleteTeamData } from "@typos/teamPrediction";

interface Params {
  teamData: CompleteTeamData;
  currentPosition: number;
}

export default function AnnualTable({ teamData, currentPosition }: Params) {
  const {
    currentData: {
      annualPoints,
      playedMatches,
      liveData,
      goalsDifference,
      gamesWon,
      gamesLost,
      gamesEven,
    },
    teamInfo: { name, img },
  } = teamData;

  return (
    <tr>
      <td>{currentPosition || "-"}</td>
      <td className="flex items-center justify-between">
        <div className="flex items-center">
          <img src={img} className="mr-2" width={18} height={18} />
          {name}
        </div>
        {liveData && <Live liveData={liveData} />}
      </td>
      <td>{annualPoints}</td>
      <td>{playedMatches}</td>
      <td>{gamesWon}</td>
      <td>{gamesEven}</td>
      <td>{gamesLost}</td>
      <td>{goalsDifference}</td>
    </tr>
  );
}
