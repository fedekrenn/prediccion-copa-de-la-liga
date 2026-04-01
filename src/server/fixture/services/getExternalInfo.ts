import { config } from "@config/config";
import {
  fetchGamesByFilterKey,
  fetchPageData,
  PromiedosParseError,
  PromiedosSchemaError,
} from "@shared/promiedos/client";
import {
  getFixtureFiltersFromPageData,
  getSelectedFilterGames,
} from "@shared/promiedos/validators";
import type { ExternalFilter, ExternalGame } from "./extractFixtureData";
import type { FixtureRoundsResponse } from "@typos/fixture";

export const FIXTURE_ROUND_NOT_FOUND_SENTINEL = "FIXTURE_ROUND_NOT_FOUND";

interface ParsedFilterKey {
  key: string;
  leagueId: number;
  seasonId: number;
  stageId: number;
  round: number;
}

export interface FixtureExternalInfo {
  games: ExternalGame[];
  roundName: string;
}

const getLeagueId = (): string => {
  const pathname = new URL(config.api.URL).pathname;
  const segments = pathname.split("/").filter(Boolean);
  const leagueId = segments[segments.length - 1];

  if (!leagueId) {
    throw new Error(
      "No se pudo determinar el id de la liga en la URL configurada.",
    );
  }

  return leagueId;
};

const parseFilterKey = (key: string): ParsedFilterKey | null => {
  const [leagueId, seasonId, stageId, round] = key.split("_").map(Number);

  if (
    !Number.isInteger(leagueId) ||
    !Number.isInteger(seasonId) ||
    !Number.isInteger(stageId) ||
    !Number.isInteger(round)
  ) {
    return null;
  }

  return {
    key,
    leagueId,
    seasonId,
    stageId,
    round,
  };
};

const getSelectedParsedFilter = (
  filters: ExternalFilter[],
): ParsedFilterKey | null => {
  const selectedFilter = filters.find(
    (filter) => filter.selected && filter.key !== "latest",
  );

  if (!selectedFilter) {
    return null;
  }

  return parseFilterKey(selectedFilter.key);
};

const getActiveStageFilters = (
  filters: ExternalFilter[],
): ParsedFilterKey[] => {
  const parsed = filters
    .filter((filter) => filter.key !== "latest")
    .map((filter) => parseFilterKey(filter.key))
    .filter((value): value is ParsedFilterKey => value !== null);

  if (parsed.length === 0) {
    throw new Error("No se encontraron filtros de fechas válidos.");
  }

  const selectedParsed = getSelectedParsedFilter(filters);

  if (!selectedParsed) {
    const fallback = parsed[0];
    return parsed.filter(
      (item) =>
        item.leagueId === fallback.leagueId &&
        item.seasonId === fallback.seasonId &&
        item.stageId === fallback.stageId,
    );
  }

  return parsed.filter(
    (item) =>
      item.leagueId === selectedParsed.leagueId &&
      item.seasonId === selectedParsed.seasonId &&
      item.stageId === selectedParsed.stageId,
  );
};

const getHighestRound = (activeStageFilters: ParsedFilterKey[]): number =>
  Math.max(...activeStageFilters.map((item) => item.round));

const getSelectedFilter = (filters: ExternalFilter[]): ExternalFilter | null => {
  return filters.find((filter) => filter.selected && filter.key !== "latest") ?? null;
};

const canFallbackToSelectedFilterGames = (
  selectedFilter: ExternalFilter | null,
  selectedParsed: ParsedFilterKey | null,
  targetRound: number,
): boolean => {
  return selectedFilter !== null && selectedParsed?.round === targetRound;
};

const isFallbackEligibleError = (error: unknown): boolean => {
  return error instanceof PromiedosParseError || error instanceof PromiedosSchemaError;
};

export const getFixtureExternalInfo = async (
  round?: number,
): Promise<FixtureExternalInfo> => {
  const leagueId = getLeagueId();
  const data = await fetchPageData(config.api.URL);
  const filters = getFixtureFiltersFromPageData(data);

  if (!filters) {
    throw new PromiedosSchemaError(
      "Promiedos respondió filtros de partidos inválidos.",
    );
  }

  const activeStageFilters = getActiveStageFilters(filters);
  const selectedFilter = getSelectedFilter(filters);
  const selectedParsed = getSelectedParsedFilter(filters);
  const targetRound =
    round ?? selectedParsed?.round ?? getHighestRound(activeStageFilters);

  const targetFilter = activeStageFilters.find(
    (item) => item.round === targetRound,
  );

  if (!targetFilter) {
    throw new Error(FIXTURE_ROUND_NOT_FOUND_SENTINEL);
  }

  let games: ExternalGame[];

  try {
    games = await fetchGamesByFilterKey(leagueId, targetFilter.key);
  } catch (error) {
    if (
      isFallbackEligibleError(error) &&
      canFallbackToSelectedFilterGames(selectedFilter, selectedParsed, targetRound)
    ) {
      const selectedGames = getSelectedFilterGames(selectedFilter);

      if (selectedGames && selectedGames.length > 0) {
        return {
          games: selectedGames,
          roundName: `Fecha ${targetRound}`,
        };
      }
    }

    throw error;
  }

  if (games.length === 0) {
    throw new Error(`No se encontraron partidos para la fecha ${targetRound}.`);
  }

  return {
    games,
    roundName: `Fecha ${targetRound}`,
  };
};

export const getRoundsExternalInfo =
  async (): Promise<FixtureRoundsResponse> => {
    const data = await fetchPageData(config.api.URL);
    const filters = getFixtureFiltersFromPageData(data);

    if (!filters) {
      throw new PromiedosSchemaError(
        "Promiedos respondió filtros de fechas inválidos.",
      );
    }

    const activeStageFilters = getActiveStageFilters(filters);

    const rounds = Array.from(
      new Set(activeStageFilters.map((item) => item.round)),
    ).sort((a, b) => a - b);

    if (rounds.length === 0) {
      throw new Error("No se encontraron fechas disponibles.");
    }

    const selectedRound = filters.find(
      (filter) => filter.selected && filter.key !== "latest",
    );

    const selectedParsed = selectedRound
      ? parseFilterKey(selectedRound.key)
      : null;
    const currentRound =
      selectedParsed?.round ?? getHighestRound(activeStageFilters);

    return {
      currentRound,
      rounds,
    };
  };
