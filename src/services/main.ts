import { calculateTotal } from "@utils/calculateTotal";
import { extractAnnualData } from "./extractAnnualData";
import { getExternalInfo } from "./getExternalInfo";
import { extractAverageData } from "./extractAverageData";
import type { CompletePrediction } from "@typos/teamPrediction";

const URL = "https://www.promiedos.com.ar/league/liga-profesional/hc";

export const main = async (): Promise<CompletePrediction[]> => {
  try {
    const { $, extractedAnnualTable, extractedAverages } = await getExternalInfo(URL)

    const annualTableData = extractAnnualData(extractedAnnualTable, $);
    const averageData = extractAverageData(extractedAverages, $);

    const dataExists = annualTableData && averageData;

    if (!dataExists)
      throw new Error("No se pudo obtener la información de la página.");

    return calculateTotal(annualTableData, averageData);
  } catch (error) {
    throw error;
  }
};
