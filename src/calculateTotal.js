import calculatePartial from './calculatePartial.js'

export default function calculateTotal (tablaGeneral, zonaA, zonaB) {
  const unificado = [...calculatePartial(zonaA), ...calculatePartial(zonaB)]
    .sort((a, b) => b.puntosEstimados - a.puntosEstimados)

  const data = tablaGeneral.map(team => {
    const equipoEncontrado = unificado.find(eq => eq.equipo === team.equipo)
    const puntosFinalesEstimados = team.puntosTotales + equipoEncontrado.puntosEstimados

    return {
      ...team,
      porcentajeActual: equipoEncontrado.porcentajeActual,
      puntosFinalesEstimados
    }
  })

  return data
    .sort((a, b) => b.puntosFinalesEstimados - a.puntosFinalesEstimados)
    .map((team, index) => {
      return {
        posicion: index + 1,
        ...team
      }
    })
}
