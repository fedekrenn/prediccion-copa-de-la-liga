import { calculateTeamPositioning } from "./teamPositioning";
import type {
  TeamInfo,
  TeamPredictionCalculations,
  CompleteTeamData,
} from "@typos/teamPrediction";

export const generateFinalInfo = (
  sortedTeams: (TeamInfo & TeamPredictionCalculations)[]
): CompleteTeamData[] => {
  const positioningInfo = calculateTeamPositioning(sortedTeams);

  return sortedTeams.map((teamInfo, index) => {
    const { position, classification } = positioningInfo[index];

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
        classification,
      },
    };
  });
};
