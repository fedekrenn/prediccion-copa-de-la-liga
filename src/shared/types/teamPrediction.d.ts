import type { LiveData } from "./api";

export type Group = "A" | "B";

export type TABLE_POSITIONS =
  | "libertadores"
  | "sudamericana"
  | "descensoPorTabla"
  | "descensoPromedios"
  | "noClasificado";

export interface TeamBaseInfo {
  name: string;
  img: string;
}

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

export interface TeamAnnualStatistics extends TeamSeasonStats {
  annualPoints: number;
}

export interface TeamInfo extends TeamBaseInfo, TeamSeasonStats {}

export interface TeamAverageStats {
  name: string;
  previousSeasonsPoints: number;
  avgTotalGames: number;
}

export interface TeamAnnualStats {
  name: string;
  annualPoints: number;
  yearGamePlayed: number;
}

export interface TeamEffectivityCalculations {
  estimatedTotalPoints: number;
  effectivityPercentage: number;
  annualPoints: number;
}

export interface TeamPredictionCalculations
  extends TeamEffectivityCalculations {
  estimatedAverage: number;
}

export type TeamInfoWithPredictionCalculations = TeamInfo &
  TeamPredictionCalculations;

export type TeamInfoWithPredictionCalculationsList =
  TeamInfoWithPredictionCalculations[];

export interface TeamPredictions extends TeamPredictionCalculations {
  position: number;
  classification: TABLE_POSITIONS;
}

export interface CompleteTeamData {
  teamInfo: TeamBaseInfo;
  currentData: TeamAnnualStatistics;
  predictions: Omit<TeamPredictions, "annualPoints">;
}

export interface TeamPositionInfo {
  position: number;
  classification: TABLE_POSITIONS;
}

export interface RelegationAnalysis {
  lastOfAverage: (TeamInfo & TeamEffectivityCalculations) | null;
  lastTablePosition: number;
}
