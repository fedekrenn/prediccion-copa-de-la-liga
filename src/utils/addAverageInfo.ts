import type {
  AverageInfo,
  PartialPrediction,
  CompleteAverageInfo,
} from "@typos/teamPrediction";

export const addAverageInfo = (
  generalTableInfo: PartialPrediction,
  averageTeamInfo: AverageInfo
): CompleteAverageInfo => {
  const { estimatedTotalPoints, totalPoints, playedMatches } = generalTableInfo;
  const { currentPoints } = averageTeamInfo;

  const $estimatedTotalPoints = estimatedTotalPoints + totalPoints;

  const calculateAverage =
    (currentPoints + $estimatedTotalPoints) /
    (playedMatches + 27 + 14 - playedMatches);

  const estimatedAverage = parseFloat(calculateAverage.toFixed(3));

  const meme = {
    ...generalTableInfo,
    estimatedTotalPoints: $estimatedTotalPoints,
    estimatedAverage,
  };

  return meme;
};
