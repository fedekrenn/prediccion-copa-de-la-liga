import { extract } from "@extractus/article-extractor";
import { load } from "cheerio";

export default async function getExternalData(URL: string) {
  try {
    const extractedData = await extract(URL);
    const content = extractedData ? extractedData.content : null;

    if (!content)
      throw new Error("No se pudo extraer el contenido de la página.");

    const $ = load(content);

    const extractedAnnualTable = $(
      "p:contains('Tabla Anual 2024 (Copas+Descenso)')"
    );
    const extractedCurrentTable = $("p:contains('Tabla Puntos Primera')");
    const extractedAverages = $("p:contains('Promedios 2024')");

    return {
      $,
      extractedCurrentTable,
      extractedAnnualTable,
      extractedAverages,
    };
  } catch (error) {
    throw error;
  }
}
