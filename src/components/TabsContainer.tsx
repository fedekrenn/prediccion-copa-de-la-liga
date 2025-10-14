// React
import { useState } from "react";
// Components
import TableContainer from "@components/TableContainer";
// Types
import type { CompleteTeamData } from "@typos/teamPrediction";
import type { TabType } from "@typos/tabs";

interface Params {
  results: CompleteTeamData[];
}

export default function TabsContainer({ results }: Params) {
  const [activeTab, setActiveTab] = useState<TabType>("predictions");

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

      <TableContainer results={results} activeTab={activeTab} />
    </div>
  );
}
