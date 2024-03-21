import type { CompletePrediction } from "../types/tableFormat";

type ValidPoints = number | typeof NaN;

export default function Row({ equipo }: { equipo: CompletePrediction }) {
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
      <td>{isValid(promedioEstimado) ? promedioEstimado : "-"}</td>
    </tr>
  );
}
