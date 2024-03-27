import type { CompletePrediction } from "../types/tableFormat";

type ValidPoints = number | typeof NaN;
type Params = {
  equipo: CompletePrediction;
};

export default function Row({ equipo }: Params) {
  const {
    nombre,
    puntosTotales,
    posicion,
    porcentajeActual,
    puntosEstimados,
    clasificacion,
    promedioEstimado,
  } = equipo;

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
    <tr title={`Puntos actuales de ${nombre}: ${puntosTotales}`}>
      <td className={`${paintColor(clasificacion)} position`}>{posicion}</td>
      <td>{nombre}</td>
      <td>{isValid(porcentajeActual) ? `${porcentajeActual}%` : "-"}</td>
      <td>{isValid(puntosEstimados) ? puntosEstimados : "-"}</td>
      <td>{isValid(promedioEstimado) ? promedioEstimado.toFixed(3) : "-"}</td>
    </tr>
  );
}
