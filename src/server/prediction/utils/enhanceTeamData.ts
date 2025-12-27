import { addEffectivityInfo } from "@prediction/utils/addEffectivityInfo";
import { addAverageInfo } from "@prediction/utils/addAverageInfo";
import type {
  TeamInfo,
  TeamAverageStats,
  TeamAnnualStats,
  TeamInfoWithPredictionCalculationsList,
} from "@typos/teamPrediction";

export const enhanceTeamData = (
  actualTable: TeamInfo[],
  averageTable: TeamAverageStats[],
  annualTable: TeamAnnualStats[]
): TeamInfoWithPredictionCalculationsList => {
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
