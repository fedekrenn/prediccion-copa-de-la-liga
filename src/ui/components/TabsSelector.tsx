// Components
import TableContainer from "@components/Table/TableContainer";
// Types
import type { TabType } from "@typos/tabs";
// Context
import { useActiveTab } from "@contexts/activeTab";

export default function TabsContainer() {
  const activeTab = useActiveTab((state) => state.activeTab);
  const setActiveTab = useActiveTab((state) => state.setActiveTab);

  const setButtonClass = (tab: TabType) =>
    `flex items-center justify-center rounded-full px-4 py-3 text-sm font-semibold transition-all duration-200 ${
      activeTab === tab
        ? "bg-emerald-400 text-slate-950 shadow-[0_10px_35px_rgba(61,220,151,0.3)]"
        : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200"
    }`;

  return (
    <div className="w-full space-y-6">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 rounded-[28px] border border-white/8 bg-white/4 p-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Navegacion principal
          </p>
          <h2 className="mt-1 text-lg font-bold text-white sm:text-xl">
            Explora predicciones, tabla anual y copa actual
          </h2>
        </div>

        <div className="grid w-full gap-2 sm:max-w-2xl sm:grid-cols-3">
        <button
          onClick={() => setActiveTab("predictions")}
          className={setButtonClass("predictions")}
        >
          📊 Predicciones
        </button>
        <button
          onClick={() => setActiveTab("annual")}
          className={setButtonClass("annual")}
        >
          📅 Tabla Anual
        </button>
        <button
          onClick={() => setActiveTab("current")}
          className={setButtonClass("current")}
        >
          🏆 Copa actual
        </button>
        </div>
      </div>

      <TableContainer />
    </div>
  );
}
