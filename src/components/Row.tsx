// Components
import { Live } from "@components/Live";
// Types
import type { CompleteTeamData } from "@typos/teamPrediction";
import type { TabType } from "@typos/tabs";

type ValidPoints = number | typeof NaN;
type Params = {
  teamData: CompleteTeamData;
  activeTab: TabType;
  currentPosition?: number;
};

export default function Row({ teamData, activeTab, currentPosition }: Params) {
  const {
    currentData: {
      totalPoints,
      playedMatches,
      liveData,
      goalsDifference,
      gamesWon,
      gamesLost,
      gamesEven,
      annualPoints,
    },
    predictions: {
      classification,
      position,
      estimatedTotalPoints,
      estimatedAverage,
      effectivityPorcentage,
    },
    teamInfo: { name, img },
  } = teamData;

  const isValid = (value: ValidPoints) => !isNaN(value);
  const paintColor = (clasification: string): string => {
    switch (clasification) {
      case "libertadores":
        return "green";
      case "sudamericana":
        return "yellow";
      case "descensoPorTabla":
        return "red";
      case "descensoPromedios":
        return "dark-red";
      default:
        return "";
    }
  };

  if (activeTab === "predictions") {
    return (
      <tr>
        <td className={`${paintColor(classification)}`}>{position}</td>
        <td className="flex items-center justify-between">
          <div className="flex items-center">
            <img src={img} className="mr-2" width={18} height={18} />
            {name}
          </div>
          {liveData && <Live liveData={liveData} />}
        </td>
        <td>
          {playedMatches === 0 ? (
            <span title="Todavía no juegó ningún partido de este campeonato">
              -
            </span>
          ) : isValid(effectivityPorcentage) ? (
            `${effectivityPorcentage}%`
          ) : (
            "-"
          )}
        </td>
        <td title={`Puntos en la tabla anual actuales: ${annualPoints}`}>
          {isValid(estimatedTotalPoints) ? estimatedTotalPoints : "-"}
        </td>
        <td>{playedMatches}</td>
        <td>{isValid(estimatedAverage) ? estimatedAverage.toFixed(3) : "-"}</td>
      </tr>
    );
  }

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
      <td>{totalPoints}</td>
      <td>{playedMatches}</td>
      <td>{gamesWon}</td>
      <td>{gamesEven}</td>
      <td>{gamesLost}</td>
      <td>{goalsDifference}</td>
    </tr>
  );
}
