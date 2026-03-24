import { calculateTotal } from "@prediction/utils/calculateTotal";
import { extractActualData } from "./extractActualData";
import { extractAnnualData } from "./extractAnnualData";
import { extractAverageData } from "./extractAverageData";
import { getTableExternalInfo } from "./getExternalInfo";
import { config } from "@config/config";
import type { CompleteTeamData } from "@typos/teamPrediction";

export const getTable = async (): Promise<CompleteTeamData[]> => {
  const { extractedActualTable, extractedAverages, extractedAnnualTable } =
    await getTableExternalInfo(config.api.URL);

  const actualTableData = extractActualData(extractedActualTable);
  const averageTableData = extractAverageData(extractedAverages);
  const annualTableData = extractAnnualData(extractedAnnualTable);

  return calculateTotal(actualTableData, averageTableData, annualTableData);
};
