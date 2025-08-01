import { calculateTotal } from "@utils/calculateTotal";
import { extractActualData } from "./extractActualData";
import { extractAnnualData } from "./extractAnnualData";
import { extractAverageData } from "./extractAverageData";
import { getExternalInfo } from "./getExternalInfo";
import { URL } from "@config/config";
import type { CompleteTeamData } from "@typos/teamPrediction";

export const main = async (): Promise<CompleteTeamData[]> => {
  try {
    const { extractedActualTable, extractedAverages, extractedAnnualTable } =
      await getExternalInfo(URL);

    const actualTableData = extractActualData(extractedActualTable);
    const averageTableData = extractAverageData(extractedAverages);
    const annualTableData = extractAnnualData(extractedAnnualTable);

    return calculateTotal(actualTableData, averageTableData, annualTableData);
  } catch (error) {
    throw error;
  }
};
