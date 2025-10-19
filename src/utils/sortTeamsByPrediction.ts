import type {
  TeamInfo,
  TeamPredictionCalculations,
} from "@typos/teamPrediction";

/**
 * Sorts the teams by their prediction calculations. The order is determined by:
 * 1. Estimated Total Points (descending)
 * 2. Total Points (descending)
 * 3. Played Matches (ascending)
 * 4. Goals Difference (descending)
 * 5. Estimated Average (descending)
 * @param teams - The teams to sort
 * @returns The sorted teams
 */
export const sortTeamsByPrediction = (
  teams: (TeamInfo & TeamPredictionCalculations)[]
): (TeamInfo & TeamPredictionCalculations)[] => {
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

    if (a.goalsDifference !== b.goalsDifference) {
      return b.goalsDifference - a.goalsDifference;
    }

    return b.estimatedAverage - a.estimatedAverage;
  });
};
