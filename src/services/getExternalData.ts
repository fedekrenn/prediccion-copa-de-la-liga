import { extract } from "@extractus/article-extractor";
import { load } from "cheerio";

export default async function getExternalData(URL: string) {
  try {
    const extractedData = await extract(URL);
    const content = extractedData ? extractedData.content : null;

    if (!content) {
      throw new Error("No se pudo extraer el contenido de la página.");
    }

    const $ = load(content);

    const tablaAnual = $("p:contains('Tabla Anual 2024 (Copas+Descenso)')");
    const zonaA = $("p:contains('ZONA A')");
    const zonaB = $("p:contains('ZONA B')");
    const promedios = $("p:contains('Promedios 2024')");

    return {
      $,
      tablaAnual,
      zonaA,
      zonaB,
      promedios,
    };
  } catch (error) {
    throw error;
  }
}
