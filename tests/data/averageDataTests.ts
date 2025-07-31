import type {
  TeamEffectivityCalculations,
  TeamAverageStats,
  TeamPredictionCalculations,
  TeamInfo,
} from "@typos/teamPrediction";

export const partialPrediction: TeamInfo & TeamEffectivityCalculations = {
  name: "Instituto",
  totalPoints: 4,
  playedMatches: 3,
  goalsDifference: 0,
  img: "",
  effectivityPorcentage: 44,
  estimatedTotalPoints: 35,
  gamesEven: 0,
  gamesLost: 0,
  gamesWon: 0,
};

export const averageDataTest: TeamAverageStats = {
  name: "Instituto",
  avgTotalGames: 101,
  previousSeasonsPoints: 105,
};

export const averagePredictionTest: TeamInfo & TeamPredictionCalculations = {
  name: "Instituto",
  totalPoints: 4,
  playedMatches: 3,
  goalsDifference: 0,
  img: "",
  effectivityPorcentage: 44,
  estimatedTotalPoints: 35,
  estimatedAverage: 1.228,
  gamesEven: 0,
  gamesLost: 0,
  gamesWon: 0,
};
