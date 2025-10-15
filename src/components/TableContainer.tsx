// Components
import Legend from "@components/Legend.tsx";
import Table from "@components/Table.tsx";
// Libraries
import { useAutoAnimate } from "@formkit/auto-animate/react";
// Types
import type { CompleteTeamData } from "@typos/teamPrediction";
import type { TabType } from "@typos/tabs";
// Context
import { useActiveTab } from "@contexts/activeTab";

type Params = {
  results: CompleteTeamData[];
};

const rankTeams = (teamList: CompleteTeamData[]) => {
  return teamList.toSorted((a, b) => {
    if (a.currentData.totalPoints === b.currentData.totalPoints) {
      return b.currentData.goalsDifference - a.currentData.goalsDifference;
    } else {
      return b.currentData.totalPoints - a.currentData.totalPoints;
    }
  });
};

export default function TableContainer({ results }: Params) {
  const [animationParent] = useAutoAnimate({ duration: 300 });
  const [animationGroupA] = useAutoAnimate({ duration: 300 });
  const [animationGroupB] = useAutoAnimate({ duration: 300 });

  const activeTab = useActiveTab((state) => state.activeTab);

  const groupedResults = activeTab === "current" && {
    A: rankTeams(results.filter((team) => team.currentData.group === "A")),
    B: rankTeams(results.filter((team) => team.currentData.group === "B")),
  };

  return (
    <div ref={animationParent}>
      {activeTab === "predictions" && <Legend />}
      {activeTab === "current" && groupedResults ? (
        <div className="space-y-8">
          <div ref={animationGroupA}>
            <h2 className="text-lg font-semibold text-center mb-4 text-green-200">
              🏆 Grupo A
            </h2>
            <Table results={groupedResults.A} customSorted={true} />
          </div>
          <div ref={animationGroupB}>
            <h2 className="text-lg font-semibold text-center mb-4 text-green-200">
              🏆 Grupo B
            </h2>
            <Table results={groupedResults.B} customSorted={true} />
          </div>
        </div>
      ) : (
        <Table results={results} />
      )}
    </div>
  );
}
