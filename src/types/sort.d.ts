export type SortOrder = "asc" | "desc";

export type SortField = "efectivity" | "points" | "average" | "playedMatches";

export interface SortState {
  efectivitySort: SortOrder;
  pointsSort: SortOrder;
  averageSort: SortOrder;
  playedMatchesSort: SortOrder;
}

export interface SortHandlers {
  sortByEfectivity: () => void;
  sortByPoints: () => void;
  sortByAverage: () => void;
  sortByPlayedMatches: () => void;
}

export interface SortProps extends SortState, SortHandlers {}
