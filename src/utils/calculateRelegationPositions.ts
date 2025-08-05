import { TEAM_TABLE_CONFIG } from "./constants";
import type {
  TeamInfo,
  TeamPredictionCalculations,
  TeamEffectivityCalculations,
} from "@typos/teamPrediction";

export interface RelegationInfo {
  lastOfAverage: (TeamInfo & TeamEffectivityCalculations) | null;
  lastTablePosition: number;
}

export const calculateRelegationPositions = (
  sortedTeams: (TeamInfo & TeamPredictionCalculations)[]
): RelegationInfo => {
  let lastOfAverage: (TeamInfo & TeamEffectivityCalculations) | null = null;
  let lowestAverage = Infinity;

  for (const team of sortedTeams) {
    if (team.estimatedAverage < lowestAverage) {
      lowestAverage = team.estimatedAverage;
      lastOfAverage = team;
    }
  }

  let lastTablePosition = TEAM_TABLE_CONFIG.DEFAULT_LAST_POSITION;

  /* 
  If the last in the table is the same as the last in the averages, the
  one immediately above in the previous position will move down the table.
  */
  if (sortedTeams.at(-1) === lastOfAverage) {
    lastTablePosition--;
  }

  return {
    lastOfAverage,
    lastTablePosition,
  };
};
