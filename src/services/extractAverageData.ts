import type { AverageInfo } from "@typos/teamPrediction";
import type { ExternalData } from "@typos/api";

export const extractAverageData = (
  extractedData: ExternalData[]
): AverageInfo[] => {
  return extractedData.map((team) => {
    const $name = team.entity.object.short_name;
    const $avgTotalPoints = parseInt(team.values[0].value);
    const $avgTotalGames = parseInt(team.values[1].value);

    return {
      name: $name,
      avgTotalPoints: $avgTotalPoints,
      avgTotalGames: $avgTotalGames,
    };
  });
};
