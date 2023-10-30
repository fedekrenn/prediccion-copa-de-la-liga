import formatearInfo from './formatear.js'

export default function obtenerDatos (tablaDatos, datosGenerales) {
  let datosFormateados

  if (tablaDatos.length > 0) {
    const tabla = tablaDatos.next('table')

    if (tabla.length > 0) {
      datosFormateados = formatearInfo(tabla, datosGenerales)
    } else {
      console.log('No se encontró la tabla hermana.')
    }
  } else {
    console.log('No se encontró el párrafo específico.')
  }

  return datosFormateados
}
