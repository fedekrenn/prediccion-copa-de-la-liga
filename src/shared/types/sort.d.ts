export type SortOrder = "asc" | "desc";
export type SortType =
  | "effectivity"
  | "points"
  | "average"
  | "playedMatches"
  | null;

export interface SortFunctions {
  sortByEffectivity: () => void;
  sortByPoints: () => void;
  sortByAverage: () => void;
  sortByPlayedMatches: () => void;
}
