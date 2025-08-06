import { calculateClasification } from "./calculateClasification";
import type {
  TeamInfo,
  TeamPredictionCalculations,
  CompleteTeamData,
} from "@typos/teamPrediction";
import type { RelegationInfo } from "./calculateRelegationPositions";

export const generateFinalInfo = (
  sortedTeams: (TeamInfo & TeamPredictionCalculations)[],
  relegationInfo: RelegationInfo
): CompleteTeamData[] => {
  const { lastOfAverage, lastTablePosition } = relegationInfo;

  return sortedTeams.map((teamInfo, index) => {
    const position = index + 1;
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
      baseInfo: {
        name,
        img,
      },
      seasonStats: {
        totalPoints,
        playedMatches,
        goalsDifference,
        gamesWon,
        gamesLost,
        gamesEven,
        liveData,
      },
      predictions: {
        estimatedTotalPoints,
        estimatedAverage,
        effectivityPorcentage,
      },
      tablePosition: {
        position,
        classification: calculateClasification(
          position,
          isLastByAverage,
          isLastByTable
        ),
      },
    };
  });
};
