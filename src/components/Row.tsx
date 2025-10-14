// Components
import PredictionTable from "./tabs/Row/PredictionTable";
import ActualTable from "./tabs/Row/ActualTable";
// Types
import type { CompleteTeamData } from "@typos/teamPrediction";
import type { TabType } from "@typos/tabs";

type Params = {
  teamData: CompleteTeamData;
  activeTab: TabType;
  currentPosition?: number;
};

export default function Row({ teamData, activeTab, currentPosition }: Params) {
  return activeTab === "predictions" ? (
    <PredictionTable teamData={teamData} />
  ) : (
    <ActualTable teamData={teamData} currentPosition={currentPosition} />
  );
}
