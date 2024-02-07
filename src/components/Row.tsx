import type { Prediction } from "../types/tableFormat";
type ValidPoints = number | typeof NaN;

export default function Row({equipo}: {equipo: Prediction}) {
  const {
    nombre,
    puntosTotales,
    posicion,
    porcentajeActual,
    puntosFinalesEstimados,
  } = equipo;
  
  const isValid = (value: ValidPoints) => !isNaN(value);

  return (
    <tr title={`Puntos actuales de ${nombre}: ${puntosTotales}`}>
      <td className="position">{posicion}</td>
      <td>{nombre}</td>
      <td>{isValid(porcentajeActual) ? `${porcentajeActual}%` : "-"}</td>
      <td>{isValid(puntosFinalesEstimados) ? puntosFinalesEstimados : "-"}</td>
    </tr>
  );
}