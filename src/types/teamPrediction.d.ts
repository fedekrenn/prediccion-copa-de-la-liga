import type { LiveData } from "./api";

// Base team information
export interface TeamBaseInfo {
  name: string;
  img: string;
}

// Current season statistics
export interface TeamSeasonStats {
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
  avgTotalPoints: number;
  avgTotalGames: number;
}

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

export interface TeamPredictionCalculations
  extends TeamEffectivityCalculations {
  estimatedAverage: number;
}

// Final table predictions
export interface TeamTablePrediction {
  position: number;
  classification: TABLE_POSITIONS;
}

// Complete team data with predictions
export interface CompleteTeamData {
  baseInfo: TeamBaseInfo;
  seasonStats: TeamSeasonStats;
  predictions: TeamPredictionCalculations;
  tablePosition: TeamTablePrediction;
}

export type TABLE_POSITIONS =
  | "libertadores"
  | "sudamericana"
  | "descensoPorTabla"
  | "descensoPromedios"
  | "noClasificado";
