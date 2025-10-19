import type { LiveData } from "./api";

/**
 * Defines the group a team belongs to.
 */
export type Group = "A" | "B";

/**
 * Possible classification positions for teams in the league.
 */
export type TABLE_POSITIONS =
  | "libertadores"
  | "sudamericana"
  | "descensoPorTabla"
  | "descensoPromedios"
  | "noClasificado";

/**
 * Basic information about a team: Name and Image.
 */
export interface TeamBaseInfo {
  name: string;
  img: string;
}

/**
 * Season statistics for a team.
 */
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

/**
 * Comprehensive information about a team, including base info and season stats.
 */
export interface TeamInfo extends TeamBaseInfo, TeamSeasonStats {}

/**
 * Average statistics for a team.
 */
export interface TeamAverageStats {
  name: string;
  previousSeasonsPoints: number;
  avgTotalGames: number;
}

/**
 * Annual statistics for a team.
 */
export interface TeamAnnualStats {
  name: string;
  annualPoints: number;
  yearGamePlayed: number;
}

/**
 * Calculations related to team effectivity.
 */
export interface TeamEffectivityCalculations {
  estimatedTotalPoints: number;
  effectivityPorcentage: number;
  annualPoints: number;
}

/**
 * Calculations related to team predictions.
 */
export interface TeamPredictionCalculations
  extends TeamEffectivityCalculations {
  estimatedAverage: number;
}

/**
 * Predictions for a team, including position and classification.
 */
export interface TeamPredictions extends TeamPredictionCalculations {
  position: number;
  classification: TABLE_POSITIONS;
}

/**
 * Represents the complete data for a team, including its information, current season stats, and predictions.
 */
export interface CompleteTeamData {
  teamInfo: TeamBaseInfo;
  currentData: TeamSeasonStats;
  predictions: Omit<TeamPredictions, "annualPoints">;
}

/**
 * Information about a team's position and classification in the league.
 */
export interface TeamPositionInfo {
  position: number;
  classification: TABLE_POSITIONS;
}

/**
 * Analysis related to relegation based on average points.
 */
export interface RelegationAnalysis {
  lastOfAverage: (TeamInfo & TeamEffectivityCalculations) | null;
  lastTablePosition: number;
}
