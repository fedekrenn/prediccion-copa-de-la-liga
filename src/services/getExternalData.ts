import axios from "axios";
import { load } from "cheerio";

export const getExternalData = async (URL: string) => {
  try {
    const { data } = await axios.get(URL);

    if (!data) throw new Error("No se pudo extraer el contenido de la página.");

    const $ = load(data);

    const tables = $("table.table_table__LTgjZ ");

    const extractedAnnualTable = tables.eq(2);
    const extractedAverages = tables.eq(3);

    return {
      $,
      extractedAnnualTable,
      extractedAverages,
    };
  } catch (error) {
    throw error;
  }
};
