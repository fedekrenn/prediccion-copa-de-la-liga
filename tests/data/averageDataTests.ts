import type {
  TeamEffectivityCalculations,
  TeamAverageStats,
  TeamPredictionCalculations,
  TeamInfo,
} from "@typos/teamPrediction";

export const partialPrediction: TeamInfo & TeamEffectivityCalculations = {
  name: "Instituto",
  totalPoints: 25,
  playedMatches: 11,
  goalsFor: 17,
  goalsAgainst: 8,
  img: "https://api.promiedos.com.ar/images/team/hchc/1",
  effectivityPercentage: 76,
  estimatedTotalPoints: 57,
  gamesEven: 1,
  gamesLost: 2,
  gamesWon: 8,
  group: "A",
  annualPoints: 46,
};

export const averageDataTest: TeamAverageStats = {
  name: "Instituto",
  avgTotalGames: 100,
  previousSeasonsPoints: 87,
  allAvgInfo: {
    first: 53,
    second: 34,
    third: 46,
  },
};

export const averagePredictionTest: TeamInfo & TeamPredictionCalculations = {
  name: "Instituto",
  totalPoints: 25,
  playedMatches: 11,
  goalsFor: 17,
  goalsAgainst: 8,
  img: "https://api.promiedos.com.ar/images/team/hchc/1",
  effectivityPercentage: 76,
  estimatedTotalPoints: 57,
  estimatedAverage: 1.371,
  gamesEven: 1,
  gamesLost: 2,
  gamesWon: 8,
  group: "A",
  annualPoints: 46,
  nextSeasonAverage: 1.356,
};
