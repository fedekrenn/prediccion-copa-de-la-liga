import type { TeamAverageStats } from "@typos/teamPrediction";
import type { ExternalData } from "@typos/api";

export const extractAverageData = (
  extractedData: ExternalData[],
): TeamAverageStats[] => {
  return extractedData.map((team) => {
    const $name = team.entity.object.short_name;
    const $previousSeasonsPoints =
      parseInt(team.values[3].value) + parseInt(team.values[4].value);
    const $avgTotalGames = parseInt(team.values[1].value);
    const $allAvgInfo = {
      first: parseInt(team.values[3].value),
      second: parseInt(team.values[4].value),
      third: parseInt(team.values[5].value),
    };

    return {
      name: $name,
      previousSeasonsPoints: $previousSeasonsPoints,
      avgTotalGames: $avgTotalGames,
      allAvgInfo: $allAvgInfo,
    };
  });
};
