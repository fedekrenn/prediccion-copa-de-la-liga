import { addEffectivityInfo } from "./addEffectivityInfo";
import { addAverageInfo } from "./addAverageInfo";
import type {
  TeamInfo,
  TeamAverageStats,
  TeamAnnualStats,
  TeamPredictionCalculations,
} from "@typos/teamPrediction";

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

    return addAverageInfo(
      updatedTeamEffectivity,
      teamInAverageTable,
      yearGamePlayed
    );
  });
};
