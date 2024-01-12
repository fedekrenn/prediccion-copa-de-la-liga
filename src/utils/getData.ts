import format from './format'
import type { Table, GeneralTable } from '../types/cheerio'

export default function getData(tablaDatos: Table, datosGenerales: GeneralTable) {
  if (!tablaDatos) throw new Error('No se encontró el párrafo específico.')

  const tabla = tablaDatos.next('table')
  if (tabla.length === 0) throw new Error('No se encontró la tabla hermana.')

  return format(tabla, datosGenerales)
}