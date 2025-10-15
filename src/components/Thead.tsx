// Components
import ActualTab from "@components/tabs/Head/ActualTab";
import PredictionTab from "@components/tabs/Head/PredictionTab";
// Types
import type { CompleteTeamData } from "@typos/teamPrediction";
import type { SortProps } from "@typos/sort";
// Context
import { useActiveTab } from "@contexts/activeTab";

interface Params {
  results: CompleteTeamData[];
  sortFunctions: SortProps;
}

export default function Thead({ sortFunctions }: Params) {
  const activeTab = useActiveTab((state) => state.activeTab);

  return activeTab === "predictions" ? (
    <PredictionTab sortFunctions={sortFunctions} />
  ) : (
    <ActualTab />
  );
}
