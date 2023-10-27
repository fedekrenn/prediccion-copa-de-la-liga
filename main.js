import getTableData from './utils/getData.js'
import calculateTotal from './utils/calculateTotal.js'
import useCheerio from './utils/useCheerio.js'

const URL = 'https://www.promiedos.com.ar/copadeliga'

const { $, yearTable, groupATable, groupBTable } = await useCheerio(URL)

const tablaAnual = getTableData(yearTable, $)
const zonaA = getTableData(groupATable, $)
const zonaB = getTableData(groupBTable, $)

console.log(calculateTotal(tablaAnual, zonaA, zonaB))
