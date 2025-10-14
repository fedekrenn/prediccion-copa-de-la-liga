// Components
import ActualTab from "@components/tabs/Head/ActualTab";
import PredictionTab from "@components/tabs/Head/PredictionTab";
// Types
import type { CompleteTeamData } from "@typos/teamPrediction";
import type { TabType } from "@typos/tabs";
import type { SortProps } from "@typos/sort";

interface Params {
  activeTab: TabType;
  results: CompleteTeamData[];
  sortFunctions: SortProps;
}

export default function Thead({ activeTab, sortFunctions }: Params) {
  return activeTab === "predictions" ? (
    <PredictionTab sortFunctions={sortFunctions} />
  ) : (
    <ActualTab />
  );
}
