import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@usecases/prediction/getPrediction", () => ({
  getPrediction: vi.fn(),
}));

import {
  GET as predictionGet,
  OPTIONS as predictionOptions,
} from "../../src/pages/api/prediction";
import { getPrediction } from "@usecases/prediction/getPrediction";
import type { CompleteTeamData } from "@typos/teamPrediction";

const createRequest = (path: string, authHeader?: string): Request => {
  const headers = authHeader ? { Authorization: authHeader } : undefined;

  return new Request(`http://localhost:4321${path}`, { headers });
};

const mockPredictionByPosition: CompleteTeamData = {
  teamInfo: { name: "Boca Juniors", img: "boca.png" },
  currentData: {
    group: "A",
    totalPoints: 30,
    playedMatches: 20,
    goalsDifference: 10,
    gamesWon: 9,
    gamesEven: 3,
    gamesLost: 8,
    annualPoints: 45,
  },
  predictions: {
    position: 1,
    classification: "libertadores",
    estimatedTotalPoints: 52,
    effectivityPercentage: 64,
    estimatedAverage: 1.9,
  },
};

describe("Prediction API routes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 200 for GET /api/prediction (full prediction)", async () => {
    vi.mocked(getPrediction).mockResolvedValue([mockPredictionByPosition]);

    const response = await predictionGet({
      request: createRequest("/api/prediction"),
    } as any);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual([mockPredictionByPosition]);
    expect(getPrediction).toHaveBeenCalledWith(null, {});
  });

  it("returns 401 for protected query without token (classification param)", async () => {
    vi.mocked(getPrediction).mockRejectedValue({
      message: "You are not authorized to access this resource",
      status: 401,
    });

    const response = await predictionGet({
      request: createRequest("/api/prediction?classification=1"),
    } as any);

    expect(response.status).toBe(401);
    expect(await response.json()).toEqual({
      error: "You are not authorized to access this resource",
    });
  });

  it("returns 200 for protected query with token (position param)", async () => {
    vi.mocked(getPrediction).mockResolvedValue(mockPredictionByPosition);

    const response = await predictionGet({
      request: createRequest(
        "/api/prediction?position=1",
        "Bearer aaa.bbb.ccc",
      ),
    } as any);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(mockPredictionByPosition);
    expect(getPrediction).toHaveBeenCalledWith("Bearer aaa.bbb.ccc", {
      position: "1",
    });
  });

  it("returns 400 for invalid prediction parameter", async () => {
    const response = await predictionGet({
      request: createRequest(
        "/api/prediction?wrongParameter=1",
        "Bearer aaa.bbb.ccc",
      ),
    } as any);

    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toContain("Invalid parameter(s): wrongParameter");
    expect(getPrediction).not.toHaveBeenCalled();
  });

  it("returns 400 listing all invalid query parameters", async () => {
    const response = await predictionGet({
      request: createRequest(
        "/api/prediction?foo=1&bar=2&position=1",
        "Bearer aaa.bbb.ccc",
      ),
    } as any);

    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toContain("Invalid parameter(s): foo, bar");
    expect(getPrediction).not.toHaveBeenCalled();
  });

  it("returns mapped error status from use case (400)", async () => {
    vi.mocked(getPrediction).mockRejectedValue({
      message: "You must provide a valid position from 1 to 28",
      status: 400,
    });

    const response = await predictionGet({
      request: createRequest(
        "/api/prediction?position=99",
        "Bearer aaa.bbb.ccc",
      ),
    } as any);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      error: "You must provide a valid position from 1 to 28",
    });
  });

  it("returns 500 when use case error has no status", async () => {
    vi.mocked(getPrediction).mockRejectedValue(
      new Error("Unexpected failure"),
    );

    const response = await predictionGet({
      request: createRequest("/api/prediction"),
    } as any);

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ error: "Unexpected failure" });
  });

  it("returns 200 for OPTIONS /api/prediction", async () => {
    const response = await predictionOptions({} as any);

    expect(response.status).toBe(200);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
    expect(response.headers.get("Access-Control-Allow-Methods")).toContain(
      "GET",
    );
  });
});