import type {
  AverageInfo,
  TeamInfo,
  PartialPrediction,
  CompleteAverageInfo,
} from "@typos/teamPrediction";

export const generateFinalInfo = (
  generalTableInfo: TeamInfo,
  prediction: PartialPrediction,
  averageTeamInfo: AverageInfo
): CompleteAverageInfo => {
  const { effectivityPorcentage } = prediction;
  const estimatedTotalPoints =
    prediction.estimatedTotalPoints + generalTableInfo.totalPoints;
  const calculateAverage =
    (averageTeamInfo.currentPoints + estimatedTotalPoints) /
    (averageTeamInfo.playedMatches + 27 + 14 - generalTableInfo.playedMatches);
  const estimatedAverage = parseFloat(calculateAverage.toFixed(3));

  return {
    ...generalTableInfo,
    effectivityPorcentage,
    estimatedTotalPoints,
    estimatedAverage,
    img: averageTeamInfo.img,
  };
};
