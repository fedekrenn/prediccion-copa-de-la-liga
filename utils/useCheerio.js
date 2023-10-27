import { extract } from '@extractus/article-extractor'
import * as cheerio from 'cheerio'

export default async function useCheerio (URL) {
  const { content } = await extract(URL)

  const $ = cheerio.load(content)

  const yearTable = $("p:contains('Tabla Anual 2023 (Copas+Descenso)')")
  const groupATable = $("p:contains('ZONA A')")
  const groupBTable = $("p:contains('ZONA B')")

  return {
    $,
    yearTable,
    groupATable,
    groupBTable
  }
}
