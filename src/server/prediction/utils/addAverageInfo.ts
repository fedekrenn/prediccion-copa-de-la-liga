import { config } from "@config/config";
import type {
  TeamInfo,
  TeamEffectivityCalculations,
  TeamPredictionCalculations,
  TeamAverageStats,
} from "@typos/teamPrediction";

const safeDivide = (numerator: number, denominator: number): number => {
  const result = numerator / denominator;
  return Number.isFinite(result) ? result : 0;
};

export const addAverageInfo = (
  generalTeamInfo: TeamInfo & TeamEffectivityCalculations,
  averageTeamInfo: TeamAverageStats,
  yearGamePlayed: number,
): TeamInfo & TeamPredictionCalculations => {
  const { estimatedTotalPoints, playedMatches } = generalTeamInfo;
  const { avgTotalGames, previousSeasonsPoints, allAvgInfo } = averageTeamInfo;

  const { first, second, third } = allAvgInfo;

  if (playedMatches === 0) {
    return {
      ...generalTeamInfo,
      estimatedAverage: safeDivide(previousSeasonsPoints, avgTotalGames),
      nextSeasonAverage: safeDivide(second + third, avgTotalGames),
    };
  }

  const projectedTotalPoints = estimatedTotalPoints + previousSeasonsPoints;
  const totalFinalMatches =
    avgTotalGames + config.prediction.TOTAL_GAMES - yearGamePlayed;

  const calculateAverage = safeDivide(projectedTotalPoints, totalFinalMatches);
  const formattedAverage = parseFloat(calculateAverage.toFixed(3));

  let nextSesonTotalGames;

  if (first === 0) {
    nextSesonTotalGames = avgTotalGames;
  } else {
    nextSesonTotalGames = avgTotalGames - 41;
  }

  const nextSeasonAverage = safeDivide(second + third, nextSesonTotalGames);

  return {
    ...generalTeamInfo,
    estimatedAverage: formattedAverage,
    nextSeasonAverage: parseFloat(nextSeasonAverage.toFixed(3)),
  };
};
