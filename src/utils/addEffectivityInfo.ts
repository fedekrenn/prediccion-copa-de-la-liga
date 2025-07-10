import { TOTAL_GAMES } from "../config/config";
import type {
  TeamInfo,
  TeamEffectivityCalculations,
} from "@typos/teamPrediction";

export const addEffectivityInfo = (
  generalTeamInfo: TeamInfo
): TeamInfo & TeamEffectivityCalculations => {
  const { totalPoints, playedMatches } = generalTeamInfo;

  const effectivityPorcentage =
    Math.round((totalPoints / (playedMatches * 3)) * 100) || 0;

  const remainingMatches = TOTAL_GAMES - playedMatches;
  const maxPossiblePoints = remainingMatches * 3;

  const estimatedTotalPoints =
    Math.round((effectivityPorcentage * maxPossiblePoints) / 100) + totalPoints;

  return {
    ...generalTeamInfo,
    effectivityPorcentage,
    estimatedTotalPoints,
  };
};
