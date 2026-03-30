import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@fixture/services/main", () => ({
  FIXTURE_ROUND_NOT_FOUND_SENTINEL: "FIXTURE_ROUND_NOT_FOUND",
  getFixture: vi.fn(),
}));

import { Fixture } from "@fixture/Fixture";
import { getFixture } from "@fixture/services/main";
import { CustomError } from "@shared/errors/CustomError";

describe("Fixture class", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("throws 400 when round value is invalid", async () => {
    await expect(Fixture.getFixtureByRound("abc")).rejects.toMatchObject({
      message: "You must provide a valid round number",
      status: 400,
    });

    expect(getFixture).not.toHaveBeenCalled();
  });

  it("maps round-not-found sentinel to 404 custom error", async () => {
    vi.mocked(getFixture).mockRejectedValue(new Error("FIXTURE_ROUND_NOT_FOUND"));

    await expect(Fixture.getFixtureByRound("99")).rejects.toMatchObject({
      message: "Fixture round not found.",
      status: 404,
      statusText: "Not Found",
      code: "FIXTURE_ROUND_NOT_FOUND",
    });
  });

  it("rethrows unknown errors from services", async () => {
    const unknownError = new Error("Service failed");
    vi.mocked(getFixture).mockRejectedValue(unknownError);

    await expect(Fixture.getFixtureByRound("2")).rejects.toBe(unknownError);
  });

  it("keeps CustomError type for round-not-found", async () => {
    vi.mocked(getFixture).mockRejectedValue(new Error("FIXTURE_ROUND_NOT_FOUND"));

    await expect(Fixture.getFixtureByRound("2")).rejects.toBeInstanceOf(
      CustomError,
    );
  });
});
