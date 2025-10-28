/**
 * Sorting order type
 */
export type SortOrder = "asc" | "desc";
export type SortType =
  | "effectivity"
  | "points"
  | "average"
  | "playedMatches"
  | null;

/**
 * Functions for sorting teams based on different criteria
 */
export interface SortFunctions {
  sortByEffectivity: () => void;
  sortByPoints: () => void;
  sortByAverage: () => void;
  sortByPlayedMatches: () => void;
}
