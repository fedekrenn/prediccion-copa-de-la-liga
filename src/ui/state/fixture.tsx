import { create } from "zustand";
import type { FixtureRound } from "@typos/fixture";

interface FixtureState {
  fixture: FixtureRound | null;
  loading: boolean;
  error: string | null;
  setFixture: (fixture: FixtureRound) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useFixture = create<FixtureState>((set) => ({
  fixture: null,
  loading: true,
  error: null,
  setFixture: (fixture: FixtureRound) => set({ fixture, loading: false }),
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error, loading: false }),
}));
