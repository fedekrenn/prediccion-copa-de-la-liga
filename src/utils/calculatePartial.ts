import type { TeamInfo, PartialPrediction } from "../types/teamPrediction";

const TOTAL_GAMES = 27;

export default function calculatePartial(
  currentTableData: TeamInfo[]
): PartialPrediction[] {
  return currentTableData.map(({ name, totalPoints, playedMatches }) => {
    const effectivityPorcentage = Math.round(
      (totalPoints / (playedMatches * 3)) * 100
    );
    const remainingMatches = TOTAL_GAMES - playedMatches;
    const maxPossiblePoints = remainingMatches * 3;
    const estimatedTotalPoints = Math.round(
      (effectivityPorcentage * maxPossiblePoints) / 100
    );

    return {
      name,
      effectivityPorcentage,
      estimatedTotalPoints,
    };
  });
}
