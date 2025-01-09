import type { TeamInfo } from "@typos/teamPrediction";

export const extractAnnualData = (
  extractedData: cheerio.Cheerio,
  cheerioRoot: cheerio.Root
) => {
  const buffer: TeamInfo[] = [];

  if (extractedData.length > 0) {
    extractedData.find("tbody tr").each((_, row) => {
      const tableColumns = cheerioRoot(row).find("td");

      const $name = tableColumns.eq(1).text().trim();
      const $totalPoints = parseInt(tableColumns.eq(2).text(), 10);
      const $playedMatches = parseInt(tableColumns.eq(3).text(), 10);
      const $img = tableColumns.find("img").attr("src") || "🔘";
      const $goalsDifference = tableColumns.eq(4).text().trim();

      const [goalsFor, goalsAgainst] = $goalsDifference.split(":");
      const goalsDifference = Number(goalsFor) - Number(goalsAgainst);

      const hasObservations = $name.at(-1) === "*";
      const name = hasObservations ? $name.slice(0, -1) : $name;

      const teamStats: TeamInfo = {
        name,
        totalPoints: $totalPoints,
        playedMatches: $playedMatches,
        goalsDifference,
        img: $img,
      };

      buffer.push(teamStats);
    });

    return buffer;
  } else {
    throw new Error("No se encontró la tabla en la página.");
  }
};
