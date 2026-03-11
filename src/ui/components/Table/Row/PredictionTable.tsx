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
        return "cls-libertadores";
      case "sudamericana":
        return "cls-sudamericana";
      case "descensoPorTabla":
        return "cls-relegation";
      case "descensoPromedios":
        return "cls-relegation-avg";
      default:
        return "";
    }
  };

  return (
    <tr>
      <td className={`position-cell ${paintColor(classification)}`}>{position}</td>
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
              <span className="team-cell__meta">
                EFC {playedMatches === 0 || !isValid(effectivityPercentage) ? "-" : `${effectivityPercentage}%`} · PJ {playedMatches} · PROM {isValid(estimatedAverage) ? estimatedAverage.toFixed(3) : "-"}
              </span>
            </div>
          </div>
          {liveData && <Live liveData={liveData} />}
        </div>
      </td>
      <td className="hidden sm:table-cell">
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
      <td className="hidden sm:table-cell">{playedMatches}</td>
      <td className="hidden sm:table-cell md:table-cell">{isValid(estimatedAverage) ? estimatedAverage.toFixed(3) : "-"}</td>
    </tr>
  );
}
