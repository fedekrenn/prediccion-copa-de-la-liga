import { useState, useCallback } from "react";
// Components
import Legend from "./Legend.tsx";
import Table from "./Table.tsx";
import Thead from "./Thead.tsx";
import Tbody from "./Tbody.tsx";
// Types
import type { FinalData } from "@typos/teamPrediction";

type Params = {
  results: FinalData[];
};

export default function TableContainer({ results }: Params) {
  const [sortedResults, setSortedResults] = useState<FinalData[]>(results);
  const [noSort, setNoSort] = useState<Boolean>(true);
  const [efectivitySort, setEfectivitySort] = useState<string>("asc");
  const [pointsSort, setPointsSort] = useState<string>("asc");
  const [averageSort, setAverageSort] = useState<string>("asc");
  const [playedMatchesSort, setPlayedMatchesSort] = useState<string>("asc");

  const sortByEfectivity = useCallback(() => {
    const sortedResults = results.toSorted((a: FinalData, b: FinalData) => {
      if (
        a.tablePrediction.effectivityPorcentage ===
        b.tablePrediction.effectivityPorcentage
      ) {
        return efectivitySort === "asc"
          ? b.tablePrediction.position - a.tablePrediction.position
          : a.tablePrediction.position - b.tablePrediction.position;
      }
      return efectivitySort === "asc"
        ? a.tablePrediction.effectivityPorcentage -
            b.tablePrediction.effectivityPorcentage
        : b.tablePrediction.effectivityPorcentage -
            a.tablePrediction.effectivityPorcentage;
    });

    setSortedResults(sortedResults);
    setEfectivitySort(efectivitySort === "asc" ? "desc" : "asc");
    setNoSort(false);
  }, [efectivitySort, results]);

  const sortByPoints = useCallback(() => {
    const sortedResults = results.toSorted((a: FinalData, b: FinalData) => {
      return pointsSort === "asc"
        ? b.tablePrediction.position - a.tablePrediction.position
        : a.tablePrediction.position - b.tablePrediction.position;
    });
    setSortedResults(sortedResults);
    setPointsSort(pointsSort === "asc" ? "desc" : "asc");
    setNoSort(false);
  }, [pointsSort, results]);

  const sortByAverage = useCallback(() => {
    const sortedResults = results.toSorted((a: FinalData, b: FinalData) => {
      return averageSort === "asc"
        ? a.tablePrediction.estimatedAverage -
            b.tablePrediction.estimatedAverage
        : b.tablePrediction.estimatedAverage -
            a.tablePrediction.estimatedAverage;
    });
    setSortedResults(sortedResults);
    setAverageSort(averageSort === "asc" ? "desc" : "asc");
    setNoSort(false);
  }, [averageSort, results]);

  const sortByPlayedMatches = useCallback(() => {
    const sortedResults = results.toSorted((a: FinalData, b: FinalData) => {
      return playedMatchesSort === "asc"
        ? a.actualData.playedMatches - b.actualData.playedMatches
        : b.actualData.playedMatches - a.actualData.playedMatches;
    });
    setSortedResults(sortedResults);
    setPlayedMatchesSort(playedMatchesSort === "asc" ? "desc" : "asc");
    setNoSort(false);
  }, [playedMatchesSort, results]);

  const resetSorts = useCallback(() => {
    setEfectivitySort("asc");
    setPointsSort("asc");
    setAverageSort("asc");
    setPlayedMatchesSort("asc");
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
          sortByPlayedMatches={sortByPlayedMatches}
          efectivitySort={efectivitySort}
          pointsSort={pointsSort}
          averageSort={averageSort}
          playedMatchesSort={playedMatchesSort}
        />
        <Tbody sortedResults={sortedResults} />
      </Table>
    </>
  );
}
