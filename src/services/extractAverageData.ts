import type { AverageInfo } from "@typos/teamPrediction";

export const extractAverageData = (
  extractedData: cheerio.Cheerio,
  cheerioRoot: cheerio.Root
) => {
  const buffer: AverageInfo[] = [];

  if (extractedData.length > 0) {
    extractedData.find("tbody tr").each((_, row) => {
      const tableColumns = cheerioRoot(row).find("td");

      const $name = tableColumns.eq(1).text().trim();
      const $avgTotalPoints = parseInt(tableColumns.eq(3).text());
      const $avgTotalGames = parseInt(tableColumns.eq(4).text());

      const teamStats: AverageInfo = {
        name: $name,
        avgTotalPoints: $avgTotalPoints,
        avgTotalGames: $avgTotalGames,
      };

      buffer.push(teamStats);
    });

    return buffer;
  } else {
    throw new Error("No se encontró la tabla en la página.");
  }
};
