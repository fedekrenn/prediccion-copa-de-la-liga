import { calculateTotal } from "@utils/calculateTotal";
import { getData } from "./getData";
import { importData } from "./importData";
import { getAverageData } from "./getAverageData";
import type { CompletePrediction } from "@typos/teamPrediction";

const URL = "https://www.promiedos.com.ar/league/liga-profesional/hc";

export const main = async (): Promise<CompletePrediction[]> => {
  try {
    const { $, extractedAnnualTable, extractedAverages } = await importData(URL)

    const annualTableData = getData(extractedAnnualTable, $);
    const averageData = getAverageData(extractedAverages, $);

    const dataExists = annualTableData && averageData;

    if (!dataExists)
      throw new Error("No se pudo obtener la información de la página.");

    return calculateTotal(annualTableData, averageData);
  } catch (error) {
    throw error;
  }
};
