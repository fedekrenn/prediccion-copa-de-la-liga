import { calculateTotal } from "@utils/calculateTotal";
import { extractAnnualData } from "./extractAnnualData";
import { getExternalInfo } from "./getExternalInfo";
import { extractAverageData } from "./extractAverageData";
import { URL } from "@config/config";
import type { CompletePrediction } from "@typos/teamPrediction";

export const main = async (): Promise<CompletePrediction[]> => {
  try {
    const { extractedAnnualTable, extractedAverages } = await getExternalInfo(
      URL
    );

    const annualTableData = extractAnnualData(extractedAnnualTable);
    const averageData = extractAverageData(extractedAverages);

    return calculateTotal(annualTableData, averageData);
  } catch (error) {
    throw error;
  }
};
