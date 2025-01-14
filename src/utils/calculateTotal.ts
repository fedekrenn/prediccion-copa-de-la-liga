import { addEffectivityInfo } from "./addEffectivityInfo";
import { addAverageInfo } from "./addAverageInfo";
import { calculateClasification } from "./calculateClasification";
import type {
  TeamInfo,
  AverageInfo,
  CompleteAverageInfo,
  CompletePrediction,
} from "@typos/teamPrediction";

export const calculateTotal = (
  annualTable: TeamInfo[],
  averageTable: AverageInfo[]
): CompletePrediction[] => {
  let lastOfAverage: CompleteAverageInfo | null = null;
  let lastOfTable = 30;
  let minEstimatedAverage = Infinity;

  const calculatedTeamStats = annualTable.map((team) => {
    const updatedTeamEffectivity = addEffectivityInfo(team);

    const teamInAverageTable = averageTable.find(
      (_team) => _team.name === team.name
    );

    if (teamInAverageTable) {
      const updatedTeamAverage = addAverageInfo(
        updatedTeamEffectivity,
        teamInAverageTable
      );

      if (updatedTeamAverage.estimatedAverage < minEstimatedAverage) {
        minEstimatedAverage = updatedTeamAverage.estimatedAverage;
        lastOfAverage = updatedTeamAverage;
      }

      return updatedTeamAverage;
    } else {
      throw new Error("No se encontró el equipo en la tabla de promedios.");
    }
  });

  calculatedTeamStats.sort((a, b) => {
    if (a.estimatedTotalPoints === b.estimatedTotalPoints) {
      if (a.playedMatches === b.playedMatches) {
        return b.goalsDifference - a.goalsDifference;
      }
      return a.playedMatches - b.playedMatches;
    }
    return b.estimatedTotalPoints - a.estimatedTotalPoints;
  });

  if (calculatedTeamStats.at(-1) === lastOfAverage) {
    lastOfTable--;
  }

  return calculatedTeamStats.map((teamInfo, index) => {
    const position = index + 1;
    const isLastByAverage = teamInfo === lastOfAverage;
    const isLastByTable = position === lastOfTable;

    return {
      position,
      classification: calculateClasification(
        position,
        isLastByAverage,
        isLastByTable
      ),
      ...teamInfo,
    };
  });
};
