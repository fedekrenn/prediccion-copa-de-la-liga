import type { TeamInfo, PartialPrediction } from '../types/teamPrediction'

const PARTIDOS_TOTALES = 27

export default function calculatePartial(currentTableData: TeamInfo[]): PartialPrediction[] {
  return currentTableData.map(({ nombre, puntosTotales, partidosJugados }) => {

    const effectivityPorcentage = Math.round((puntosTotales / (partidosJugados * 3)) * 100);
    const remainingMatches = PARTIDOS_TOTALES - partidosJugados
    const maxPossiblePoints = remainingMatches * 3
    const estimatedPoints = Math.round(effectivityPorcentage * maxPossiblePoints / 100) 

    return {
      nombre,
      porcentajeActual: effectivityPorcentage,
      puntosEstimados: estimatedPoints
    }
  })
}