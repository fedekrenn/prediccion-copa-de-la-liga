// Zustand
import { create } from "zustand";
// Types
import type { CompleteTeamData } from "@typos/teamPrediction";

interface ResultsState {
  predictionResults: CompleteTeamData[];
  actualTableResults: { A: CompleteTeamData[]; B: CompleteTeamData[] };
  annualTableResults: CompleteTeamData[];
  nextSeasonResults: CompleteTeamData[];
  setResults: (results: CompleteTeamData[]) => void;
}

const rankTeams = (teamList: CompleteTeamData[]) => {
  return teamList.toSorted((a, b) => {
    if (a.currentData.totalPoints === b.currentData.totalPoints) {
      const aDiff = a.currentData.goalsFor - a.currentData.goalsAgainst;
      const bDiff = b.currentData.goalsFor - b.currentData.goalsAgainst;
      return bDiff - aDiff;
    } else {
      return b.currentData.totalPoints - a.currentData.totalPoints;
    }
  });
};

const rankTeamsByAnnualPoints = (teamList: CompleteTeamData[]) => {
  return teamList.toSorted((a, b) => {
    if (a.currentData.annualPoints === b.currentData.annualPoints) {
      const aDiff = a.currentData.goalsFor - a.currentData.goalsAgainst;
      const bDiff = b.currentData.goalsFor - b.currentData.goalsAgainst;
      return bDiff - aDiff;
    }
    return b.currentData.annualPoints - a.currentData.annualPoints;
  });
};

const rankTeamsByNextSeasonAverage = (teamList: CompleteTeamData[]) => {
  return teamList.toSorted((a, b) => {
    const aAverage = a.nextSeasonData.nextSeasonAverage;
    const bAverage = b.nextSeasonData.nextSeasonAverage;

    if (aAverage === bAverage) {
      return a.teamInfo.name.localeCompare(b.teamInfo.name);
    }
    return bAverage - aAverage;
  });
};

export const useResults = create<ResultsState>((set) => ({
  predictionResults: [],
  annualTableResults: [],
  nextSeasonResults: [],
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
    set({ nextSeasonResults: rankTeamsByNextSeasonAverage(results) });
  },
}));
