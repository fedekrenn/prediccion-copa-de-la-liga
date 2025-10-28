import { config } from "../config/config";
import type {
  TeamInfo,
  TeamEffectivityCalculations,
} from "@typos/teamPrediction";

/**
 * Adds effectivity information to the general team info.
 * @param generalTeamInfo - The general team information
 * @param annualPoints - The annual points scored by the team
 * @param yearGamePlayed - The number of games played in the year
 * @returns The team information with added effectivity calculations
 */
export const addEffectivityInfo = (
  generalTeamInfo: TeamInfo,
  annualPoints: number,
  yearGamePlayed: number
): TeamInfo & TeamEffectivityCalculations => {
  const { totalPoints, playedMatches } = generalTeamInfo;

  const effectivityPercentage =
    Math.round((totalPoints / (playedMatches * 3)) * 100) || 0;

  const remainingMatches = config.prediction.TOTAL_GAMES - yearGamePlayed;
  const maxPossiblePoints = remainingMatches * 3;

  const estimatedTotalPoints = Math.round(
    (effectivityPercentage * maxPossiblePoints) / 100 + annualPoints
  );

  return {
    ...generalTeamInfo,
    effectivityPercentage,
    estimatedTotalPoints,
    annualPoints,
  };
};
