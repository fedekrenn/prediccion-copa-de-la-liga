import type { TeamInfo, PartialPrediction } from '../types/teamPrediction'

const PARTIDOS_TOTALES = 14 + 27

export default function calculatePartial(arrayEquipos: TeamInfo[]): PartialPrediction[] {
  return arrayEquipos.map(({ nombre, puntosTotales, partidosJugados }) => {

    const porcentajeActual = Math.round((puntosTotales / (partidosJugados * 3)) * 100);
    const puntosEstimados = Math.round(porcentajeActual * PARTIDOS_TOTALES / 100 * 3)

    return {
      nombre,
      porcentajeActual,
      puntosEstimados
    }
  })
}