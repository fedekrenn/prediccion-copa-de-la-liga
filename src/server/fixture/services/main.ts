import { config } from "@config/config";
import {
  extractFixtureDataFromGames,
  type ExternalFilter,
  type ExternalGame,
} from "./extractFixtureData";
import type { FixtureRound, FixtureRoundsResponse } from "@typos/fixture";

const NEXT_DATA_REGEX =
  /<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/s;
const PROMIEDOS_API_BASE = "https://api.promiedos.com.ar";
const PROMIEDOS_VERSION = "1.11.7.3";

interface PromiedosPageData {
  games?: {
    filters?: ExternalFilter[];
  };
}

interface ParsedFilterKey {
  key: string;
  leagueId: number;
  seasonId: number;
  stageId: number;
  round: number;
}

const getLeagueId = (): string => {
  const pathname = new URL(config.api.URL).pathname;
  const segments = pathname.split("/").filter(Boolean);
  const leagueId = segments[segments.length - 1];

  if (!leagueId) {
    throw new Error("No se pudo determinar el id de la liga en la URL configurada.");
  }

  return leagueId;
};

const fetchPromiedosPageData = async (): Promise<PromiedosPageData> => {
  const response = await fetch(config.api.URL, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome Safari/537.36",
      Accept: "text/html",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Error al obtener la página ${config.api.URL}: ${response.status} ${response.statusText}`,
    );
  }

  const html = await response.text();
  const match = html.match(NEXT_DATA_REGEX);

  if (!match) {
    throw new Error("No se pudo extraer __NEXT_DATA__ de la página.");
  }

  try {
    const nextData = JSON.parse(match[1]);
    return nextData.props.pageProps.data;
  } catch (error) {
    throw new Error(
      `Error al parsear JSON de __NEXT_DATA__: ${error instanceof Error ? error.message : "Error desconocido"}`,
    );
  }
};

const fetchGamesByFilterKey = async (filterKey: string): Promise<ExternalGame[]> => {
  const leagueId = getLeagueId();
  const response = await fetch(
    `${PROMIEDOS_API_BASE}/league/games/${leagueId}/${filterKey}`,
    {
      headers: {
        "X-VER": PROMIEDOS_VERSION,
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Error al obtener partidos para la fecha ${filterKey}: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();

  if (!data || !Array.isArray(data.games)) {
    throw new Error("No se encontraron partidos para la fecha seleccionada.");
  }

  return data.games;
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
