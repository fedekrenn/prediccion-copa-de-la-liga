// Zustand
import { create } from "zustand";
// Types
import type { SortOrder } from "@typos/sort";

interface SortingState {
  efectivitySort: SortOrder;
  pointsSort: SortOrder;
  averageSort: SortOrder;
  playedMatchesSort: SortOrder;
  setEfectivitySort: (order: SortOrder) => void;
  setPointsSort: (order: SortOrder) => void;
  setAverageSort: (order: SortOrder) => void;
  setPlayedMatchesSort: (order: SortOrder) => void;
}

export const useSorting = create<SortingState>((set) => ({
  efectivitySort: "asc",
  pointsSort: "asc",
  averageSort: "asc",
  playedMatchesSort: "asc",
  setEfectivitySort: (order: SortOrder) => set({ efectivitySort: order }),
  setPointsSort: (order: SortOrder) => set({ pointsSort: order }),
  setAverageSort: (order: SortOrder) => set({ averageSort: order }),
  setPlayedMatchesSort: (order: SortOrder) => set({ playedMatchesSort: order }),
}));
