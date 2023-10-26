const REMAINING_GAMES = 14

export default function calculatePartial (teamsArr) {
  return teamsArr.map(teamInfo => {
    const { equipo, puntosTotales, partidosJugados } = teamInfo

    const porcentajeActual = parseFloat(((puntosTotales * 100) / (partidosJugados * 3) / 100).toFixed(2))
    const puntosEstimados = parseInt(REMAINING_GAMES * 3 * porcentajeActual)

    const newTeamData = {
      equipo,
      porcentajeActual,
      puntosEstimados
    }

    return newTeamData
  }).sort((a, b) => b.estimatedPoints - a.estimatedPoints)
}
