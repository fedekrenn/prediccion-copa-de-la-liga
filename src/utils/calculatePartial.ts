import type { TeamsArr } from '../types/tableFormat'

const PARTIDOS_TOTALES = 14

export default function calculatePartial(arrayEquipos: TeamsArr) {
  return arrayEquipos?.map(infoEquipo => {
    const { nombre, puntosTotales, partidosJugados } = infoEquipo

    const porcentajeActual = parseFloat((puntosTotales / (partidosJugados * 3)).toFixed(2))
    const puntosEstimados = parseInt((PARTIDOS_TOTALES - partidosJugados) * 3 * porcentajeActual)

    return {
      nombre,
      porcentajeActual,
      puntosEstimados
    }
  })
}