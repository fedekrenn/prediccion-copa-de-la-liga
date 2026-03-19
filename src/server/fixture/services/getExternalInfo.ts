import { config } from "@config/config";
import type { ExternalFilter, ExternalGame } from "./extractFixtureData";

const NEXT_DATA_REGEX =
  /<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/s;
const PROMIEDOS_API_BASE = "https://api.promiedos.com.ar";
const PROMIEDOS_VERSION = "1.11.7.3";

export interface PromiedosPageData {
  games?: {
    filters?: ExternalFilter[];
  };
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

export const fetchPromiedosPageData = async (): Promise<PromiedosPageData> => {
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

export const fetchGamesByFilterKey = async (filterKey: string): Promise<ExternalGame[]> => {
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
