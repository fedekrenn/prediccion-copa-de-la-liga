import axios from "axios";
import { load } from "cheerio";

export default async function getExternalData(URL: string) {
  try {
    const { data } = await axios.get(URL);

    if (!data)
      throw new Error("No se pudo extraer el contenido de la página.");

    const $ = load(data);

    const extractedAnnualTable = $('table.tablesorter5')
    const extractedCurrentTable = $('table.tablesorter1')
    const extractedAverages = $('table.tablesorter3')

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
