import type {
  EffectivityPrediction,
  AverageInfo,
  AveragePrediction,
} from "@typos/teamPrediction";

export const partialPrediction: EffectivityPrediction = {
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

export const averageDataTest: AverageInfo = {
  name: "Instituto",
  avgTotalGames: 86,
  avgTotalPoints: 115,
};

export const averagePredictionTest: AveragePrediction = {
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
