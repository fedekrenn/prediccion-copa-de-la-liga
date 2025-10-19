import type { TabType } from "@typos/";

/**
 * Sorting order type
 */
export type SortOrder = "asc" | "desc";

/**
 * State for sorting component
 */
export interface SortState {
  efectivitySort: SortOrder;
  pointsSort: SortOrder;
  averageSort: SortOrder;
  playedMatchesSort: SortOrder;
}

/**
 * Handlers for sorting component
 */
export interface SortHandlers {
  sortByEfectivity: () => void;
  sortByPoints: () => void;
  sortByAverage: () => void;
  sortByPlayedMatches: () => void;
}

/**
 * Props for sorting component
 */
export interface SortProps extends SortState, SortHandlers {
  activeTab: TabType;
}
