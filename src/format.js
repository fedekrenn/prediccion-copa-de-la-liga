export default function formmatData (tableData, generalData) {
  const table = []

  if (tableData.length > 0) {
    tableData.find('tbody tr').each((_, row) => {
      const columns = generalData(row).find('td')

      const equipo = columns.eq(1).text().trim()
      const puntosTotales = parseInt(columns.eq(2).text(), 10)
      const partidosJugados = parseInt(columns.eq(3).text(), 10)

      const teamData = {
        equipo,
        puntosTotales,
        partidosJugados
      }

      table.push(teamData)
    })

    return table
  } else {
    return []
  }
}
