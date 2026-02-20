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
    `px-7 py-3 w-full text-sm font-medium transition-all duration-200 rounded-t-[10px] rounded-b-none focus:shadow-none ${
      activeTab === tab
        ? "bg-[#243447] text-green-200 border-b-2 border-gray-300 hover:bg-[#243447] hover:cursor-default "
        : "bg-[#161F27] text-gray-600 hover:cursor-pointer "
    }`;

  return (
    <div className="w-full">
      <div className="flex justify-around gap-1 mb-6 overflow-hidden max-w-150 mx-auto">
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

      <TableContainer />
    </div>
  );
}
