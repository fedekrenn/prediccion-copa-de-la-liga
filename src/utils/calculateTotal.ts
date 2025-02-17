import { addEffectivityInfo } from "./addEffectivityInfo";
import { addAverageInfo } from "./addAverageInfo";
import { calculateClasification } from "./calculateClasification";
import type {
  TeamInfo,
  AverageInfo,
  EffectivityPrediction,
  FinalData,
} from "@typos/teamPrediction";

export const calculateTotal = (
  annualTable: TeamInfo[],
  averageTable: AverageInfo[]
): FinalData[] => {
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
      if (a.totalPoints === b.totalPoints) {
        if (a.playedMatches === b.playedMatches) {
          if (a.goalsDifference === b.goalsDifference) {
            return b.estimatedAverage - a.estimatedAverage;
          }
          return b.goalsDifference - a.goalsDifference;
        }
        return a.playedMatches - b.playedMatches;
      }
      return b.totalPoints - a.totalPoints;
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

  const finalTeamStats: FinalData[] = completePrediction.map((teamInfo, i) => {
    const position = i + 1;
    const isLastByAverage = teamInfo === lastOfAverage;
    const isLastByTable = position === lastTablePosition;

    const {
      name,
      img,
      playedMatches,
      totalPoints,
      goalsDifference,
      gamesWon,
      gamesLost,
      gamesEven,
      estimatedTotalPoints,
      estimatedAverage,
      effectivityPorcentage,
      liveData,
    } = teamInfo;

    return {
      teamInfo: {
        name,
        img,
      },
      actualData: {
        totalPoints,
        playedMatches,
        goalsDifference,
        gamesWon,
        gamesLost,
        gamesEven,
        liveData,
      },
      tablePrediction: {
        position,
        classification: calculateClasification(
          position,
          isLastByAverage,
          isLastByTable
        ),
        estimatedTotalPoints,
        estimatedAverage,
        effectivityPorcentage,
      },
    };
  });

  return finalTeamStats;
};
