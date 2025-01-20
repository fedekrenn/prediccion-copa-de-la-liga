import { addEffectivityInfo } from "./addEffectivityInfo";
import { addAverageInfo } from "./addAverageInfo";
import { calculateClasification } from "./calculateClasification";
import type {
  TeamInfo,
  AverageInfo,
  EffectivityPrediction,
  CompletePrediction,
} from "@typos/teamPrediction";

export const calculateTotal = (
  annualTable: TeamInfo[],
  averageTable: AverageInfo[]
): CompletePrediction[] => {
  let lastOfAverage: EffectivityPrediction | null = null;
  let lastTablePosition = 30;
  let lowestAverage = Infinity;

  const completePrediction = annualTable.map((teamInfo) => {
    const updatedTeamEffectivity = addEffectivityInfo(teamInfo);

    const teamInAverageTable = averageTable.find(
      ({ name }) => name === teamInfo.name
    );

    if (teamInAverageTable) {
      const updatedTeamAverage = addAverageInfo(
        updatedTeamEffectivity,
        teamInAverageTable
      );

      if (updatedTeamAverage.estimatedAverage < lowestAverage) {
        lowestAverage = updatedTeamAverage.estimatedAverage;
        lastOfAverage = updatedTeamAverage;
      }

      return updatedTeamAverage;
    } else {
      throw new Error("No se encontró el equipo en la tabla de promedios.");
    }
  });

  completePrediction.sort((a, b) => {
    if (a.estimatedTotalPoints === b.estimatedTotalPoints) {
      if (a.playedMatches === b.playedMatches) {
        return b.goalsDifference - a.goalsDifference;
      }
      return a.playedMatches - b.playedMatches;
    }
    return b.estimatedTotalPoints - a.estimatedTotalPoints;
  });

  /* 
  If the last in the table is the same as the last in the averages, the
  one immediately above in the previous position will move down the table.
  */
  if (completePrediction.at(-1) === lastOfAverage) {
    lastTablePosition--;
  }

  return completePrediction.map((teamInfo, i) => {
    const position = i + 1;
    const isLastByAverage = teamInfo === lastOfAverage;
    const isLastByTable = position === lastTablePosition;

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
