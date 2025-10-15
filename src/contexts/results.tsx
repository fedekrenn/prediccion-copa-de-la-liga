// Zustand
import { create } from "zustand";
// Types
import type { CompleteTeamData } from "@typos/teamPrediction";

interface ActiveTabState {
  results: CompleteTeamData[];
  setResults: (results: CompleteTeamData[]) => void;
}

export const useResults = create<ActiveTabState>((set) => ({
  results: [],
  setResults: (results: CompleteTeamData[]) => set({ results }),
}));
