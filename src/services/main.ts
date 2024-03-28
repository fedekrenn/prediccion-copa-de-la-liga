import calculateTotal from '@utils/calculateTotal'
import getData from './getData'
import getExternalData from './getExternalData'
import getLastOfAverages from './getLastOfAverages'
import type { CompletePrediction } from '../types/tablesTypes'

const URL = 'https://www.promiedos.com.ar/copadeliga'

export default async function main(): Promise<CompletePrediction[]> {
  try {
    const { $, tablaAnual, zonaA, zonaB, promedios } = await getExternalData(URL)

    const datosTablaAnual = getData(tablaAnual, $)
    const datosZonaA = getData(zonaA, $)
    const datosZonaB = getData(zonaB, $)
    const datosPromedios = getLastOfAverages(promedios, $)

    const dataExists = datosTablaAnual && datosZonaA && datosZonaB && datosPromedios

    if (!dataExists) {
      throw new Error('No se pudo obtener la información de la página.')
    }

    return calculateTotal(datosTablaAnual, datosZonaA, datosZonaB, datosPromedios);
  } catch (error) {
    throw error
  }
}