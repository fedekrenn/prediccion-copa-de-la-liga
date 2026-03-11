// React
import { useState, useMemo } from "react";
// Components
import TheadPredictionTable from "@components/Table/Head/PredictionTable";
import Tbody from "@components/Table/Table/Tbody/Tbody";
// Types
import type { CompleteTeamData } from "@typos/teamPrediction";
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
    effectivitySort,
    pointsSort,
    averageSort,
    playedMatchesSort,
    setEffectivitySort,
    setPointsSort,
    setAverageSort,
    setPlayedMatchesSort,
  } = useSorting();

  const sortedResults = useMemo(() => {
    if (!currentSortBy) return results;

    return [...results].sort((a: CompleteTeamData, b: CompleteTeamData) => {
      switch (currentSortBy) {
        case "effectivity": {
          if (
            a.predictions.effectivityPercentage ===
            b.predictions.effectivityPercentage
          ) {
            return effectivitySort === "asc"
              ? b.predictions.position - a.predictions.position
              : a.predictions.position - b.predictions.position;
          }
          return effectivitySort === "asc"
            ? a.predictions.effectivityPercentage -
                b.predictions.effectivityPercentage
            : b.predictions.effectivityPercentage -
                a.predictions.effectivityPercentage;
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
    effectivitySort,
    pointsSort,
    averageSort,
    playedMatchesSort,
  ]);

  // Order functions
  const sortByEffectivity = () => {
    setCurrentSortBy("effectivity");
    setEffectivitySort(toggleSortOrder(effectivitySort));
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
    setEffectivitySort("asc");
    setPointsSort("asc");
    setAverageSort("asc");
    setPlayedMatchesSort("asc");
  };

  const getAriaSort = (
    sortType: Exclude<SortType, null>,
    sortOrder: SortOrder,
  ): "none" | "ascending" | "descending" => {
    if (currentSortBy !== sortType) {
      return "none";
    }

    return sortOrder === "asc" ? "ascending" : "descending";
  };

  return (
    <>
      {currentSortBy !== null && (
        <div className="flex justify-end">
          <button
            onClick={resetSorts}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            Resetear orden
          </button>
        </div>
      )}
      <div className="data-table-wrap">
        <table className="data-table mx-auto text-xs sm:text-sm">
          <TheadPredictionTable
            sortFunctions={{
              sortByEffectivity,
              sortByPoints,
              sortByAverage,
              sortByPlayedMatches,
            }}
            ariaSortMap={{
              effectivity: getAriaSort("effectivity", effectivitySort),
              points: getAriaSort("points", pointsSort),
              average: getAriaSort("average", averageSort),
              playedMatches: getAriaSort("playedMatches", playedMatchesSort),
            }}
          />
          <Tbody results={sortedResults} />
        </table>
      </div>
    </>
  );
}
