import format from '@utils/format'
import type { TeamInfo } from '../types/teamPrediction'

export default function getData(extractedData: cheerio.Cheerio, cheerioRoot: cheerio.Root): TeamInfo[] {
  const tableData = extractedData.next('table')
  if (tableData.length === 0) throw new Error('No se encontró la tabla en la página.')

  return format(tableData, cheerioRoot)
}