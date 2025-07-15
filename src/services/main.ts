import { calculateTotal } from "@utils/calculateTotal";
import { extractActualData } from "./extractActualData";
import { getExternalInfo } from "./getExternalInfo";
import { extractAverageData } from "./extractAverageData";
import { URL } from "@config/config";
import type { CompleteTeamData } from "@typos/teamPrediction";

export const main = async (): Promise<CompleteTeamData[]> => {
  try {
    const { extractedActualTable, extractedAverages } = await getExternalInfo(
      URL
    );

    const actualTableData = extractActualData(extractedActualTable);
    const averageData = extractAverageData(extractedAverages);

    return calculateTotal(actualTableData, averageData);
  } catch (error) {
    throw error;
  }
};
