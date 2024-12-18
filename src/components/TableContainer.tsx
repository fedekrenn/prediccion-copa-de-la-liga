import { useState, useCallback } from "react";
// Components
import Legend from "./Legend.tsx";
import Table from "./Table.tsx";
import Thead from "./Thead.tsx";
import Tbody from "./Tbody.tsx";
// Types
import type { CompletePrediction } from "@typos/teamPrediction";

type Params = {
  results: CompletePrediction[];
};

export default function TableContainer({ results }: Params) {
  const [sortedResults, setSortedResults] =
    useState<CompletePrediction[]>(results);
  const [noSort, setNoSort] = useState<Boolean>(true);
  const [efectivitySort, setEfectivitySort] = useState<string>("asc");
  const [pointsSort, setPointsSort] = useState<string>("asc");
  const [averageSort, setAverageSort] = useState<string>("asc");

  const sortByEfectivity = useCallback(() => {
    const sortedResults = results.toSorted(
      (a: CompletePrediction, b: CompletePrediction) => {
        if (a.effectivityPorcentage === b.effectivityPorcentage) {
          return efectivitySort === "asc"
            ? b.position - a.position
            : a.position - b.position;
        }
        return efectivitySort === "asc"
          ? a.effectivityPorcentage - b.effectivityPorcentage
          : b.effectivityPorcentage - a.effectivityPorcentage;
      }
    );

    const newEfectivitySort = efectivitySort === "asc" ? "desc" : "asc";

    setSortedResults(sortedResults);
    setEfectivitySort(newEfectivitySort);
    setNoSort(false);
  }, [efectivitySort, results]);

  const sortByPoints = useCallback(() => {
    const sortedResults = results.toSorted(
      (a: CompletePrediction, b: CompletePrediction) => {
        return pointsSort === "asc"
          ? b.position - a.position
          : a.position - b.position;
      }
    );
    setSortedResults(sortedResults);
    setPointsSort(pointsSort === "asc" ? "desc" : "asc");
    setNoSort(false);
  }, [pointsSort, results]);

  const sortByAverage = useCallback(() => {
    const sortedResults = results.toSorted(
      (a: CompletePrediction, b: CompletePrediction) => {
        return averageSort === "asc"
          ? a.estimatedAverage - b.estimatedAverage
          : b.estimatedAverage - a.estimatedAverage;
      }
    );
    setSortedResults(sortedResults);
    setAverageSort(averageSort === "asc" ? "desc" : "asc");
    setNoSort(false);
  }, [averageSort, results]);

  const resetSorts = useCallback(() => {
    setEfectivitySort("asc");
    setPointsSort("asc");
    setAverageSort("asc");
    setSortedResults(results);
    setNoSort(true);
  }, [results]);

  return (
    <>
      <Legend />
      <div className="min-h-10 flex items-center justify-center">
        {!noSort && (
          <button
            onClick={resetSorts}
            className="px-2 py-1 bg-[#0c151c] text-xs"
          >
            Resetear orden
          </button>
        )}
      </div>
      <Table>
        <Thead
          sortByEfectivity={sortByEfectivity}
          sortByPoints={sortByPoints}
          sortByAverage={sortByAverage}
          efectivitySort={efectivitySort}
          pointsSort={pointsSort}
          averageSort={averageSort}
        />
        <Tbody sortedResults={sortedResults} />
      </Table>
    </>
  );
}
