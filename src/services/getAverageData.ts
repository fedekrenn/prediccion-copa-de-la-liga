import type { AverageInfo } from "../types/teamPrediction";

export default function getAverageData(
  extractedData: cheerio.Cheerio,
  cheerioRoot: cheerio.Root
): AverageInfo[] {
  const tableData = extractedData;
  if (tableData.length === 0)
    throw new Error("No se encontró la tabla en la página.");

  const buffer: AverageInfo[] = [];

  if (tableData.length > 0) {
    tableData.find("tbody tr").each((_, row) => {
      const tableColumns = cheerioRoot(row).find("td");

      const $imageSource =
        cheerioRoot(row).find("img").attr("src") || "images/64/1.png";

      const $name = tableColumns.eq(1).text().trim();
      const $currentPoints = parseInt(tableColumns.eq(5).text());
      const $playedMatches = parseInt(tableColumns.eq(6).text());

      const teamStats: AverageInfo = {
        name: $name,
        currentPoints: $currentPoints,
        playedMatches: $playedMatches,
        img: `https://www.promiedos.com.ar/${$imageSource}`,
      };

      buffer.push(teamStats);
    });
    return buffer;
  }

  return [];
}
