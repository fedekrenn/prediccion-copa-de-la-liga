import format from '@utils/format'
import type { TeamInfo } from '../types/teamPrediction'

export default function getData(tablaDatos: cheerio.Cheerio, datosGenerales: cheerio.Root): TeamInfo[] {
  const tabla = tablaDatos.next('table')
  if (tabla.length === 0) throw new Error('No se encontró la tabla en la página.')

  return format(tabla, datosGenerales)
}