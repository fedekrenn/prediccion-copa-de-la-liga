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
  const currentPercentage = prediction.porcentajeActual;
  const estimatedTotalPoints = prediction.puntosEstimados + generalTableInfo.puntosTotales;
  const calculateAverage =
    (averageTeamInfo.puntosActuales + estimatedTotalPoints) /
    (averageTeamInfo.partidosJugados + 27 + 14 - generalTableInfo.partidosJugados);
  const estimatedAverage = parseFloat(calculateAverage.toFixed(3));

  return {
    ...generalTableInfo,
    porcentajeActual: currentPercentage,
    puntosEstimados: estimatedTotalPoints,
    promedioEstimado: estimatedAverage,
    img: averageTeamInfo.img,
  };
}
