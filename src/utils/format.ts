import type { Table, GeneralTable } from '../types/cheerio'
import type { TeamList, TeamInfo } from '../types/tableFormat'

export default function format(tablaDatos: Table, datosGenerales: GeneralTable): TeamList {
  const buffer: TeamList = []

  if (tablaDatos.length > 0) {
    tablaDatos.find('tbody tr').each((_, row) => {
      const columnas = datosGenerales(row).find('td')

      const nombre = columnas.eq(1).text().trim()
      const puntosTotales = parseInt(columnas.eq(2).text(), 10)
      const partidosJugados = parseInt(columnas.eq(3).text(), 10)

      const datosEquipo: TeamInfo = {
        nombre,
        puntosTotales,
        partidosJugados
      }

      buffer.push(datosEquipo)
    })
    return buffer
  }

  return []
}