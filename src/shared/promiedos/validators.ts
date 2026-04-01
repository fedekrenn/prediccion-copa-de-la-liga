import type { ExternalFilter, ExternalGame } from "@fixture/services/extractFixtureData";
import type { ApiResponse } from "@typos/api";

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

export interface PromiedosPageData {
  games?: {
    filters?: ExternalFilter[];
  };
  tables_groups?: ApiResponse[];
}

export const isPromiedosPageData = (
  value: unknown,
): value is PromiedosPageData => {
  return isRecord(value);
};

export const isExternalGameArray = (value: unknown): value is ExternalGame[] => {
  return Array.isArray(value);
};

export const getFixtureFiltersFromPageData = (
  data: PromiedosPageData,
): ExternalFilter[] | null => {
  return Array.isArray(data.games?.filters) ? data.games.filters : null;
};

export const getSelectedFilterGames = (
  filter: ExternalFilter | null,
): ExternalGame[] | null => {
  return filter && isExternalGameArray(filter.games) ? filter.games : null;
};

export const getTablesGroupsFromPageData = (
  data: PromiedosPageData,
): ApiResponse[] | null => {
  return Array.isArray(data.tables_groups) ? data.tables_groups : null;
};
