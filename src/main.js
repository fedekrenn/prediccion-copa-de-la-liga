import getTableData from './getData.js'
import calculateTotal from './calculateTotal.js'
import useCheerio from './useCheerio.js'

const URL = 'https://www.promiedos.com.ar/copadeliga'

export default async function main () {
  const { $, yearTable, groupATable, groupBTable } = await useCheerio(URL)

  const tablaAnual = getTableData(yearTable, $)
  const zonaA = getTableData(groupATable, $)
  const zonaB = getTableData(groupBTable, $)

  return calculateTotal(tablaAnual, zonaA, zonaB)
}
