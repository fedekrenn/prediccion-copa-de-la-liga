import axios from "axios";

export const getExternalInfo = async (URL: string) => {
  try {
    const { data } = await axios.get(URL);

    if (!data) throw new Error("No se pudo extraer el contenido de la página.");

    const extractedAnnualTable = data.tables_groups[2].tables[0].table.rows;
    const extractedAverages = data.tables_groups[1].tables[0].table.rows;

    return {
      extractedAnnualTable,
      extractedAverages,
    };
  } catch (error) {
    throw error;
  }
};
