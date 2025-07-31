import { TOTAL_GAMES } from "../config/config";
import type {
  TeamAverageStats,
  TeamInfo,
  TeamEffectivityCalculations,
  TeamPredictionCalculations,
} from "@typos/teamPrediction";

export const addAverageInfo = (
  generalTeamInfo: TeamInfo & TeamEffectivityCalculations,
  averageTeamInfo: TeamAverageStats,
  yearGamePlayed: number
): TeamInfo & TeamPredictionCalculations => {
  const { estimatedTotalPoints, playedMatches } = generalTeamInfo;
  const { avgTotalGames, previousSeasonsPoints } = averageTeamInfo;

  /*
  If the team hasn't played any matches, we show the average of the 
  league and no calculate it because the effectivity is 0 by default
  */
  if (playedMatches === 0) {
    return {
      ...generalTeamInfo,
      estimatedAverage: previousSeasonsPoints / avgTotalGames || 0,
    };
  }

  const projectedTotalPoints = estimatedTotalPoints + previousSeasonsPoints;
  const totalFinalMatches = avgTotalGames + TOTAL_GAMES - yearGamePlayed;

  const calculateAverage = projectedTotalPoints / totalFinalMatches || 0;
  const formattedAverage = parseFloat(calculateAverage.toFixed(3));

  return {
    ...generalTeamInfo,
    estimatedAverage: formattedAverage,
  };
};
