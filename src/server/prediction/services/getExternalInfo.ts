import {
  findAverageTable,
  findActualTable,
  findAnnualTable,
} from "@prediction/utils/findCorrectTable";
import { fetchPageData, PromiedosSchemaError } from "@shared/promiedos/client";
import { getTablesGroupsFromPageData } from "@shared/promiedos/validators";
import type { ApiResponse } from "@typos/api";

export const getTableExternalInfo = async (URL: string) => {
  const data = await fetchPageData(URL);
  const tablesGroups = getTablesGroupsFromPageData(data);

  if (!tablesGroups) {
    throw new PromiedosSchemaError(
      "Promiedos respondió un tables_groups inválido.",
    );
  }

  const typedTablesGroups: ApiResponse[] = tablesGroups;

  const extractedActualTable = findActualTable(typedTablesGroups);
  const extractedAverages = findAverageTable(typedTablesGroups);
  const extractedAnnualTable = findAnnualTable(typedTablesGroups);

  return {
    extractedActualTable,
    extractedAverages,
    extractedAnnualTable,
  };
};
