import obtenerDatos from './obtenerDatos.js'
import calcularTotal from './calcularTotal.js'
import extraerDatosConCheerio from './extraerDatosConCheerio.js'

const URL = 'https://www.promiedos.com.ar/copadeliga'

export default async function main () {
  const { $, tablaAnual, zonaA, zonaB } = await extraerDatosConCheerio(URL)

  const datosTablaAnual = obtenerDatos(tablaAnual, $)
  const datosZonaA = obtenerDatos(zonaA, $)
  const datosZonaB = obtenerDatos(zonaB, $)

  return calcularTotal(datosTablaAnual, datosZonaA, datosZonaB)
}
