// Ascending or descending sort
export type SortOrder = "asc" | "desc";
export type SortType =
  | "efectivity"
  | "points"
  | "average"
  | "playedMatches"
  | null;

// Functions and states to sort a table
export interface SortFunctions {
  sortByEfectivity: () => void;
  sortByPoints: () => void;
  sortByAverage: () => void;
  sortByPlayedMatches: () => void;
}
