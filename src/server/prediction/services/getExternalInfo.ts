import axios from "axios";
import {
  findAverageTable,
  findActualTable,
  findAnnualTable,
} from "@prediction/utils/findCorrectTable";
import type { ApiResponse } from "@typos/api";

export const getExternalInfo = async (URL: string) => {
  const { data } = await axios.get(URL);

  if (!data) throw new Error("No se pudo extraer el contenido de la página.");

  const tablesGroups: ApiResponse[] = data.tables_groups;

  const extractedActualTable = findActualTable(tablesGroups, "clausura");
  const extractedAverages = findAverageTable(tablesGroups);
  const extractedAnnualTable = findAnnualTable(tablesGroups);

  return {
    extractedActualTable,
    extractedAverages,
    extractedAnnualTable,
  };
};
