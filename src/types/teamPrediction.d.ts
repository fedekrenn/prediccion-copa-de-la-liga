import type { LiveData } from "./api";

// Actual table groups
export type Group = "A" | "B";

// Base team information
export interface TeamBaseInfo {
  name: string;
  img: string;
}

// Current season statistics
export interface TeamSeasonStats {
  group: Group;
  totalPoints: number;
  playedMatches: number;
  goalsDifference: number;
  gamesWon: number;
  gamesEven: number;
  gamesLost: number;
  liveData?: LiveData;
}

// Complete team information (base + stats)
export interface TeamInfo extends TeamBaseInfo, TeamSeasonStats {}

// Historical average data
export interface TeamAverageStats {
  name: string;
  previousSeasonsPoints: number;
  avgTotalGames: number;
}

// Annual statistics for a team
export interface TeamAnnualStats {
  name: string;
  annualPoints: number;
  yearGamePlayed: number;
}

// Prediction calculations
export interface TeamEffectivityCalculations {
  estimatedTotalPoints: number;
  effectivityPorcentage: number;
}

// Prediction calculations
export interface TeamPredictionCalculations
  extends TeamEffectivityCalculations {
  estimatedAverage: number;
}

// Prediction calculations with table position
export interface TeamPredictions extends TeamPredictionCalculations {
  position: number;
  classification: TABLE_POSITIONS;
}

// Complete team data with predictions
export interface CompleteTeamData {
  teamInfo: TeamBaseInfo;
  currentData: TeamSeasonStats;
  predictions: TeamPredictions;
}

// Team positioning information
export interface TeamPositionInfo {
  position: number;
  classification: TABLE_POSITIONS;
}

// Teams relegation analysis
export interface RelegationAnalysis {
  lastOfAverage: (TeamInfo & TeamEffectivityCalculations) | null;
  lastTablePosition: number;
}

// Possible table positions
export type TABLE_POSITIONS =
  | "libertadores"
  | "sudamericana"
  | "descensoPorTabla"
  | "descensoPromedios"
  | "noClasificado";
