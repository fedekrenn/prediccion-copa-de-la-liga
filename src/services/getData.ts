import format from '@utils/format'
import type { Table, GeneralTable } from '../types/cheerioTypes'
import type { TeamList } from '../types/tablesTypes'

export default function getData(tablaDatos: Table, datosGenerales: GeneralTable): TeamList {
  const tabla = tablaDatos.next('table')
  if (tabla.length === 0) throw new Error('No se encontró la tabla en la página.')

  return format(tabla, datosGenerales)
}