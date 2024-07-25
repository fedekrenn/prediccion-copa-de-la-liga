import type { CompletePrediction } from "../types/teamPrediction";

type ValidPoints = number | typeof NaN;
type Params = {
  teamData: CompletePrediction;
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
      <td className={`${paintColor(classification)} position`}>{position}</td>
      <td className="flex items-center">
        <img src={img} className="mr-2" width={18} height={18} />
        {name}
      </td>
      <td>
        {isValid(effectivityPorcentage) ? `${effectivityPorcentage}%` : "-"}
      </td>
      <td>{isValid(estimatedTotalPoints) ? estimatedTotalPoints : "-"}</td>
      <td>{isValid(estimatedAverage) ? estimatedAverage.toFixed(3) : "-"}</td>
    </tr>
  );
}
