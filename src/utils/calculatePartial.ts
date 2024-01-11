import type { TeamList } from '../types/tableFormat'

const PARTIDOS_TOTALES = 14

export default function calculatePartial(arrayEquipos: TeamList) {
  return arrayEquipos?.map(infoEquipo => {
    const { nombre, puntosTotales, partidosJugados } = infoEquipo

    const porcentajeActual = parseFloat((puntosTotales / (partidosJugados * 3)).toFixed(2))
    const puntosEstimados = Math.round(porcentajeActual * PARTIDOS_TOTALES * 3)

    return {
      nombre,
      porcentajeActual,
      puntosEstimados
    }
  })
}