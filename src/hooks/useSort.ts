// React
import { useState, useCallback } from "react";
// Types
import type { CompleteTeamData } from "@typos/teamPrediction";
import type { SortOrder } from "@typos/sort";
import type { TabType } from "@typos/tabs";

export const toggleSortOrder = (currentOrder: SortOrder): SortOrder => {
  return currentOrder === "asc" ? "desc" : "asc";
};

export const useSort = (
  initialResults: CompleteTeamData[],
  activeTab: TabType
) => {
  const [sortedResults, setSortedResults] =
    useState<CompleteTeamData[]>(initialResults);
  const [isSortingDisabled, setIsSortingDisabled] = useState<boolean>(true);
  const [efectivitySort, setEfectivitySort] = useState<SortOrder>("asc");
  const [pointsSort, setPointsSort] = useState<SortOrder>("asc");
  const [averageSort, setAverageSort] = useState<SortOrder>("asc");
  const [playedMatchesSort, setPlayedMatchesSort] = useState<SortOrder>("asc");

  const sortByEfectivity = useCallback(() => {
    const sortedResults = initialResults.toSorted((a, b) => {
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
    });

    setSortedResults(sortedResults);
    setEfectivitySort(toggleSortOrder(efectivitySort));
    setIsSortingDisabled(false);
  }, [efectivitySort, initialResults, activeTab]);

  const sortByPoints = useCallback(() => {
    const sortedResults = initialResults.toSorted((a, b) => {
      return pointsSort === "asc"
        ? b.predictions.position - a.predictions.position
        : a.predictions.position - b.predictions.position;
    });

    setSortedResults(sortedResults);
    setPointsSort(toggleSortOrder(pointsSort));
    setIsSortingDisabled(false);
  }, [pointsSort, initialResults, activeTab]);

  const sortByAverage = useCallback(() => {
    const sortedResults = initialResults.toSorted((a, b) => {
      return averageSort === "asc"
        ? a.predictions.estimatedAverage - b.predictions.estimatedAverage
        : b.predictions.estimatedAverage - a.predictions.estimatedAverage;
    });

    setSortedResults(sortedResults);
    setAverageSort(toggleSortOrder(averageSort));
    setIsSortingDisabled(false);
  }, [averageSort, initialResults, activeTab]);

  const sortByPlayedMatches = useCallback(() => {
    const sortedResults = initialResults.toSorted((a, b) => {
      return playedMatchesSort === "asc"
        ? a.currentData.playedMatches - b.currentData.playedMatches
        : b.currentData.playedMatches - a.currentData.playedMatches;
    });

    setSortedResults(sortedResults);
    setPlayedMatchesSort(toggleSortOrder(playedMatchesSort));
    setIsSortingDisabled(false);
  }, [playedMatchesSort, initialResults, activeTab]);

  const resetSorts = useCallback(() => {
    setEfectivitySort("asc");
    setPointsSort("asc");
    setAverageSort("asc");
    setPlayedMatchesSort("asc");
    setSortedResults(initialResults);
    setIsSortingDisabled(true);
  }, [initialResults, activeTab]);

  return {
    sortedResults,
    isSortingDisabled,
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
