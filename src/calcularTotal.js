import calcularParcial from './calcularParcial.js'

export default function calcularTotal (tablaGeneral, zonaA, zonaB) {
  const unificado = [...calcularParcial(zonaA), ...calcularParcial(zonaB)]

  const datos = tablaGeneral.map(equipo => {
    const equipoEncontrado = unificado.find(eq => eq.nombre === equipo.nombre)
    const puntosFinalesEstimados = equipo.puntosTotales + equipoEncontrado.puntosEstimados

    return {
      ...equipo,
      porcentajeActual: equipoEncontrado.porcentajeActual,
      puntosFinalesEstimados
    }
  })

  return datos
    .sort((a, b) => b.puntosFinalesEstimados - a.puntosFinalesEstimados)
    .map((equipoInfo, index) => {
      return {
        posicion: index + 1,
        ...equipoInfo
      }
    })
}
