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
  yearGamePlayed: number,
): TeamInfo & TeamPredictionCalculations => {
  const { estimatedTotalPoints, playedMatches, name } = generalTeamInfo;
  const { avgTotalGames, previousSeasonsPoints, allAvgInfo } = averageTeamInfo;

  const { first, second, third } = allAvgInfo;

  if (playedMatches === 0) {
    return {
      ...generalTeamInfo,
      estimatedAverage: previousSeasonsPoints / avgTotalGames || 0,
      nextSeasonAverage: (second + third) / avgTotalGames || 0,
    };
  }

  const projectedTotalPoints = estimatedTotalPoints + previousSeasonsPoints;
  const totalFinalMatches =
    avgTotalGames + config.prediction.TOTAL_GAMES - yearGamePlayed;

  const calculateAverage = projectedTotalPoints / totalFinalMatches || 0;
  const formattedAverage = parseFloat(calculateAverage.toFixed(3));

  let nextSesonTotalGames;

  if (first === 0) {
    nextSesonTotalGames = avgTotalGames;
  } else {
    nextSesonTotalGames = avgTotalGames - 41;
  }

  const nextSeasonAverage = (second + third) / nextSesonTotalGames || 0;

  return {
    ...generalTeamInfo,
    estimatedAverage: formattedAverage,
    nextSeasonAverage: parseFloat(nextSeasonAverage.toFixed(3)),
  };
};
