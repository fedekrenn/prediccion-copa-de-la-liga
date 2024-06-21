import type { TeamInfo, PartialPrediction } from '../types/teamPrediction'

const PARTIDOS_TOTALES = 27

export default function calculatePartial(arrayEquipos: TeamInfo[]): PartialPrediction[] {
  return arrayEquipos.map(({ nombre, puntosTotales, partidosJugados }) => {

    const porcentajeActual = Math.round((puntosTotales / (partidosJugados * 3)) * 100);
    const partidosPorJugar = PARTIDOS_TOTALES - partidosJugados
    const puntosMaximos = partidosPorJugar * 3
    const puntosEstimados = Math.round(porcentajeActual * puntosMaximos / 100) 

    return {
      nombre,
      porcentajeActual,
      puntosEstimados
    }
  })
}