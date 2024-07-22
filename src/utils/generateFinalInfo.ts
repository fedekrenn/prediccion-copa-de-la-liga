import type {
  AverageInfo,
  TeamInfo,
  PartialPrediction,
  CompleteAverageInfo,
} from "../types/teamPrediction";

export default function generateFinalInfo(
  generalTableInfo: TeamInfo,
  prediction: PartialPrediction,
  averageTeamInfo: AverageInfo
): CompleteAverageInfo {
  const porcentajeActual = prediction.porcentajeActual;
  const puntosEstimadosTotales =
    prediction.puntosEstimados + generalTableInfo.puntosTotales;
  const calculoPromedio =
    (averageTeamInfo.puntosActuales + puntosEstimadosTotales) /
    (averageTeamInfo.partidosJugados +
      27 +
      14 -
      generalTableInfo.partidosJugados);
  const promedioEstimado = parseFloat(calculoPromedio.toFixed(3));

  return {
    ...generalTableInfo,
    porcentajeActual,
    puntosEstimados: puntosEstimadosTotales,
    promedioEstimado,
    img: averageTeamInfo.img,
  };
}
