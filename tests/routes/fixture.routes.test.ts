import { beforeEach, describe, expect, it, vi } from "vitest";

import { mockFixtureRound, mockFixtureRounds } from "../data/fixtureDataTests";

vi.mock("@usecases/fixture/getFixture", () => ({
  getFixtureData: vi.fn(),
}));

vi.mock("@usecases/fixture/getFixtureRounds", () => ({
  getFixtureRoundsData: vi.fn(),
}));

import {
  GET as fixtureGet,
  OPTIONS as fixtureOptions,
} from "../../src/pages/api/fixture";
import {
  GET as fixtureRoundsGet,
  OPTIONS as fixtureRoundsOptions,
} from "../../src/pages/api/fixture/rounds";
import { getFixtureData } from "@usecases/fixture/getFixture";
import { getFixtureRoundsData } from "@usecases/fixture/getFixtureRounds";

const createRequest = (path: string, authHeader?: string): Request => {
  const headers = authHeader ? { Authorization: authHeader } : undefined;

  return new Request(`http://localhost:4321${path}`, { headers });
};

describe("Fixture API routes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 200 for GET /api/fixture", async () => {
    vi.mocked(getFixtureData).mockResolvedValue(mockFixtureRound);

    const response = await fixtureGet({
      request: createRequest("/api/fixture"),
    } as any);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(mockFixtureRound);
    expect(getFixtureData).toHaveBeenCalledWith(null, {});
  });

  it("returns 200 for GET /api/fixture?round=1", async () => {
    vi.mocked(getFixtureData).mockResolvedValue(mockFixtureRound);

    const response = await fixtureGet({
      request: createRequest("/api/fixture?round=1"),
    } as any);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(mockFixtureRound);
    expect(getFixtureData).toHaveBeenCalledWith(null, { round: "1" });
  });

  it("returns 400 for GET /api/fixture?round= when use case rejects empty round", async () => {
    vi.mocked(getFixtureData).mockRejectedValue({
      message: "You must provide a valid round number",
      status: 400,
    });

    const response = await fixtureGet({
      request: createRequest("/api/fixture?round="),
    } as any);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      error: "You must provide a valid round number",
    });
    expect(getFixtureData).toHaveBeenCalledWith(null, { round: "" });
  });

  it("returns 400 for invalid query parameter", async () => {
    const response = await fixtureGet({
      request: createRequest("/api/fixture?wrongParam=1"),
    } as any);

    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toContain("Invalid parameter(s): wrongParam");
    expect(body.code).toBe("INVALID_PARAMETERS");
    expect(getFixtureData).not.toHaveBeenCalled();
  });

  it("returns 400 listing all invalid query parameters", async () => {
    const response = await fixtureGet({
      request: createRequest("/api/fixture?foo=1&bar=2&round=1"),
    } as any);

    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toContain("Invalid parameter(s): foo, bar");
    expect(body.code).toBe("INVALID_PARAMETERS");
    expect(getFixtureData).not.toHaveBeenCalled();
  });

  it("forwards multiple valid params and authorization header to use case", async () => {
    vi.mocked(getFixtureData).mockResolvedValue(mockFixtureRound);

    const response = await fixtureGet({
      request: createRequest(
        "/api/fixture?round=2&team=boca&status=finished&date=15-03-2025",
        "Bearer aaa.bbb.ccc",
      ),
    } as any);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(mockFixtureRound);
    expect(getFixtureData).toHaveBeenCalledWith("Bearer aaa.bbb.ccc", {
      round: "2",
      team: "boca",
      status: "finished",
      date: "15-03-2025",
    });
  });

  it("returns mapped error status from use case", async () => {
    vi.mocked(getFixtureData).mockRejectedValue({
      message: "You are not authorized to access this resource",
      status: 401,
    });

    const response = await fixtureGet({
      request: createRequest("/api/fixture?team=boca"),
    } as any);

    expect(response.status).toBe(401);
    expect(await response.json()).toEqual({
      error: "You are not authorized to access this resource",
    });
  });

  it("returns error code when use case provides one", async () => {
    vi.mocked(getFixtureData).mockRejectedValue({
      message: "Fixture round not found.",
      status: 404,
      code: "FIXTURE_ROUND_NOT_FOUND",
    });

    const response = await fixtureGet({
      request: createRequest("/api/fixture?round=99"),
    } as any);

    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({
      error: "Fixture round not found.",
      code: "FIXTURE_ROUND_NOT_FOUND",
    });
  });

  it("returns 502 for typed upstream parse failures", async () => {
    vi.mocked(getFixtureData).mockRejectedValue({
      message: "Broken upstream HTML",
      status: 502,
      code: "PROMIEDOS_UPSTREAM_PARSE",
    });

    const response = await fixtureGet({
      request: createRequest("/api/fixture"),
    } as any);

    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({
      error: "Broken upstream HTML",
      code: "PROMIEDOS_UPSTREAM_PARSE",
    });
  });

  it("returns 503 for typed upstream unavailable failures", async () => {
    vi.mocked(getFixtureData).mockRejectedValue({
      message: "Promiedos unavailable",
      status: 503,
      code: "PROMIEDOS_UPSTREAM_UNAVAILABLE",
    });

    const response = await fixtureGet({
      request: createRequest("/api/fixture"),
    } as any);

    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({
      error: "Promiedos unavailable",
      code: "PROMIEDOS_UPSTREAM_UNAVAILABLE",
    });
  });

  it("returns 500 when use case error has no status", async () => {
    vi.mocked(getFixtureData).mockRejectedValue(
      new Error("Unexpected failure"),
    );

    const response = await fixtureGet({
      request: createRequest("/api/fixture"),
    } as any);

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ error: "Internal server error" });
  });

  it("returns 200 for OPTIONS /api/fixture", async () => {
    const response = await fixtureOptions({} as any);

    expect(response.status).toBe(200);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
    expect(response.headers.get("Access-Control-Allow-Methods")).toContain(
      "GET",
    );
  });

  it("returns 200 for GET /api/fixture/rounds", async () => {
    vi.mocked(getFixtureRoundsData).mockResolvedValue(mockFixtureRounds);

    const response = await fixtureRoundsGet({} as any);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(mockFixtureRounds);
    expect(getFixtureRoundsData).toHaveBeenCalledTimes(1);
  });

  it("returns 500 for GET /api/fixture/rounds when use case fails", async () => {
    vi.mocked(getFixtureRoundsData).mockRejectedValue(
      new Error("Rounds failed"),
    );

    const response = await fixtureRoundsGet({} as any);

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ error: "Internal server error" });
  });

  it("returns 200 for OPTIONS /api/fixture/rounds", async () => {
    const response = await fixtureRoundsOptions({} as any);

    expect(response.status).toBe(200);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
    expect(response.headers.get("Access-Control-Allow-Methods")).toContain(
      "GET",
    );
  });
});
