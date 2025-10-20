// Zustand
import { create } from "zustand";
// Types
import type { SortOrder } from "@typos/sort";

interface SortingState {
  effectivitySort: SortOrder;
  pointsSort: SortOrder;
  averageSort: SortOrder;
  playedMatchesSort: SortOrder;
  setEffectivitySort: (order: SortOrder) => void;
  setPointsSort: (order: SortOrder) => void;
  setAverageSort: (order: SortOrder) => void;
  setPlayedMatchesSort: (order: SortOrder) => void;
}

export const useSorting = create<SortingState>((set) => ({
  effectivitySort: "asc",
  pointsSort: "asc",
  averageSort: "asc",
  playedMatchesSort: "asc",
  setEffectivitySort: (order: SortOrder) => set({ effectivitySort: order }),
  setPointsSort: (order: SortOrder) => set({ pointsSort: order }),
  setAverageSort: (order: SortOrder) => set({ averageSort: order }),
  setPlayedMatchesSort: (order: SortOrder) => set({ playedMatchesSort: order }),
}));
