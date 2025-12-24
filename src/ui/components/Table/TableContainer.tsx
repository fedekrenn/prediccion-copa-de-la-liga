// Components
import Legend from "@components/Legend";
import SimpleTable from "@components/Table/Table/SimpleTable";
import SortableTable from "@components/Table/Table/SortableTable";
// Libraries
import { useAutoAnimate } from "@formkit/auto-animate/react";
// Context
import { useActiveTab } from "@contexts/activeTab";
import { useResults } from "@contexts/results";

export default function TableContainer() {
  const [animationParent] = useAutoAnimate({ duration: 300 });
  const [animationGroupA] = useAutoAnimate({ duration: 300 });
  const [animationGroupB] = useAutoAnimate({ duration: 300 });

  const activeTab = useActiveTab((state) => state.activeTab);
  const actualTableResults = useResults((state) => state.actualTableResults);

  return (
    <div ref={animationParent}>
      {activeTab === "predictions" && <Legend />}
      {activeTab === "predictions" ? (
        <SortableTable />
      ) : (
        <div className="space-y-8">
          <div ref={animationGroupA}>
            <h2 className="text-lg font-semibold text-center mb-4 text-green-200">
              🏆 Grupo A
            </h2>
            <SimpleTable results={actualTableResults.A} />
          </div>
          <div ref={animationGroupB}>
            <h2 className="text-lg font-semibold text-center mb-4 text-green-200">
              🏆 Grupo B
            </h2>
            <SimpleTable results={actualTableResults.B} />
          </div>
        </div>
      )}
    </div>
  );
}
