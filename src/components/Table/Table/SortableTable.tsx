// React
import { useState, useMemo } from "react";
// Components
import TheadPredictionTable from "@components/Table/Head/PredictionTable";
import Tbody from "@components/Table/Table/Tbody/Tbody";
// Types
import type { SortOrder, SortType } from "@typos/sort";
// Context
import { useSorting } from "@contexts/sorting";
import { useResults } from "@contexts/results";

const toggleSortOrder = (currentOrder: SortOrder): SortOrder => {
  return currentOrder === "asc" ? "desc" : "asc";
};

export default function SortableTable() {
  const [currentSortBy, setCurrentSortBy] = useState<SortType>(null);

  const results = useResults((state) => state.predictionResults);

  const {
    efectivitySort,
    pointsSort,
    averageSort,
    playedMatchesSort,
    setEfectivitySort,
    setPointsSort,
    setAverageSort,
    setPlayedMatchesSort,
  } = useSorting();

  const sortedResults = useMemo(() => {
    if (!currentSortBy) return results;

    return results.toSorted((a, b) => {
      switch (currentSortBy) {
        case "efectivity": {
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
        case "points":
          return pointsSort === "asc"
            ? b.predictions.position - a.predictions.position
            : a.predictions.position - b.predictions.position;
        case "average":
          return averageSort === "asc"
            ? a.predictions.estimatedAverage - b.predictions.estimatedAverage
            : b.predictions.estimatedAverage - a.predictions.estimatedAverage;
        case "playedMatches":
          return playedMatchesSort === "asc"
            ? a.currentData.playedMatches - b.currentData.playedMatches
            : b.currentData.playedMatches - a.currentData.playedMatches;
        default:
          return 0;
      }
    });
  }, [
    results,
    currentSortBy,
    efectivitySort,
    pointsSort,
    averageSort,
    playedMatchesSort,
  ]);

  // Order functions
  const sortByEfectivity = () => {
    setCurrentSortBy("efectivity");
    setEfectivitySort(toggleSortOrder(efectivitySort));
  };

  const sortByPoints = () => {
    setCurrentSortBy("points");
    setPointsSort(toggleSortOrder(pointsSort));
  };

  const sortByAverage = () => {
    setCurrentSortBy("average");
    setAverageSort(toggleSortOrder(averageSort));
  };

  const sortByPlayedMatches = () => {
    setCurrentSortBy("playedMatches");
    setPlayedMatchesSort(toggleSortOrder(playedMatchesSort));
  };

  const resetSorts = () => {
    setCurrentSortBy(null);
    setEfectivitySort("asc");
    setPointsSort("asc");
    setAverageSort("asc");
    setPlayedMatchesSort("asc");
  };

  return (
    <>
      {currentSortBy !== null && (
        <div className="flex justify-center my-4">
          <button
            onClick={resetSorts}
            className="px-2 py-1 bg-[#0c151c] text-xs"
          >
            Resetear orden
          </button>
        </div>
      )}
      <table className="w-full mx-auto text-xs sm:text-sm">
        <TheadPredictionTable
          sortFunctions={{
            sortByEfectivity,
            sortByPoints,
            sortByAverage,
            sortByPlayedMatches,
          }}
        />
        <Tbody results={sortedResults} />
      </table>
    </>
  );
}
