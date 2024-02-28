import type { Table, GeneralTable } from '../types/cheerio'
import type { AverageInfo } from '../types/tableFormat'

export default function getLastOfAverages(tablaDatos: Table, datosGenerales: GeneralTable) {
  const tabla = tablaDatos.next('table')
  if (tabla.length === 0) throw new Error('No se encontró la tabla en la página.')

  const buffer: AverageInfo[] = []

  if (tabla.length > 0) {
    tabla.find('tbody tr').each((_, row) => {
      const columnas = datosGenerales(row).find('td')

      const nombre = columnas.eq(1).text().trim()
      const promedio = parseFloat(columnas.eq(7).text())

      const datosEquipo: AverageInfo = {
        nombre,
        promedio
      }

      buffer.push(datosEquipo)
    })
    const minPromedio = Math.min(...buffer.map(({ promedio }) => promedio))
    const equiposMinPromedio = buffer.filter(({ promedio }) => promedio === minPromedio)

    return equiposMinPromedio
  }

  return []
}