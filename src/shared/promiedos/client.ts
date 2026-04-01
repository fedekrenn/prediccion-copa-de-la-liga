import type { ExternalGame } from "@fixture/services/extractFixtureData";
import { CustomError } from "@shared/errors/CustomError";
import { ERROR_CODES, type ErrorCode } from "@shared/errors/errorCodes";
import {
  isExternalGameArray,
  isPromiedosPageData,
  type PromiedosPageData,
} from "./validators";

const NEXT_DATA_REGEX =
  /<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/s;
const PROMIEDOS_API_BASE = "https://api.promiedos.com.ar";
const PROMIEDOS_VERSION = "1.11.7.3";

const PROMIEDOS_HTML_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome Safari/537.36",
  Accept: "text/html",
} as const;

const buildUnavailableMessage = (
  resource: string,
  reason: string,
): string => {
  return `No se pudo obtener ${resource}: ${reason}`;
};

const ensureOkResponse = (response: Response, resource: string): void => {
  if (!response.ok) {
    throw new PromiedosUnavailableError(
      buildUnavailableMessage(
        resource,
        `${response.status} ${response.statusText}`.trim(),
      ),
    );
  }
};

const extractNextDataScript = (html: string): string => {
  const match = html.match(NEXT_DATA_REGEX);

  if (!match?.[1]) {
    throw new PromiedosParseError(
      "No se pudo extraer __NEXT_DATA__ de la página de Promiedos.",
    );
  }

  return match[1];
};

const toUnknownErrorMessage = (error: unknown): string => {
  return error instanceof Error ? error.message : "Error desconocido";
};

const parseNextDataPayload = (scriptContents: string): unknown => {
  try {
    return JSON.parse(scriptContents);
  } catch (error) {
    throw new PromiedosParseError(
      `Error al parsear JSON de __NEXT_DATA__: ${toUnknownErrorMessage(error)}`,
    );
  }
};

const isPromiedosUpstreamError = (
  error: unknown,
): error is PromiedosUpstreamError => {
  return error instanceof PromiedosUpstreamError;
};

const getPageDataFromNextData = (nextData: unknown): PromiedosPageData => {
  const pageData = (nextData as Record<string, any>)?.props?.pageProps?.data;

  if (!isPromiedosPageData(pageData)) {
    throw new PromiedosSchemaError(
      "Promiedos respondió un pageProps.data inválido.",
    );
  }

  return pageData;
};

const mapTransportError = (error: unknown, resource: string): never => {
  if (isPromiedosUpstreamError(error)) {
    throw error;
  }

  throw new PromiedosUnavailableError(
    buildUnavailableMessage(resource, toUnknownErrorMessage(error)),
  );
};

const parseGamesPayload = async (response: Response): Promise<ExternalGame[]> => {
  let payload: unknown;

  try {
    payload = await response.json();
  } catch (error) {
    throw new PromiedosParseError(
      `Error al parsear respuesta JSON de partidos: ${toUnknownErrorMessage(error)}`,
    );
  }

  const games = (payload as Record<string, unknown>)?.games;

  if (!isExternalGameArray(games)) {
    throw new PromiedosSchemaError(
      "Promiedos respondió un payload de partidos inválido.",
    );
  }

  return games;
};

export class PromiedosUpstreamError extends CustomError {
  constructor(message: string, code: ErrorCode, status: 502 | 503) {
    super(
      message,
      status,
      status === 503 ? "Service Unavailable" : "Bad Gateway",
      code,
    );
    this.name = new.target.name;
  }
}

export class PromiedosParseError extends PromiedosUpstreamError {
  constructor(message: string) {
    super(message, ERROR_CODES.PROMIEDOS_UPSTREAM_PARSE, 502);
  }
}

export class PromiedosSchemaError extends PromiedosUpstreamError {
  constructor(message: string) {
    super(message, ERROR_CODES.PROMIEDOS_UPSTREAM_SCHEMA, 502);
  }
}

export class PromiedosUnavailableError extends PromiedosUpstreamError {
  constructor(message: string) {
    super(message, ERROR_CODES.PROMIEDOS_UPSTREAM_UNAVAILABLE, 503);
  }
}

export const fetchPageData = async (url: string): Promise<PromiedosPageData> => {
  try {
    const response = await fetch(url, {
      headers: PROMIEDOS_HTML_HEADERS,
    });

    ensureOkResponse(response, `la página ${url}`);

    const html = await response.text();
    const nextDataScript = extractNextDataScript(html);
    const nextData = parseNextDataPayload(nextDataScript);

    return getPageDataFromNextData(nextData);
  } catch (error) {
    return mapTransportError(error, `la página ${url}`);
  }
};

export const fetchGamesByFilterKey = async (
  leagueId: string,
  filterKey: string,
): Promise<ExternalGame[]> => {
  const resource = `los partidos para la fecha ${filterKey}`;

  try {
    const response = await fetch(
      `${PROMIEDOS_API_BASE}/league/games/${leagueId}/${filterKey}`,
      {
        headers: {
          "X-VER": PROMIEDOS_VERSION,
        },
      },
    );

    ensureOkResponse(response, resource);

    return parseGamesPayload(response);
  } catch (error) {
    return mapTransportError(error, resource);
  }
};
