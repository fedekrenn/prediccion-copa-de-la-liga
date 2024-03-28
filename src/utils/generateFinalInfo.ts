import type { AverageInfo, TeamInfo, PartialPrediction, CompleteAverageInfo } from "../types/tablesTypes";

export default function generateFinalInfo(
  team: TeamInfo,
  tableTeamInfo: PartialPrediction,
  averageTeamInfo: AverageInfo
): CompleteAverageInfo {

  const porcentajeActual = tableTeamInfo.porcentajeActual;
  const puntosEstimados = tableTeamInfo.puntosEstimados;
  const calculoPromedio =
    (averageTeamInfo.puntosActuales + puntosEstimados) /
    (averageTeamInfo.partidosJugados + 14 + 27);
  const promedioEstimado = parseFloat(calculoPromedio.toFixed(3));

  return {
    ...team,
    porcentajeActual,
    puntosEstimados,
    promedioEstimado,
  };
}
