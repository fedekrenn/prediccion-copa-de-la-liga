export default function calculateTotal (tablaGeneral, zonaA, zonaB) {
  const unificado = [...zonaA, ...zonaB].sort((a, b) => b.puntosEstimados - a.puntosEstimados)

  return tablaGeneral.map(team => {
    const { equipo, puntosTotales } = team

    const equipoEncontrado = unificado.find(eq => eq.equipo === equipo)
    const puntosFinales = puntosTotales + equipoEncontrado.puntosEstimados

    return {
      equipo,
      puntosFinales
    }
  }).sort((a, b) => b.puntosFinales - a.puntosFinales)
}
