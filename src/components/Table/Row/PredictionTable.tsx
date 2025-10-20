// Components
import { Live } from "@components/Live";
// Types
import type { CompleteTeamData } from "@typos/teamPrediction";
type ValidPoints = number | typeof NaN;

interface Params {
  teamData: CompleteTeamData;
}

export default function PredictionTable({ teamData }: Params) {
  const {
    currentData: { playedMatches, liveData, annualPoints },
    predictions: {
      classification,
      position,
      estimatedTotalPoints,
      estimatedAverage,
      effectivityPercentage,
    },
    teamInfo: { name, img },
  } = teamData;

  const isValid = (value: ValidPoints) => !isNaN(value);

  const paintColor = (classification: string): string => {
    switch (classification) {
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
          <span title="Todavía no jugó ningún partido de este campeonato">
            -
          </span>
        ) : isValid(effectivityPercentage) ? (
          `${effectivityPercentage}%`
        ) : (
          "-"
        )}
      </td>
      <td title={`Puntos actuales en la tabla anual: ${annualPoints}`}>
        {isValid(estimatedTotalPoints) ? estimatedTotalPoints : "-"}
      </td>
      <td>{playedMatches}</td>
      <td>{isValid(estimatedAverage) ? estimatedAverage.toFixed(3) : "-"}</td>
    </tr>
  );
}
