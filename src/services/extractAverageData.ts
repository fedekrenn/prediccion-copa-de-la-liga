import type { TeamAverageStats } from "@typos/teamPrediction";
import type { ExternalData } from "@typos/api";

/**
 * This function extracts average data for each team from the provided external data.
 * @param extractedData - The external data to extract average information from
 * @returns An array of TeamAverageStats objects representing the average data for each team
 */
export const extractAverageData = (
  extractedData: ExternalData[]
): TeamAverageStats[] => {
  return extractedData.map((team) => {
    const $name = team.entity.object.short_name;
    const $previousSeasonsPoints =
      parseInt(team.values[3].value) + parseInt(team.values[4].value);
    const $avgTotalGames = parseInt(team.values[1].value);

    return {
      name: $name,
      previousSeasonsPoints: $previousSeasonsPoints,
      avgTotalGames: $avgTotalGames,
    };
  });
};
