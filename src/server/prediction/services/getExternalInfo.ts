import {
  findAverageTable,
  findActualTable,
  findAnnualTable,
} from "@prediction/utils/findCorrectTable";
import type { ApiResponse } from "@typos/api";

const NEXT_DATA_REGEX =
  /<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/s;

const extractDataFromHTML = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      Accept: "text/html",
    },
  });

  const html = await response.text();
  const match = html.match(NEXT_DATA_REGEX);

  if (!match) throw new Error("No se pudo extraer __NEXT_DATA__ de la página.");

  const nextData = JSON.parse(match[1]);
  return nextData.props.pageProps.data;
};

export const getExternalInfo = async (URL: string) => {
  const data = await extractDataFromHTML(URL);

  if (!data) throw new Error("No se pudo extraer el contenido de la página.");

  const tablesGroups: ApiResponse[] = data.tables_groups;

  const extractedActualTable = findActualTable(tablesGroups);
  const extractedAverages = findAverageTable(tablesGroups);
  const extractedAnnualTable = findAnnualTable(tablesGroups);

  return {
    extractedActualTable,
    extractedAverages,
    extractedAnnualTable,
  };
};
