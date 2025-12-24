import { config } from "@config/config";
import type {
  TeamInfo,
  TeamEffectivityCalculations,
  TeamPredictionCalculations,
  TeamAverageStats,
} from "@typos/teamPrediction";

export const addAverageInfo = (
  generalTeamInfo: TeamInfo & TeamEffectivityCalculations,
  averageTeamInfo: TeamAverageStats,
  yearGamePlayed: number
): TeamInfo & TeamPredictionCalculations => {
  const { estimatedTotalPoints, playedMatches } = generalTeamInfo;
  const { avgTotalGames, previousSeasonsPoints } = averageTeamInfo;

  if (playedMatches === 0) {
    return {
      ...generalTeamInfo,
      estimatedAverage: previousSeasonsPoints / avgTotalGames || 0,
    };
  }

  const projectedTotalPoints = estimatedTotalPoints + previousSeasonsPoints;
  const totalFinalMatches =
    avgTotalGames + config.prediction.TOTAL_GAMES - yearGamePlayed;

  const calculateAverage = projectedTotalPoints / totalFinalMatches || 0;
  const formattedAverage = parseFloat(calculateAverage.toFixed(3));

  return {
    ...generalTeamInfo,
    estimatedAverage: formattedAverage,
  };
};
