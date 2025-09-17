import type { CompleteTeamData } from "@typos/teamPrediction";
import { Live } from "@components/Live";

type ValidPoints = number | typeof NaN;
type Params = {
  teamData: CompleteTeamData;
};

export default function Row({ teamData }: Params) {
  const {
    currentData: { totalPoints, playedMatches, liveData },
    predictions: { classification, position, estimatedTotalPoints, estimatedAverage, effectivityPorcentage },
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

  return (
    <tr title={`Puntos actuales de ${name}: ${totalPoints}`}>
      <td className={`${paintColor(classification)} position cursor-default`}>
        {position}
      </td>
      <td className="flex items-center justify-between">
        <div className="flex items-center cursor-default">
          <img src={img} className="mr-2" width={18} height={18} />
          {name}
        </div>
        {liveData && <Live liveData={liveData} />}
      </td>
      <td className="cursor-default">
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
      <td className="cursor-default">
        {isValid(estimatedTotalPoints) ? estimatedTotalPoints : "-"}
      </td>
      <td className="cursor-default">{playedMatches}</td>
      <td className="cursor-default">
        {isValid(estimatedAverage) ? estimatedAverage.toFixed(3) : "-"}
      </td>
    </tr>
  );
}
