import { useRef, type KeyboardEvent } from "react";
// Components
import TableContainer from "@components/Table/TableContainer";
// Types
import type { TabType } from "@typos/tabs";
// Context
import { useActiveTab } from "@contexts/activeTab";

export default function TabsContainer() {
  const tabs: TabType[] = ["current", "annual", "predictions"];
  const activeTab = useActiveTab((state) => state.activeTab);
  const setActiveTab = useActiveTab((state) => state.setActiveTab);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const onTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) {
      return;
    }

    event.preventDefault();

    let nextIndex = index;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % tabs.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = tabs.length - 1;
    }

    const nextTab = tabs[nextIndex];
    setActiveTab(nextTab);
    tabRefs.current[nextIndex]?.focus();
  };

  const setButtonClass = (tab: TabType) =>
    `flex items-center justify-center rounded-full px-4 py-3 text-sm font-semibold transition-all duration-200 ${
      activeTab === tab
        ? "bg-emerald-400 text-slate-950 shadow-[0_10px_35px_rgba(61,220,151,0.3)]"
        : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200"
    }`;

  return (
    <div className="flex flex-col gap-8 w-full space-y-6">
      <div
        className="mx-auto my-0 flex justify-center w-full flex-col gap-9 rounded-[28px] border border-white/8 bg-white/4 p-3 sm:flex-row sm:items-center"
        role="tablist"
        aria-label="Secciones de tabla"
      >
        <button
          id="tab-current"
          ref={(element) => {
            tabRefs.current[0] = element;
          }}
          role="tab"
          aria-selected={activeTab === "current"}
          aria-controls="main-table-panel"
          tabIndex={activeTab === "current" ? 0 : -1}
          onKeyDown={(event) => onTabKeyDown(event, 0)}
          onClick={() => setActiveTab("current")}
          className={setButtonClass("current")}
        >
          <span aria-hidden="true">🏆</span>
          <span>Copa actual</span>
        </button>
        <button
          id="tab-annual"
          ref={(element) => {
            tabRefs.current[1] = element;
          }}
          role="tab"
          aria-selected={activeTab === "annual"}
          aria-controls="main-table-panel"
          tabIndex={activeTab === "annual" ? 0 : -1}
          onKeyDown={(event) => onTabKeyDown(event, 1)}
          onClick={() => setActiveTab("annual")}
          className={setButtonClass("annual")}
        >
          <span aria-hidden="true">📅</span>
          <span>Tabla Anual</span>
        </button>
        <button
          id="tab-predictions"
          ref={(element) => {
            tabRefs.current[2] = element;
          }}
          role="tab"
          aria-selected={activeTab === "predictions"}
          aria-controls="main-table-panel"
          tabIndex={activeTab === "predictions" ? 0 : -1}
          onKeyDown={(event) => onTabKeyDown(event, 2)}
          onClick={() => setActiveTab("predictions")}
          className={setButtonClass("predictions")}
        >
          <span aria-hidden="true">📊</span>
          <span>Predicciones</span>
        </button>
      </div>
      <div
        id="main-table-panel"
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        tabIndex={-1}
      >
        <TableContainer />
      </div>
    </div>
  );
}
