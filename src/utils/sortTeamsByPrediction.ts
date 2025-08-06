import type {
  TeamInfo,
  TeamPredictionCalculations,
} from "@typos/teamPrediction";

/*
 Sorts by: estimatedTotalPoints > totalPoints > playedMatches > goalsDifference > estimatedAverage
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
