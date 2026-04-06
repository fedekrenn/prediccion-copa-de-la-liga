import { beforeEach, describe, expect, it, vi } from "vitest";
import jwt from "jsonwebtoken";
const { JsonWebTokenError, TokenExpiredError } = jwt;

import { mockFixtureRound } from "../data/fixtureDataTests";

vi.mock("@auth/tokenService", () => ({
  verifyToken: vi.fn(),
  TokenRecordNotFoundError: class TokenRecordNotFoundError extends Error {},
}));

vi.mock("@fixture/Fixture", () => ({
  Fixture: {
    getFixtureByRound: vi.fn(),
    getFixtureByTeam: vi.fn(),
    getFixtureByStatus: vi.fn(),
    getFixtureByDate: vi.fn(),
    getFullFixture: vi.fn(),
  },
}));

import { verifyToken } from "@auth/tokenService";
import { Fixture } from "@fixture/Fixture";
import { getFixtureData } from "@usecases/fixture/getFixture";

describe("getFixtureData use case", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns full fixture when no query params are provided", async () => {
    vi.mocked(Fixture.getFullFixture).mockResolvedValue(mockFixtureRound);

    const result = await getFixtureData(null, {});

    expect(result).toEqual(mockFixtureRound);
    expect(Fixture.getFullFixture).toHaveBeenCalledTimes(1);
  });

  it("returns fixture by round without requiring token", async () => {
    vi.mocked(Fixture.getFixtureByRound).mockResolvedValue(mockFixtureRound);

    const result = await getFixtureData(null, { round: "2" });

    expect(result).toEqual(mockFixtureRound);
    expect(Fixture.getFixtureByRound).toHaveBeenCalledWith("2");
    expect(verifyToken).not.toHaveBeenCalled();
  });

  it("throws 400 when round is provided as an empty string", async () => {
    vi.mocked(Fixture.getFixtureByRound).mockRejectedValue({
      status: 400,
      message: "You must provide a valid round number",
    });

    await expect(getFixtureData(null, { round: "" })).rejects.toMatchObject({
      status: 400,
      message: "You must provide a valid round number",
    });

    expect(Fixture.getFixtureByRound).toHaveBeenCalledWith("");
    expect(verifyToken).not.toHaveBeenCalled();
  });

  it("prioritizes round over protected params and does not require token", async () => {
    vi.mocked(Fixture.getFixtureByRound).mockResolvedValue(mockFixtureRound);

    const result = await getFixtureData(null, {
      round: "3",
      team: "boca",
      status: "finished",
      date: "15-03-2025",
    });

    expect(result).toEqual(mockFixtureRound);
    expect(Fixture.getFixtureByRound).toHaveBeenCalledWith("3");
    expect(verifyToken).not.toHaveBeenCalled();
    expect(Fixture.getFixtureByTeam).not.toHaveBeenCalled();
    expect(Fixture.getFixtureByStatus).not.toHaveBeenCalled();
    expect(Fixture.getFixtureByDate).not.toHaveBeenCalled();
  });

  it("throws 401 when protected params are used without token", async () => {
    await expect(getFixtureData(null, { team: "boca" })).rejects.toMatchObject({
      status: 401,
      message: "You are not authorized to access this resource",
      code: "UNAUTHORIZED",
    });

    expect(verifyToken).not.toHaveBeenCalled();
  });

  it("throws 401 when status is used without token", async () => {
    await expect(
      getFixtureData(null, { status: "finished" }),
    ).rejects.toMatchObject({
      status: 401,
      message: "You are not authorized to access this resource",
      code: "UNAUTHORIZED",
    });
  });

  it("throws 401 when date is used without token", async () => {
    await expect(
      getFixtureData(null, { date: "15-03-2025" }),
    ).rejects.toMatchObject({
      status: 401,
      message: "You are not authorized to access this resource",
      code: "UNAUTHORIZED",
    });
  });

  it("throws 401 when Authorization header is not a valid Bearer token", async () => {
    await expect(
      getFixtureData("Token aaa.bbb.ccc", { team: "boca" }),
    ).rejects.toMatchObject({
      status: 401,
      message: "You are not authorized to access this resource",
      code: "UNAUTHORIZED",
    });

    expect(verifyToken).not.toHaveBeenCalled();
  });

  it("returns fixture by team when token is valid", async () => {
    vi.mocked(verifyToken).mockResolvedValue({ userId: "1" });
    vi.mocked(Fixture.getFixtureByTeam).mockResolvedValue(mockFixtureRound);

    const result = await getFixtureData("Bearer aaa.bbb.ccc", { team: "boca" });

    expect(result).toEqual(mockFixtureRound);
    expect(verifyToken).toHaveBeenCalledWith("aaa.bbb.ccc");
    expect(Fixture.getFixtureByTeam).toHaveBeenCalledWith("boca");
  });

  it("returns fixture by status when token is valid", async () => {
    vi.mocked(verifyToken).mockResolvedValue({ userId: "1" });
    vi.mocked(Fixture.getFixtureByStatus).mockResolvedValue(mockFixtureRound);

    const result = await getFixtureData("Bearer aaa.bbb.ccc", {
      status: "finished",
    });

    expect(result).toEqual(mockFixtureRound);
    expect(Fixture.getFixtureByStatus).toHaveBeenCalledWith("finished");
  });

  it("returns fixture by date when token is valid", async () => {
    vi.mocked(verifyToken).mockResolvedValue({ userId: "1" });
    vi.mocked(Fixture.getFixtureByDate).mockResolvedValue(mockFixtureRound);

    const result = await getFixtureData("Bearer aaa.bbb.ccc", {
      date: "15-03-2025",
    });

    expect(result).toEqual(mockFixtureRound);
    expect(Fixture.getFixtureByDate).toHaveBeenCalledWith("15-03-2025");
  });

  it("prioritizes team over status and date when all are present", async () => {
    vi.mocked(verifyToken).mockResolvedValue({ userId: "1" });
    vi.mocked(Fixture.getFixtureByTeam).mockResolvedValue(mockFixtureRound);

    const result = await getFixtureData("Bearer aaa.bbb.ccc", {
      team: "boca",
      status: "finished",
      date: "15-03-2025",
    });

    expect(result).toEqual(mockFixtureRound);
    expect(Fixture.getFixtureByTeam).toHaveBeenCalledWith("boca");
    expect(Fixture.getFixtureByStatus).not.toHaveBeenCalled();
    expect(Fixture.getFixtureByDate).not.toHaveBeenCalled();
  });

  it("prioritizes status over date when both are present", async () => {
    vi.mocked(verifyToken).mockResolvedValue({ userId: "1" });
    vi.mocked(Fixture.getFixtureByStatus).mockResolvedValue(mockFixtureRound);

    const result = await getFixtureData("Bearer aaa.bbb.ccc", {
      status: "finished",
      date: "15-03-2025",
    });

    expect(result).toEqual(mockFixtureRound);
    expect(Fixture.getFixtureByStatus).toHaveBeenCalledWith("finished");
    expect(Fixture.getFixtureByDate).not.toHaveBeenCalled();
  });

  it("maps expired token errors to a 401 custom error", async () => {
    vi.mocked(verifyToken).mockRejectedValue(
      new TokenExpiredError("jwt expired", new Date(0)),
    );

    await expect(
      getFixtureData("Bearer aaa.bbb.ccc", { team: "boca" }),
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
      getFixtureData("Bearer aaa.bbb.ccc", { team: "boca" }),
    ).rejects.toMatchObject({
      status: 401,
      message: "Invalid token provided.",
      code: "INVALID_TOKEN",
    });
  });

  it("maps unknown token errors to a 401 custom error", async () => {
    vi.mocked(verifyToken).mockRejectedValue(new Error("Any other error"));

    await expect(
      getFixtureData("Bearer aaa.bbb.ccc", { team: "boca" }),
    ).rejects.toMatchObject({
      status: 401,
      message: "Token validation failed. Please obtain a new token.",
      code: "TOKEN_VALIDATION_FAILED",
    });
  });
});
