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
      group,
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
      annualPoints,
    } = teamInfo;

    return {
      teamInfo: {
        name,
        img,
      },
      currentData: {
        totalPoints,
        annualPoints,
        playedMatches,
        group,
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
        position,
        classification,
      },
    };
  });
};
