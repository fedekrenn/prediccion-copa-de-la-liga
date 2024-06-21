import calculateTotal from "@utils/calculateTotal";
import getData from "./getData";
import getExternalData from "./getExternalData";
import getAverageData from "./getAverageData";
import type { CompletePrediction } from "../types/teamPrediction";

const URL = "https://www.promiedos.com.ar/primera";

export default async function main(): Promise<CompletePrediction[]> {
  try {
    const { $, tablaAnual, tablaActual, promedios } = await getExternalData(
      URL
    );

    const datosTablaAnual = getData(tablaAnual, $);
    const datosTablaActual = getData(tablaActual, $);
    const datosPromedios = getAverageData(promedios, $);

    const dataExists = datosTablaAnual && datosTablaActual && datosPromedios;

    if (!dataExists) {
      throw new Error("No se pudo obtener la información de la página.");
    }

    return calculateTotal(datosTablaAnual, datosTablaActual, datosPromedios);
  } catch (error) {
    throw error;
  }
}
