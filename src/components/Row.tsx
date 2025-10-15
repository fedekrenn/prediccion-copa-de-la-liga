// Components
import PredictionTable from "./tabs/Row/PredictionTable";
import ActualTable from "./tabs/Row/ActualTable";
// Types
import type { CompleteTeamData } from "@typos/teamPrediction";
// Context
import { useActiveTab } from "@contexts/activeTab";

type Params = {
  teamData: CompleteTeamData;
  currentPosition?: number;
};

export default function Row({ teamData, currentPosition }: Params) {
  const activeTab = useActiveTab((state) => state.activeTab);

  return activeTab === "predictions" ? (
    <PredictionTable teamData={teamData} />
  ) : (
    <ActualTable teamData={teamData} currentPosition={currentPosition} />
  );
}
