import type {
  PartialPrediction,
  AverageInfo,
  CompleteAverageInfo,
} from "@typos/teamPrediction";

export const partialPrediction: PartialPrediction = {
  name: "Instituto",
  totalPoints: 10,
  playedMatches: 4,
  goalsDifference: 0,
  img: "",
  effectivityPorcentage: 83,
  estimatedTotalPoints: 80,
};

export const averageDataTest: AverageInfo = {
  name: "Instituto",
  avgTotalGames: 86,
  avgTotalPoints: 115,
};

export const averagePredictionTest: CompleteAverageInfo = {
  name: "Instituto",
  totalPoints: 10,
  playedMatches: 4,
  goalsDifference: 0,
  img: "",
  effectivityPorcentage: 83,
  estimatedTotalPoints: 80,
  estimatedAverage: 1.623,
};
