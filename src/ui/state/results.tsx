// Zustand
import { create } from "zustand";
// Types
import type { CompleteTeamData } from "@typos/teamPrediction";

interface ResultsState {
  predictionResults: CompleteTeamData[];
  actualTableResults: { A: CompleteTeamData[]; B: CompleteTeamData[] };
  annualTableResults: CompleteTeamData[];
  setResults: (results: CompleteTeamData[]) => void;
}

const rankTeams = (teamList: CompleteTeamData[]) => {
  return teamList.toSorted((a, b) => {
    if (a.currentData.totalPoints === b.currentData.totalPoints) {
      return b.currentData.goalsDifference - a.currentData.goalsDifference;
    } else {
      return b.currentData.totalPoints - a.currentData.totalPoints;
    }
  });
};

const rankTeamsByAnnualPoints = (teamList: CompleteTeamData[]) => {
  return teamList.toSorted((a, b) => {
    if (a.currentData.annualPoints === b.currentData.annualPoints) {
      return b.currentData.goalsDifference - a.currentData.goalsDifference;
    }
    return b.currentData.annualPoints - a.currentData.annualPoints;
  });
};

export const useResults = create<ResultsState>((set) => ({
  predictionResults: [],
  annualTableResults: [],
  actualTableResults: {
    A: [],
    B: [],
  },

  setResults: (results: CompleteTeamData[]) => {
    set({ predictionResults: results });

    const groupedResults = {
      A: rankTeams(results.filter((team) => team.currentData.group === "A")),
      B: rankTeams(results.filter((team) => team.currentData.group === "B")),
    };

    set({ actualTableResults: groupedResults });
    set({ annualTableResults: rankTeamsByAnnualPoints(results) });
  },
}));
