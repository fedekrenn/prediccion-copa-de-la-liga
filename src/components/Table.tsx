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
};

export default function Table({ results, activeTab }: Params) {
  const {
    sortedResults,
    efectivitySort,
    pointsSort,
    averageSort,
    playedMatchesSort,
    sortByEfectivity,
    sortByPoints,
    sortByAverage,
    sortByPlayedMatches,
  } = useSort(results, activeTab);

  return (
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
      <Tbody sortedResults={sortedResults} activeTab={activeTab} />
    </table>
  );
}
