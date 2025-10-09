// Ascending or descending sort
export type SortOrder = "asc" | "desc";

// States to manage the current sort order of each column
interface SortOrderState {
  efectivitySort: SortOrder;
  pointsSort: SortOrder;
  averageSort: SortOrder;
  playedMatchesSort: SortOrder;
}

// Functions and states to sort a table
export interface SortFunctions {
  sortByEfectivity: () => void;
  sortByPoints: () => void;
  sortByAverage: () => void;
  sortByPlayedMatches: () => void;
}

// Combined interface for sort properties
export interface SortProps extends SortOrderState, SortFunctions {}
