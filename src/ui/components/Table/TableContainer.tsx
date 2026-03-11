// Components
import Legend from "@components/Legend";
import SimpleTable from "@components/Table/Table/SimpleTable";
import SortableTable from "@components/Table/Table/SortableTable";
import AnnualTable from "@components/Table/Table/AnnualTable";
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
  const annualTableResults = useResults((state) => state.annualTableResults);

  return (
    <div ref={animationParent} className="space-y-6">
      {activeTab === "predictions" && <Legend />}
      {activeTab === "predictions" && <SortableTable />}
      {activeTab === "current" && (
        <div className="space-y-8">
          <div ref={animationGroupA}>
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-white sm:text-xl">🏆 Grupo A</h2>
              <span className="accent-chip">Top 8 clasifican</span>
            </div>
            <SimpleTable results={actualTableResults.A} />
          </div>
          <div ref={animationGroupB}>
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-white sm:text-xl">🏆 Grupo B</h2>
              <span className="accent-chip">Top 8 clasifican</span>
            </div>
            <SimpleTable results={actualTableResults.B} />
          </div>
        </div>
      )}
      {activeTab === "annual" && (
        <div className="space-y-4">
          <p className="text-sm text-slate-400">
            Acumulado de todos los torneos del año (Apertura + Clausura)
          </p>
          <AnnualTable results={annualTableResults} />
        </div>
      )}
    </div>
  );
}
