import { extract } from '@extractus/article-extractor'
import * as cheerio from 'cheerio'
import getTableData from './utils/getData.js'

const URL = 'https://www.promiedos.com.ar/copadeliga'

const { content } = await extract(URL)

const $ = cheerio.load(content)

const yearTable = $("p:contains('Tabla Anual 2023 (Copas+Descenso)')")
// const groupATable = $("p:contains('ZONA A')")
// const groupBTable = $("p:contains('ZONA B')")

console.log(getTableData(yearTable, $))
// console.log(getTableData(groupATable, $))
// console.log(getTableData(groupBTable, $))
