import type {
  AverageInfo,
  TeamInfo,
  PartialPrediction,
} from "../types/tableFormat";

export default function generateFinalInfo(
  team: TeamInfo,
  tableTeamInfo: PartialPrediction,
  averageTeamInfo: AverageInfo
) {

  const porcentajeActual = tableTeamInfo.porcentajeActual;
  const puntosFinalesEstimados = tableTeamInfo.puntosEstimados;
  const promedioEstimado =
    (averageTeamInfo.puntosActuales + puntosFinalesEstimados) /
    (averageTeamInfo.partidosJugados + 14 + 27);
  const promedioFormateado = parseFloat(promedioEstimado.toFixed(3));

  return {
    ...team,
    porcentajeActual,
    puntosFinalesEstimados,
    promedioFormateado,
  };
}
