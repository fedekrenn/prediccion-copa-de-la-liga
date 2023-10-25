import { extract } from "@extractus/article-extractor";
import * as cheerio from "cheerio";

const URL = "https://www.promiedos.com.ar/copadeliga";

const { content } = await extract(URL);

const $ = cheerio.load(content);

const yearTable = $("p:contains('Tabla Anual 2023 (Copas+Descenso)')");
const groupATable = $("p:contains('ZONA A')");
const groupBTable = $("p:contains('ZONA B')");

console.log(getTableData(groupATable));

function getTableData(tableData) {
  let result;
  if (tableData.length > 0) {
    const table = tableData.next("table");

    if (table.length > 0) {
      result = formmatData(table);
    } else {
      console.log("No se encontró la tabla hermana.");
    }
  } else {
    console.log("No se encontró el párrafo específico.");
  }

  return result;
}

function formmatData(tableData) {
  const equipos = [];

  if (tableData.length > 0) {
    tableData.find("tbody tr").each((index, row) => {
      const columns = $(row).find("td");

      const equipo = columns.eq(1).text().trim();
      const puntos_totales = parseInt(columns.eq(2).text(), 10);
      const partidos_jugados = parseInt(columns.eq(3).text(), 10);

      const equipoData = {
        equipo,
        puntos_totales,
        partidos_jugados,
      };

      equipos.push(equipoData);
    });

    return equipos;
  } else {
    return [];
  }
}
