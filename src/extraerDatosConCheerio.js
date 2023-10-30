import { extract } from '@extractus/article-extractor'
import * as cheerio from 'cheerio'

export default async function extraerDatosConCheerio (URL) {
  const { content } = await extract(URL)

  const $ = cheerio.load(content)

  const tablaAnual = $("p:contains('Tabla Anual 2023 (Copas+Descenso)')")
  const zonaA = $("p:contains('ZONA A')")
  const zonaB = $("p:contains('ZONA B')")

  return {
    $,
    tablaAnual,
    zonaA,
    zonaB
  }
}
