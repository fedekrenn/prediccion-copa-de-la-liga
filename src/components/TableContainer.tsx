// Components
import Legend from "./Legend.tsx";
import Table from "./Table.tsx";
import Thead from "./Thead.tsx";
import Tbody from "./Tbody.tsx";
// Types
import type { CompleteTeamData } from "@typos/teamPrediction";
// Hooks
import { useSort } from "../hooks/useSort";

type Params = {
  results: CompleteTeamData[];
};

export default function TableContainer({ results }: Params) {
  const {
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
  } = useSort(results);

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
