import type { AverageInfo } from '../types/teamPrediction'

export default function getAverageData(tablaDatos: cheerio.Cheerio, datosGenerales: cheerio.Root): AverageInfo[] {
  const tabla = tablaDatos.next('table')
  if (tabla.length === 0) throw new Error('No se encontró la tabla en la página.')

  const buffer: AverageInfo[] = []

  if (tabla.length > 0) {
    tabla.find('tbody tr').each((_, row) => {
      const columnas = datosGenerales(row).find('td')

      const img = datosGenerales(row).find('img').attr('src') || ''
      const nombre = columnas.eq(1).text().trim()
      const puntosActuales = parseInt(columnas.eq(5).text())
      const partidosJugados = parseInt(columnas.eq(6).text())

      const datosEquipo: AverageInfo = {
        nombre,
        puntosActuales,
        partidosJugados,
        img
      }

      buffer.push(datosEquipo)
    })
    return buffer
  }

  return []
}