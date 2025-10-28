// Components
import ActualTable from "@components/Table/Row/ActualTable";
import PredictionTable from "@components/Table/Row/PredictionTable";
// Types
import type { CompleteTeamData } from "@typos/teamPrediction";
// Context
import { useActiveTab } from "@contexts/activeTab";

type Params = {
  teamData: CompleteTeamData;
  currentPosition: number;
};

export default function RowContainer({ teamData, currentPosition }: Params) {
  const activeTab = useActiveTab((state) => state.activeTab);

  return activeTab === "predictions" ? (
    <PredictionTable teamData={teamData} />
  ) : (
    <ActualTable teamData={teamData} currentPosition={currentPosition} />
  );
}
