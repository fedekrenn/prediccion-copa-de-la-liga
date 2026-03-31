import { beforeEach, describe, expect, it, vi } from "vitest";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

vi.mock("@auth/tokenService", () => ({
  verifyToken: vi.fn(),
  TokenRecordNotFoundError: class TokenRecordNotFoundError extends Error {},
}));

vi.mock("@prediction/Prediction", () => ({
  Prediction: {
    getFullPrediction: vi.fn(),
    getPredictionByTeamName: vi.fn(),
    getTeamsInClassification: vi.fn(),
    getPredictionByPosition: vi.fn(),
  },
}));

import { verifyToken } from "@auth/tokenService";
import { Prediction } from "@prediction/Prediction";
import { getPrediction } from "@usecases/prediction/getPrediction";
import type { CompleteTeamData } from "@typos/teamPrediction";

const mockPredictionList: CompleteTeamData[] = [
  {
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
  },
];

const mockPredictionTeam: CompleteTeamData = {
  teamInfo: { name: "River Plate", img: "river.png" },
  currentData: {
    group: "B",
    totalPoints: 29,
    playedMatches: 20,
    goalsDifference: 8,
    gamesWon: 8,
    gamesEven: 5,
    gamesLost: 7,
    annualPoints: 44,
  },
  predictions: {
    position: 2,
    classification: "libertadores",
    estimatedTotalPoints: 50,
    effectivityPercentage: 61,
    estimatedAverage: 1.8,
  },
};

describe("getPrediction use case", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns full prediction when no params are provided", async () => {
    vi.mocked(Prediction.getFullPrediction).mockResolvedValue(mockPredictionList);

    const result = await getPrediction(null, {});

    expect(result).toEqual(mockPredictionList);
    expect(Prediction.getFullPrediction).toHaveBeenCalledTimes(1);
    expect(verifyToken).not.toHaveBeenCalled();
  });

  it("throws 401 when team name is used without token", async () => {
    await expect(getPrediction(null, { name: "boca" })).rejects.toMatchObject({
      status: 401,
      message: "You are not authorized to access this resource",
      code: "UNAUTHORIZED",
    });

    expect(verifyToken).not.toHaveBeenCalled();
  });

  it("throws 401 when classification is used without token", async () => {
    await expect(
      getPrediction(null, { classification: "libertadores" }),
    ).rejects.toMatchObject({
      status: 401,
      message: "You are not authorized to access this resource",
      code: "UNAUTHORIZED",
    });

    expect(verifyToken).not.toHaveBeenCalled();
  });

  it("throws 401 when position is used without token", async () => {
    await expect(getPrediction(null, { position: "1" })).rejects.toMatchObject({
      status: 401,
      message: "You are not authorized to access this resource",
      code: "UNAUTHORIZED",
    });

    expect(verifyToken).not.toHaveBeenCalled();
  });

  it("throws 401 when Authorization header is not a valid Bearer token", async () => {
    await expect(
      getPrediction("Token aaa.bbb.ccc", { name: "boca" }),
    ).rejects.toMatchObject({
      status: 401,
      message: "You are not authorized to access this resource",
      code: "UNAUTHORIZED",
    });

    expect(verifyToken).not.toHaveBeenCalled();
  });

  it("returns prediction by team name when token is valid", async () => {
    vi.mocked(verifyToken).mockResolvedValue({ userId: "1" });
    vi.mocked(Prediction.getPredictionByTeamName).mockResolvedValue([
      mockPredictionTeam,
    ]);

    const result = await getPrediction("Bearer aaa.bbb.ccc", { name: "river" });

    expect(result).toEqual([mockPredictionTeam]);
    expect(verifyToken).toHaveBeenCalledWith("aaa.bbb.ccc");
    expect(Prediction.getPredictionByTeamName).toHaveBeenCalledWith("river");
  });

  it("returns teams by classification when token is valid", async () => {
    vi.mocked(verifyToken).mockResolvedValue({ userId: "1" });
    vi.mocked(Prediction.getTeamsInClassification).mockResolvedValue(
      mockPredictionList,
    );

    const result = await getPrediction("Bearer aaa.bbb.ccc", {
      classification: "libertadores",
    });

    expect(result).toEqual(mockPredictionList);
    expect(Prediction.getTeamsInClassification).toHaveBeenCalledWith(
      "libertadores",
    );
  });

  it("returns prediction by position as number when token is valid", async () => {
    vi.mocked(verifyToken).mockResolvedValue({ userId: "1" });
    vi.mocked(Prediction.getPredictionByPosition).mockResolvedValue(
      mockPredictionTeam,
    );

    const result = await getPrediction("Bearer aaa.bbb.ccc", { position: "10" });

    expect(result).toEqual(mockPredictionTeam);
    expect(Prediction.getPredictionByPosition).toHaveBeenCalledWith(10);
  });

  it("prioritizes name over classification and position", async () => {
    vi.mocked(verifyToken).mockResolvedValue({ userId: "1" });
    vi.mocked(Prediction.getPredictionByTeamName).mockResolvedValue(
      mockPredictionList,
    );

    await getPrediction("Bearer aaa.bbb.ccc", {
      name: "boca",
      classification: "libertadores",
      position: "1",
    });

    expect(Prediction.getPredictionByTeamName).toHaveBeenCalledWith("boca");
    expect(Prediction.getTeamsInClassification).not.toHaveBeenCalled();
    expect(Prediction.getPredictionByPosition).not.toHaveBeenCalled();
  });

  it("prioritizes classification over position", async () => {
    vi.mocked(verifyToken).mockResolvedValue({ userId: "1" });
    vi.mocked(Prediction.getTeamsInClassification).mockResolvedValue(
      mockPredictionList,
    );

    await getPrediction("Bearer aaa.bbb.ccc", {
      classification: "sudamericana",
      position: "7",
    });

    expect(Prediction.getTeamsInClassification).toHaveBeenCalledWith(
      "sudamericana",
    );
    expect(Prediction.getPredictionByPosition).not.toHaveBeenCalled();
  });

  it("maps expired token errors to a 401 custom error", async () => {
    vi.mocked(verifyToken).mockRejectedValue(
      new TokenExpiredError("jwt expired", new Date(0)),
    );

    await expect(
      getPrediction("Bearer aaa.bbb.ccc", { name: "boca" }),
    ).rejects.toMatchObject({
      status: 401,
      message: "Token has expired. Please obtain a new token.",
      code: "TOKEN_EXPIRED",
    });
  });

  it("maps invalid token errors to a 401 custom error", async () => {
    vi.mocked(verifyToken).mockRejectedValue(
      new JsonWebTokenError("invalid signature"),
    );

    await expect(
      getPrediction("Bearer aaa.bbb.ccc", { name: "boca" }),
    ).rejects.toMatchObject({
      status: 401,
      message: "Invalid token provided.",
      code: "INVALID_TOKEN",
    });
  });

  it("maps unknown token errors to a 401 custom error", async () => {
    vi.mocked(verifyToken).mockRejectedValue(new Error("Any other error"));

    await expect(
      getPrediction("Bearer aaa.bbb.ccc", { name: "boca" }),
    ).rejects.toMatchObject({
      status: 401,
      message: "Token validation failed. Please obtain a new token.",
      code: "TOKEN_VALIDATION_FAILED",
    });
  });
});
