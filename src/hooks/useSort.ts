// React
import { useState, useCallback } from "react";
// Types
import type { CompleteTeamData } from "@typos/teamPrediction";
import type { SortOrder, SortState, SortHandlers } from "@typos/sort";
import type { TabType } from "@typos/tabs";

export const toggleSortOrder = (currentOrder: SortOrder): SortOrder => {
  return currentOrder === "asc" ? "desc" : "asc";
};

interface UseSortReturn extends SortState, SortHandlers {
  sortedResults: CompleteTeamData[];
  noSort: boolean;
  resetSorts: () => void;
}

export const useSort = (
  initialResults: CompleteTeamData[],
  activeTab: TabType
): UseSortReturn => {
  const [sortedResults, setSortedResults] =
    useState<CompleteTeamData[]>(initialResults);
  const [noSort, setNoSort] = useState<boolean>(true);
  const [efectivitySort, setEfectivitySort] = useState<SortOrder>("asc");
  const [pointsSort, setPointsSort] = useState<SortOrder>("asc");
  const [averageSort, setAverageSort] = useState<SortOrder>("asc");
  const [playedMatchesSort, setPlayedMatchesSort] = useState<SortOrder>("asc");

  const sortByEfectivity = useCallback(() => {
    const sorted = initialResults.toSorted(
      (a: CompleteTeamData, b: CompleteTeamData) => {
        if (
          a.predictions.effectivityPorcentage ===
          b.predictions.effectivityPorcentage
        ) {
          return efectivitySort === "asc"
            ? b.predictions.position - a.predictions.position
            : a.predictions.position - b.predictions.position;
        }
        return efectivitySort === "asc"
          ? a.predictions.effectivityPorcentage -
              b.predictions.effectivityPorcentage
          : b.predictions.effectivityPorcentage -
              a.predictions.effectivityPorcentage;
      }
    );

    setSortedResults(sorted);
    setEfectivitySort(toggleSortOrder(efectivitySort));
    setNoSort(false);
  }, [efectivitySort, initialResults, activeTab]);

  const sortByPoints = useCallback(() => {
    const sorted = initialResults.toSorted(
      (a: CompleteTeamData, b: CompleteTeamData) => {
        if (activeTab === "predictions") {
          return pointsSort === "asc"
            ? b.predictions.position - a.predictions.position
            : a.predictions.position - b.predictions.position;
        } else {
          return pointsSort === "asc"
            ? a.currentData.totalPoints - b.currentData.totalPoints
            : b.currentData.totalPoints - a.currentData.totalPoints;
        }
      }
    );
    setSortedResults(sorted);
    setPointsSort(toggleSortOrder(pointsSort));
    setNoSort(false);
  }, [pointsSort, initialResults, activeTab]);

  const sortByAverage = useCallback(() => {
    const sorted = initialResults.toSorted(
      (a: CompleteTeamData, b: CompleteTeamData) => {
        return averageSort === "asc"
          ? a.predictions.estimatedAverage - b.predictions.estimatedAverage
          : b.predictions.estimatedAverage - a.predictions.estimatedAverage;
      }
    );
    setSortedResults(sorted);
    setAverageSort(toggleSortOrder(averageSort));
    setNoSort(false);
  }, [averageSort, initialResults, activeTab]);

  const sortByPlayedMatches = useCallback(() => {
    const sorted = initialResults.toSorted(
      (a: CompleteTeamData, b: CompleteTeamData) => {
        return playedMatchesSort === "asc"
          ? a.currentData.playedMatches - b.currentData.playedMatches
          : b.currentData.playedMatches - a.currentData.playedMatches;
      }
    );
    setSortedResults(sorted);
    setPlayedMatchesSort(toggleSortOrder(playedMatchesSort));
    setNoSort(false);
  }, [playedMatchesSort, initialResults, activeTab]);

  const resetSorts = useCallback(() => {
    setEfectivitySort("asc");
    setPointsSort("asc");
    setAverageSort("asc");
    setPlayedMatchesSort("asc");
    setSortedResults(initialResults);
    setNoSort(true);
  }, [initialResults, activeTab]);

  return {
    sortedResults,
    noSort,
    efectivitySort,
    pointsSort,
    averageSort,
    playedMatchesSort,
    sortByEfectivity,
    sortByPoints,
    sortByAverage,
    sortByPlayedMatches,
    resetSorts,
  };
};
