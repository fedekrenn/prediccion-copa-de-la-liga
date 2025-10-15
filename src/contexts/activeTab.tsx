import { create } from "zustand";
import type { TabType } from "@typos/tabs";

interface ActiveTabState {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const useActiveTab = create<ActiveTabState>((set) => ({
  activeTab: "predictions",
  setActiveTab: (tab: TabType) => set({ activeTab: tab }),
}));
