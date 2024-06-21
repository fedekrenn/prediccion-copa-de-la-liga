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

    const tablaActual = $("p:contains('Tabla Puntos Primera')");
    const tablaAnual = $("p:contains('Tabla Anual 2024 (Copas+Descenso)')");
    const promedios = $("p:contains('Promedios 2024')");

    return {
      $,
      tablaActual,
      tablaAnual,
      promedios,
    };
  } catch (error) {
    throw error;
  }
}
