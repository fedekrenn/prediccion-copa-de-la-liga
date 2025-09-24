// Components
import Thead from "@components/Thead.tsx";
import Tbody from "@components/Tbody.tsx";
// Hooks
import { useSort } from "@hooks/useSort";
// Types
import type { CompleteTeamData } from "@typos/teamPrediction";
import type { TabType } from "@typos/tabs";

type Params = {
  results: CompleteTeamData[];
  activeTab: TabType;
  customSorted?: boolean;
};

export default function Table({
  results,
  activeTab,
  customSorted = false,
}: Params) {
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
  } = useSort(results, activeTab);

  const finalResults = customSorted && noSort ? results : sortedResults;

  return (
    <div>
      {activeTab === "predictions" && !noSort && (
        <div className="flex justify-center mb-4">
          <button
            onClick={resetSorts}
            className="px-2 py-1 bg-[#0c151c] text-xs"
          >
            Resetear orden
          </button>
        </div>
      )}
      <table className="w-full mx-auto text-xs sm:text-sm">
        <Thead
          sortByEfectivity={sortByEfectivity}
          sortByPoints={sortByPoints}
          sortByAverage={sortByAverage}
          sortByPlayedMatches={sortByPlayedMatches}
          efectivitySort={efectivitySort}
          pointsSort={pointsSort}
          averageSort={averageSort}
          playedMatchesSort={playedMatchesSort}
          activeTab={activeTab}
        />
        <Tbody sortedResults={finalResults} activeTab={activeTab} />
      </table>
    </div>
  );
}
