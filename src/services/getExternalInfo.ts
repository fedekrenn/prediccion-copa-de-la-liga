import axios from "axios";
import type { EntityDetails } from "@typos/api";

export const getExternalInfo = async (URL: string) => {
  try {
    const { data } = await axios.get(URL);

    if (!data) throw new Error("No se pudo extraer el contenido de la página.");

    const tablesGroups: EntityDetails[] = data.tables_groups;

    const extractedAnnualTable =
      tablesGroups.find((table) =>
        table.tables[0].name.toLowerCase().includes("anual")
      )?.tables[0].table.rows || [];

    const extractedAverages =
      tablesGroups.find((table) =>
        table.tables[0].name.toLowerCase().includes("promedio")
      )?.tables[0].table.rows || [];

    return {
      extractedAnnualTable,
      extractedAverages,
    };
  } catch (error) {
    throw error;
  }
};
