import { TOTAL_GAMES } from "../config/config";
import type {
  TeamAverageStats,
  TeamInfo,
  TeamEffectivityCalculations,
  TeamPredictionCalculations,
} from "@typos/teamPrediction";

export const addAverageInfo = (
  generalTeamInfo: TeamInfo & TeamEffectivityCalculations,
  averageTeamInfo: TeamAverageStats
): TeamInfo & TeamPredictionCalculations => {
  const { estimatedTotalPoints, playedMatches, totalPoints } = generalTeamInfo;
  const { avgTotalGames, avgTotalPoints } = averageTeamInfo;

  /*
  If the team hasn't played any matches, we show the average of the 
  league and no calculate it because the effectivity is 0 by default
  */
  if (playedMatches === 0) {
    return {
      ...generalTeamInfo,
      estimatedAverage: avgTotalPoints / avgTotalGames || 0,
    };
  }

  const projectedTotalPoints =
    estimatedTotalPoints + avgTotalPoints - totalPoints;
  const totalFinalMatches = avgTotalGames + TOTAL_GAMES - playedMatches;

  const calculateAverage = projectedTotalPoints / totalFinalMatches || 0;
  const formattedAverage = parseFloat(calculateAverage.toFixed(3));

  return {
    ...generalTeamInfo,
    estimatedAverage: formattedAverage,
  };
};
