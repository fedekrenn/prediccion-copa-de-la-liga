import type { TabType } from "@typos/";

// Ascending or descending sort
export type SortOrder = "asc" | "desc";

// State and handlers for sorting functionality
export interface SortState {
  efectivitySort: SortOrder;
  pointsSort: SortOrder;
  averageSort: SortOrder;
  playedMatchesSort: SortOrder;
}

// Handlers for sorting actions
export interface SortHandlers {
  sortByEfectivity: () => void;
  sortByPoints: () => void;
  sortByAverage: () => void;
  sortByPlayedMatches: () => void;
}

// Combined props for sorting component
export interface SortProps extends SortState, SortHandlers {
  activeTab: TabType;
}
