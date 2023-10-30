const PARTIDOS_TOTALES = 14

export default function calcularParcial (arrayEquipos) {
  return arrayEquipos.map(infoEquipo => {
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
