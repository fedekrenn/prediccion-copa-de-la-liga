import { beforeEach, describe, expect, it, vi } from "vitest";
import jwt from "jsonwebtoken";
const { JsonWebTokenError, TokenExpiredError } = jwt;

vi.mock("@auth/tokenService", () => ({
  verifyToken: vi.fn(),
  TokenRecordNotFoundError: class TokenRecordNotFoundError extends Error {},
}));

import { verifyToken, TokenRecordNotFoundError } from "@auth/tokenService";
import {
  createUnauthorizedError,
  requireProtectedQueryAuth,
} from "@usecases/auth/requireProtectedQueryAuth";
import {
  mapTokenVerificationError,
} from "@usecases/auth/tokenVerificationError";
import { ERROR_CODES } from "@shared/errors/errorCodes";

describe("tokenVerificationError mapper", () => {
  it("maps TokenExpiredError to TOKEN_EXPIRED", () => {
    const error = new TokenExpiredError("jwt expired", new Date(0));

    expect(mapTokenVerificationError(error)).toBe(ERROR_CODES.TOKEN_EXPIRED);
  });

  it("maps JsonWebTokenError to INVALID_TOKEN", () => {
    const error = new JsonWebTokenError("invalid signature");

    expect(mapTokenVerificationError(error)).toBe(ERROR_CODES.INVALID_TOKEN);
  });

  it("maps token record misses to INVALID_TOKEN", () => {
    const error = new TokenRecordNotFoundError("Token not found");

    expect(mapTokenVerificationError(error)).toBe(ERROR_CODES.INVALID_TOKEN);
  });

  it("maps unknown errors to TOKEN_VALIDATION_FAILED", () => {
    expect(mapTokenVerificationError(new Error("boom"))).toBe(
      ERROR_CODES.TOKEN_VALIDATION_FAILED,
    );
  });
});

describe("requireProtectedQueryAuth", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("allows access when bearer token is valid", async () => {
    vi.mocked(verifyToken).mockResolvedValue({ userId: "1" });

    await expect(
      requireProtectedQueryAuth("Bearer aaa.bbb.ccc"),
    ).resolves.toBeUndefined();

    expect(verifyToken).toHaveBeenCalledWith("aaa.bbb.ccc");
  });

  it("throws UNAUTHORIZED when header is missing", async () => {
    await expect(requireProtectedQueryAuth(null)).rejects.toMatchObject({
      status: 401,
      code: ERROR_CODES.UNAUTHORIZED,
    });

    expect(verifyToken).not.toHaveBeenCalled();
  });

  it("throws INVALID_TOKEN when verification fails with JsonWebTokenError", async () => {
    vi.mocked(verifyToken).mockRejectedValue(
      new JsonWebTokenError("invalid signature"),
    );

    await expect(
      requireProtectedQueryAuth("Bearer aaa.bbb.ccc"),
    ).rejects.toMatchObject({
      status: 401,
      code: ERROR_CODES.INVALID_TOKEN,
    });
  });

  it("throws TOKEN_EXPIRED when verification fails with TokenExpiredError", async () => {
    vi.mocked(verifyToken).mockRejectedValue(
      new TokenExpiredError("jwt expired", new Date(0)),
    );

    await expect(
      requireProtectedQueryAuth("Bearer aaa.bbb.ccc"),
    ).rejects.toMatchObject({
      status: 401,
      code: ERROR_CODES.TOKEN_EXPIRED,
    });
  });

  it("throws TOKEN_VALIDATION_FAILED on unknown verification errors", async () => {
    vi.mocked(verifyToken).mockRejectedValue(new Error("unexpected"));

    await expect(
      requireProtectedQueryAuth("Bearer aaa.bbb.ccc"),
    ).rejects.toMatchObject({
      status: 401,
      code: ERROR_CODES.TOKEN_VALIDATION_FAILED,
    });
  });

  it("uses a safe fallback message for unknown unauthorized codes", () => {
    const error = createUnauthorizedError(
      "UNKNOWN_AUTH_CODE" as unknown as typeof ERROR_CODES.UNAUTHORIZED,
    );

    expect(error).toMatchObject({
      status: 401,
      code: "UNKNOWN_AUTH_CODE",
      message: "Authentication failed",
    });
  });
});
