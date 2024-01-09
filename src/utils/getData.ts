import format from './format'
import type { Table, GeneralTable } from '../types/cheerio'

export default function getData(tablaDatos: Table, datosGenerales: GeneralTable) {
  let datosFormateados

  if (tablaDatos !== undefined) {
    const tabla = tablaDatos.next('table')

    if (tabla.length > 0) {
      datosFormateados = format(tabla, datosGenerales)
    } else {
      console.log('No se encontró la tabla hermana.')
    }
  } else {
    console.log('No se encontró el párrafo específico.')
  }

  return datosFormateados
}