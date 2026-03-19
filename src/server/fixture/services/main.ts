import { extractFixtureDataFromGames, type ExternalFilter } from "./extractFixtureData";
import { fetchPromiedosPageData, fetchGamesByFilterKey } from "./getExternalInfo";
import type { FixtureRound, FixtureRoundsResponse } from "@typos/fixture";

interface ParsedFilterKey {
  key: string;
  leagueId: number;
  seasonId: number;
  stageId: number;
  round: number;
}

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

const getActiveStageFilters = (filters: ExternalFilter[]): ParsedFilterKey[] => {
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

export const getFixture = async (round?: number): Promise<FixtureRound> => {
  const data = await fetchPromiedosPageData();

  if (!data || !data.games || !data.games.filters) {
    throw new Error("No se encontró la información de partidos.");
  }

  const activeStageFilters = getActiveStageFilters(data.games.filters);
  const selectedParsed = getSelectedParsedFilter(data.games.filters);
  const targetRound =
    round ??
    selectedParsed?.round ??
    getHighestRound(activeStageFilters);

  const targetFilter = activeStageFilters.find((item) => item.round === targetRound);

  if (!targetFilter) {
    throw new Error(`No se encontró la fecha ${targetRound}.`);
  }

  const allGames = await fetchGamesByFilterKey(targetFilter.key);

  if (allGames.length === 0) {
    throw new Error(`No se encontraron partidos para la fecha ${targetRound}.`);
  }

  return extractFixtureDataFromGames(allGames, `Fecha ${targetRound}`);
};

export const getFixtureRounds = async (): Promise<FixtureRoundsResponse> => {
  const data = await fetchPromiedosPageData();

  if (!data || !data.games || !data.games.filters) {
    throw new Error("No se encontró la información de filtros de fechas.");
  }

  const activeStageFilters = getActiveStageFilters(data.games.filters);

  const rounds = Array.from(new Set(activeStageFilters.map((item) => item.round))).sort(
    (a, b) => a - b,
  );

  if (rounds.length === 0) {
    throw new Error("No se encontraron fechas disponibles.");
  }

  const selectedRound = data.games.filters
    .find((filter) => filter.selected && filter.key !== "latest");

  const selectedParsed = selectedRound ? parseFilterKey(selectedRound.key) : null;
  const currentRound = selectedParsed?.round ?? getHighestRound(activeStageFilters);

  return {
    currentRound,
    rounds,
  };
};
