import type { TeamInfoWithPredictionCalculationsList } from "@typos/teamPrediction";

export const sortTeamsByPrediction = (
  teams: TeamInfoWithPredictionCalculationsList
): TeamInfoWithPredictionCalculationsList => {
  return teams.toSorted((a, b) => {
    if (a.estimatedTotalPoints !== b.estimatedTotalPoints) {
      return b.estimatedTotalPoints - a.estimatedTotalPoints;
    }

    if (a.totalPoints !== b.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }

    if (a.playedMatches !== b.playedMatches) {
      return a.playedMatches - b.playedMatches;
    }

    const aGoalDiff = a.goalsFor - a.goalsAgainst;
    const bGoalDiff = b.goalsFor - b.goalsAgainst;
    if (aGoalDiff !== bGoalDiff) {
      return bGoalDiff - aGoalDiff;
    }

    return b.estimatedAverage - a.estimatedAverage;
  });
};
