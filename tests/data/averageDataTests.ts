import type {
  TeamEffectivityCalculations,
  TeamAverageStats,
  TeamPredictionCalculations,
  TeamInfo,
} from "@typos/teamPrediction";

export const partialPrediction: TeamInfo & TeamEffectivityCalculations = {
  name: "Instituto",
  totalPoints: 10,
  playedMatches: 4,
  goalsDifference: 0,
  img: "",
  effectivityPorcentage: 83,
  estimatedTotalPoints: 80,
  gamesEven: 0,
  gamesLost: 0,
  gamesWon: 0,
};

export const averageDataTest: TeamAverageStats = {
  name: "Instituto",
  avgTotalGames: 86,
  avgTotalPoints: 115,
};

export const averagePredictionTest: TeamInfo & TeamPredictionCalculations = {
  name: "Instituto",
  totalPoints: 10,
  playedMatches: 4,
  goalsDifference: 0,
  img: "",
  effectivityPorcentage: 83,
  estimatedTotalPoints: 80,
  estimatedAverage: 1.623,
  gamesEven: 0,
  gamesLost: 0,
  gamesWon: 0,
};
