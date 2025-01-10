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
  annualTableData: TeamInfo[],
  averageData: AverageInfo[]
): CompletePrediction[] => {
  const estimatedTeamInfo = addEffectivityInfo(annualTableData);

  let lastOfAverage: CompleteAverageInfo | null = null;
  let lastOfTable = 30;
  let minEstimatedAverage = Infinity;

  const finalData = estimatedTeamInfo.map((team) => {
    const foundTeamAverage = averageData.find(
      (_team) => _team.name === team.name
    );

    if (foundTeamAverage) {
      const finalInfo = addAverageInfo(team, foundTeamAverage);

      if (finalInfo.estimatedAverage < minEstimatedAverage) {
        minEstimatedAverage = finalInfo.estimatedAverage;
        lastOfAverage = finalInfo;
      }

      return finalInfo;
    } else {
      throw new Error("No se encontró el equipo en la tabla de promedios.");
    }
  });

  finalData.sort((a, b) => {
    if (a.estimatedTotalPoints === b.estimatedTotalPoints) {
      if (a.playedMatches === b.playedMatches) {
        return b.goalsDifference - a.goalsDifference;
      }
      return a.playedMatches - b.playedMatches;
    }
    return b.estimatedTotalPoints - a.estimatedTotalPoints;
  });

  if (finalData.at(-1) === lastOfAverage) {
    lastOfTable--;
  }

  return finalData.map((teamInfo, index) => {
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
