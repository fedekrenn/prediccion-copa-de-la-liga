import axios from "axios";
import {
  findAverageTable,
  findActualTable,
  findAnnualTable,
} from "@utils/findCorrectTable";
import type { ApiResponse } from "@typos/api";

export const getExternalInfo = async (URL: string) => {
  try {
    const { data } = await axios.get(URL);

    if (!data) throw new Error("No se pudo extraer el contenido de la página.");

    const tablesGroups: ApiResponse[] = data.tables_groups;

    const extractedAverages = findAverageTable(tablesGroups);
    const extractedAnnualTable = findAnnualTable(tablesGroups);
    const extractedActualTable = findActualTable(tablesGroups, "clausura");

    return {
      extractedAverages,
      extractedAnnualTable,
      extractedActualTable,
    };
  } catch (error) {
    throw error;
  }
};
