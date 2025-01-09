import type {
  AverageInfo,
  PartialPrediction,
  CompleteAverageInfo,
} from "@typos/teamPrediction";

export const addAverageInfo = (
  generalTableInfo: PartialPrediction,
  averageTeamInfo: AverageInfo
): CompleteAverageInfo => {
  const { estimatedTotalPoints, playedMatches } = generalTableInfo;
  const { avgTotalGames, avgTotalPoints } = averageTeamInfo;

  // If the team hasn't played any matches, we show the average of the league and no calculate it because the effectivity is 0 by default
  if (playedMatches === 0) {
    return {
      ...generalTableInfo,
      estimatedAverage: avgTotalPoints / avgTotalGames || 0,
    };
  }

  const projectedPointsTotal = estimatedTotalPoints + avgTotalPoints;
  const calculateAverage = projectedPointsTotal / (avgTotalGames + 32) || 0;
  const formattedAverage = parseFloat(calculateAverage.toFixed(3));

  return {
    ...generalTableInfo,
    estimatedAverage: formattedAverage,
  };
};
