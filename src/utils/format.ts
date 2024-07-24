import type { TeamInfo } from "../types/teamPrediction";

export default function format(
  extractedData: cheerio.Cheerio,
  cheerioRoot: cheerio.Root
): TeamInfo[] {
  const buffer: TeamInfo[] = [];

  if (extractedData.length > 0) {
    extractedData.find("tbody tr").each((_, row) => {
      const tableColumns = cheerioRoot(row).find("td");

      const $name = tableColumns.eq(1).text().trim();
      const $totalPoints = parseInt(tableColumns.eq(2).text(), 10);
      const $playedMatches = parseInt(tableColumns.eq(3).text(), 10);
      const $scoredGoals = parseInt(tableColumns.eq(7).text(), 10);
      const $concededGoals = parseInt(tableColumns.eq(8).text(), 10);

      const hasObservations = $name.at(-1) === "*";
      const adjustedName = hasObservations ? $name.slice(0, -1) : $name;

      const teamStats: TeamInfo = {
        nombre: adjustedName,
        puntosTotales: $totalPoints,
        partidosJugados: $playedMatches,
        diferenciaGoles: $scoredGoals - $concededGoals,
      };

      buffer.push(teamStats);
    });
    return buffer;
  }

  return [];
}
