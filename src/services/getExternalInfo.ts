import axios from "axios";
import { findCorrectTable } from "@utils/findCorrectTable";
import type { EntityDetails } from "@typos/api";

export const getExternalInfo = async (URL: string) => {
  try {
    const { data } = await axios.get(URL);

    if (!data) throw new Error("No se pudo extraer el contenido de la página.");

    const tablesGroups: EntityDetails[] = data.tables_groups;

    const extractedAnnualTable = findCorrectTable(tablesGroups, "anual");
    const extractedAverages = findCorrectTable(tablesGroups, "promedio");

    return {
      extractedAnnualTable,
      extractedAverages,
    };
  } catch (error) {
    throw error;
  }
};
