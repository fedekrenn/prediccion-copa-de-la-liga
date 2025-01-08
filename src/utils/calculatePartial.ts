import type { TeamInfo, PartialPrediction } from "@typos/teamPrediction";

const TOTAL_GAMES = 32;

export const calculatePartial = (
  currentTableData: TeamInfo[]
): PartialPrediction[] => {
  return currentTableData.map((data) => {
    const { totalPoints, playedMatches } = data;

    const effectivityPorcentage =
      Math.round((totalPoints / (playedMatches * 3)) * 100) || 0;
    const remainingMatches = TOTAL_GAMES - playedMatches;
    const maxPossiblePoints = remainingMatches * 3;
    const estimatedTotalPoints = Math.round(
      (effectivityPorcentage * maxPossiblePoints) / 100
    );

    return {
      ...data,
      totalPoints,
      playedMatches,
      effectivityPorcentage,
      estimatedTotalPoints,
    };
  });
};
