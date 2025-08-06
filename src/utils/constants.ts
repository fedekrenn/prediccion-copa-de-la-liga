export interface SortingCriteria {
  estimatedTotalPoints: number;
  totalPoints: number;
  playedMatches: number;
  goalsDifference: number;
  estimatedAverage: number;
}

export const TEAM_TABLE_CONFIG = {
  DEFAULT_LAST_POSITION: 30,
  MAX_POINTS_PER_MATCH: 3,
} as const;

export const POSITION_THRESHOLDS = {
  LIBERTADORES_MAX: 3,
  SUDAMERICANA_MAX: 9,
  RELEGATION_POSITION: 30,
} as const;
