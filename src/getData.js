import formmatData from './format.js'

export default function getTableData (tableData, generalData) {
  let result
  if (tableData.length > 0) {
    const table = tableData.next('table')

    if (table.length > 0) {
      result = formmatData(table, generalData)
    } else {
      console.log('No se encontró la tabla hermana.')
    }
  } else {
    console.log('No se encontró el párrafo específico.')
  }

  return result
}
