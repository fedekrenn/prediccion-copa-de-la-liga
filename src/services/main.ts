import { calculateTotal } from "@utils/calculateTotal";
import { extractActualData } from "./extractActualData";
import { extractAnnualData } from "./extractAnnualData";
import { extractAverageData } from "./extractAverageData";
import { getExternalInfo } from "./getExternalInfo";
import { config } from "@config/config";
import type { CompleteTeamData } from "@typos/teamPrediction";

/**
 * Main function to fetch data and calculate complete team data.
 * @returns A promise that resolves to an array of complete team data objects with final prediction calculations.
 */
export const main = async (): Promise<CompleteTeamData[]> => {
  try {
    const { extractedActualTable, extractedAverages, extractedAnnualTable } =
      await getExternalInfo(config.api.URL);

    const actualTableData = extractActualData(extractedActualTable);
    const averageTableData = extractAverageData(extractedAverages);
    const annualTableData = extractAnnualData(extractedAnnualTable);

    return calculateTotal(actualTableData, averageTableData, annualTableData);
  } catch (error) {
    throw error;
  }
};
