import { addEffectivityInfo } from "./addEffectivityInfo";
import { addAverageInfo } from "./addAverageInfo";
import type {
  TeamInfo,
  TeamAverageStats,
  TeamAnnualStats,
  TeamPredictionCalculations,
} from "@typos/teamPrediction";

/**
 * Enhances the team data by adding effectivity and average information.
 * @param actualTable - The actual table data to extract information from
 * @param averageTable - The average table data to extract information from
 * @param annualTable - The annual table data to extract information from
 * @returns An array of enhanced team data with effectivity and average calculations
 */
export const enhanceTeamData = (
  actualTable: TeamInfo[],
  averageTable: TeamAverageStats[],
  annualTable: TeamAnnualStats[]
): (TeamInfo & TeamPredictionCalculations)[] => {
  return actualTable.map((teamInfo) => {
    const teamInAverageTable = averageTable.find(
      ({ name }) => name === teamInfo.name
    );

    const teamInAnnualTable = annualTable.find(
      ({ name }) => name === teamInfo.name
    );

    if (!teamInAverageTable || !teamInAnnualTable) {
      throw new Error(
        `No se encontraron datos completos para el equipo: ${teamInfo.name}`
      );
    }

    const { annualPoints, yearGamePlayed } = teamInAnnualTable;

    const updatedTeamEffectivity = addEffectivityInfo(
      teamInfo,
      annualPoints,
      yearGamePlayed
    );

    const updatedTeamAverage = addAverageInfo(
      updatedTeamEffectivity,
      teamInAverageTable,
      yearGamePlayed
    );

    return updatedTeamAverage;
  });
};
