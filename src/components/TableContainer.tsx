// Components
import Legend from "@components/Legend.tsx";
import Table from "@components/Table.tsx";
// Libraries
import { useAutoAnimate } from "@formkit/auto-animate/react";
// Hooks
import { useSort } from "@hooks/useSort";
// Types
import type { CompleteTeamData } from "@typos/teamPrediction";
import type { TabType } from "@typos/tabs";

type Params = {
  results: CompleteTeamData[];
  activeTab: TabType;
};

export default function TableContainer({ results, activeTab }: Params) {
  const [animationParent] = useAutoAnimate({ duration: 300 });

  const { noSort, resetSorts } = useSort(results, activeTab);

  return (
    <div ref={animationParent}>
      {activeTab === "predictions" && (
        <div className="min-h-10 flex flex-col gap-2 items-center justify-center">
          <Legend />
          {!noSort && (
            <button
              onClick={resetSorts}
              className="my-2 px-2 py-1 bg-[#0c151c] text-xs"
            >
              Resetear orden
            </button>
          )}
        </div>
      )}
      <Table results={results} activeTab={activeTab} />
    </div>
  );
}
