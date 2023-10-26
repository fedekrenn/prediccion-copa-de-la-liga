const PARTIDOS_TOTALES = 14

export default function calculatePartial (teamsArr) {
  return teamsArr.map(teamInfo => {
    const { equipo, puntosTotales, partidosJugados } = teamInfo

    const porcentajeActual = parseFloat(((puntosTotales * 100) / (partidosJugados * 3) / 100).toFixed(2))
    const puntosEstimados = parseInt((PARTIDOS_TOTALES - partidosJugados) * 3 * porcentajeActual)

    return {
      equipo,
      porcentajeActual,
      puntosEstimados
    }
  })
}
