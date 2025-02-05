import type { TablePrediction } from "@typos/teamPrediction";

type ValidPoints = number | typeof NaN;
type Params = {
  teamData: TablePrediction;
};

export default function Row({ teamData }: Params) {
  const {
    name,
    totalPoints,
    position,
    effectivityPorcentage,
    estimatedTotalPoints,
    classification,
    estimatedAverage,
    img,
    playedMatches,
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
      <td className="flex items-center cursor-default">
        <img src={img} className="mr-2" width={18} height={18} />
        {name}
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
