import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@config/config", () => ({
  config: {
    api: {
      URL: "https://www.promiedos.com.ar/league/liga-profesional/123",
    },
  },
}));

vi.mock("@shared/promiedos/client", () => ({
  fetchPageData: vi.fn(),
  fetchGamesByFilterKey: vi.fn(),
  PromiedosParseError: class PromiedosParseError extends Error {
    status = 502;
    code = "PROMIEDOS_UPSTREAM_PARSE";
  },
  PromiedosSchemaError: class PromiedosSchemaError extends Error {
    status = 502;
    code = "PROMIEDOS_UPSTREAM_SCHEMA";
  },
  PromiedosUnavailableError: class PromiedosUnavailableError extends Error {
    status = 503;
    code = "PROMIEDOS_UPSTREAM_UNAVAILABLE";
  },
}));

import {
  FIXTURE_ROUND_NOT_FOUND_SENTINEL,
  getFixtureExternalInfo,
} from "@fixture/services/getExternalInfo";
import {
  fetchGamesByFilterKey,
  fetchPageData,
  PromiedosParseError,
} from "@shared/promiedos/client";

const selectedGames = [
  {
    teams: [
      { name: "Boca Juniors", short_name: "BOC", id: "1" },
      { name: "River Plate", short_name: "RIV", id: "2" },
    ],
    status: { enum: 1, name: "Programado", short_name: "PRE", symbol_name: "pre" },
    start_time: "01-04-2026 20:00",
    winner: 0,
  },
];

const pageData = {
  games: {
    filters: [
      { name: "Fecha 4", key: "123_2026_1_4" },
      {
        name: "Fecha 5",
        key: "123_2026_1_5",
        selected: true,
        games: selectedGames,
      },
      { name: "Fecha 6", key: "123_2026_1_6" },
    ],
  },
};

describe("getFixtureExternalInfo", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("uses the selected round when no round is requested", async () => {
    vi.mocked(fetchPageData).mockResolvedValue(pageData as any);
    vi.mocked(fetchGamesByFilterKey).mockResolvedValue(selectedGames as any);

    const result = await getFixtureExternalInfo();

    expect(fetchGamesByFilterKey).toHaveBeenCalledWith("123", "123_2026_1_5");
    expect(result).toEqual({
      games: selectedGames,
      roundName: "Fecha 5",
    });
  });

  it("falls back to selectedFilter.games when games endpoint is unusable", async () => {
    vi.mocked(fetchPageData).mockResolvedValue(pageData as any);
    vi.mocked(fetchGamesByFilterKey).mockRejectedValue(
      new PromiedosParseError("non-json upstream body"),
    );

    const result = await getFixtureExternalInfo();

    expect(result).toEqual({
      games: selectedGames,
      roundName: "Fecha 5",
    });
  });

  it("does not fall back when requesting a different round", async () => {
    const upstreamError = new PromiedosParseError("non-json upstream body");

    vi.mocked(fetchPageData).mockResolvedValue(pageData as any);
    vi.mocked(fetchGamesByFilterKey).mockRejectedValue(upstreamError);

    await expect(getFixtureExternalInfo(4)).rejects.toBe(upstreamError);
  });

  it("throws the sentinel when the requested round does not exist", async () => {
    vi.mocked(fetchPageData).mockResolvedValue(pageData as any);

    await expect(getFixtureExternalInfo(99)).rejects.toThrow(
      FIXTURE_ROUND_NOT_FOUND_SENTINEL,
    );
    expect(fetchGamesByFilterKey).not.toHaveBeenCalled();
  });
});
