import calculateTotal from '@utils/calculateTotal'
import getData from './getData'
import getExternalData from './getExternalData'

const URL = 'https://www.promiedos.com.ar/copadeliga'

export default async function main() {
  try {
    const { $, tablaAnual, zonaA, zonaB } = await getExternalData(URL)

    const datosTablaAnual = getData(tablaAnual, $)
    const datosZonaA = getData(zonaA, $)
    const datosZonaB = getData(zonaB, $)

    const dataExists = datosTablaAnual && datosZonaA && datosZonaB;

    if (!dataExists) {
      throw new Error('No se pudo obtener la información de la página.')
    }

    return calculateTotal(datosTablaAnual, datosZonaA, datosZonaB);
  } catch (error) {
    throw error
  }
}