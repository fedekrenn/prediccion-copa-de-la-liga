// Components
import TableContainer from "@components/TableContainer";
// Types
import type { TabType } from "@typos/tabs";
// Context
import { useActiveTab } from "@contexts/activeTab";

export default function TabsContainer() {
  const activeTab = useActiveTab((state) => state.activeTab);
  const setActiveTab = useActiveTab((state) => state.setActiveTab);

  const setButtonClass = (tab: TabType) =>
    `px-7 py-3 text-sm font-medium transition-all duration-200 rounded-t-[10px] rounded-b-none w-full focus:shadow-none ${
      activeTab === tab
        ? "bg-[#243447] text-green-200 border-b-2 border-gray-300 hover:bg-[#243447] hover:cursor-default "
        : "bg-[#161F27] text-gray-600"
    }`;

  return (
    <div className="w-full">
      <div className="flex mb-6 overflow-hidden max-w-[450px] mx-auto">
        <button
          onClick={() => setActiveTab("predictions")}
          className={setButtonClass("predictions")}
        >
          📊 Tabla de Predicciones
        </button>
        <button
          onClick={() => setActiveTab("current")}
          className={setButtonClass("current")}
        >
          🏆 Tabla Actual
        </button>
      </div>

      <TableContainer />
    </div>
  );
}
