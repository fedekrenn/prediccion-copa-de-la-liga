/**
 * Sorting order type
 */
export type SortOrder = "asc" | "desc";
export type SortType =
  | "efectivity"
  | "points"
  | "average"
  | "playedMatches"
  | null;

/**
 * Functions for sorting teams based on different criteria
 */
export interface SortFunctions {
  sortByEfectivity: () => void;
  sortByPoints: () => void;
  sortByAverage: () => void;
  sortByPlayedMatches: () => void;
}
