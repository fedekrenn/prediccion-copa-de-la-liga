import { beforeEach, describe, expect, it, vi } from "vitest";

import { CustomError } from "@shared/errors/CustomError";

vi.mock("@usecases/auth/revokeToken", () => ({
  revokeToken: vi.fn(),
}));

vi.mock("@shared/http/rateLimit", () => ({
  enforceAuthRateLimit: vi.fn(),
}));

import {
  OPTIONS as revokeTokenOptions,
  POST as revokeTokenPost,
} from "../../src/pages/api/revoke-token";
import { revokeToken } from "@usecases/auth/revokeToken";
import { enforceAuthRateLimit } from "@shared/http/rateLimit";

const createRequest = (body: object): Request => {
  return new Request("http://localhost:4321/api/revoke-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};

describe("Revoke Token API route", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(enforceAuthRateLimit).mockResolvedValue(undefined);
  });

  it("returns 200 for OPTIONS /api/revoke-token with CORS headers", async () => {
    const response = await revokeTokenOptions({} as any);

    expect(response.status).toBe(200);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
    expect(response.headers.get("Access-Control-Allow-Methods")).toContain(
      "POST",
    );
  });

  it("returns 400 when email is missing", async () => {
    const response = await revokeTokenPost({
      request: createRequest({ password: "secret123" }),
    } as any);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      error: "Email and password are required",
      code: "INVALID_PARAMETERS",
    });
    expect(revokeToken).not.toHaveBeenCalled();
  });

  it("returns 400 when password is missing", async () => {
    const response = await revokeTokenPost({
      request: createRequest({ email: "test@example.com" }),
    } as any);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      error: "Email and password are required",
      code: "INVALID_PARAMETERS",
    });
    expect(revokeToken).not.toHaveBeenCalled();
  });

  it("returns 400 when body is empty", async () => {
    const response = await revokeTokenPost({
      request: createRequest({}),
    } as any);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      error: "Email and password are required",
      code: "INVALID_PARAMETERS",
    });
    expect(revokeToken).not.toHaveBeenCalled();
  });

  it("returns 200 with success message when token is revoked", async () => {
    vi.mocked(revokeToken).mockResolvedValue(undefined);

    const response = await revokeTokenPost({
      request: createRequest({
        email: "test@example.com",
        password: "secret123",
      }),
    } as any);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ success: "Token was deleted" });
    expect(revokeToken).toHaveBeenCalledWith("test@example.com", "secret123");
  });

  it("returns 400 when credentials format is invalid (CustomError from validation)", async () => {
    vi.mocked(revokeToken).mockRejectedValue(
      new CustomError(
        "Invalid email format",
        400,
        "Bad Request",
        "INVALID_CREDENTIALS_FORMAT",
      ),
    );

    const response = await revokeTokenPost({
      request: createRequest({
        email: "invalid-email",
        password: "secret123",
      }),
    } as any);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      error: "Invalid email format",
      code: "INVALID_CREDENTIALS_FORMAT",
    });
  });

  it("returns 401 when email or password is invalid (CustomError)", async () => {
    vi.mocked(revokeToken).mockRejectedValue(
      new CustomError(
        "Invalid email or password",
        401,
        "Unauthorized",
        "INVALID_CREDENTIALS",
      ),
    );

    const response = await revokeTokenPost({
      request: createRequest({
        email: "test@example.com",
        password: "wrongpassword",
      }),
    } as any);

    expect(response.status).toBe(401);
    expect(await response.json()).toEqual({
      error: "Invalid email or password",
      code: "INVALID_CREDENTIALS",
    });
  });

  it("returns 404 when token is not found (CustomError)", async () => {
    vi.mocked(revokeToken).mockRejectedValue(
      new CustomError("Token not found", 404, "Not Found", "TOKEN_NOT_FOUND"),
    );

    const response = await revokeTokenPost({
      request: createRequest({
        email: "test@example.com",
        password: "secret123",
      }),
    } as any);

    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({
      error: "Token not found",
      code: "TOKEN_NOT_FOUND",
    });
  });

  it("returns 500 when use case throws unexpected Error", async () => {
    vi.mocked(revokeToken).mockRejectedValue(new Error("Database connection failed"));

    const response = await revokeTokenPost({
      request: createRequest({
        email: "test@example.com",
        password: "secret123",
      }),
    } as any);

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({
      error: "Internal server error",
    });
  });

  it("includes CORS headers in error responses", async () => {
    vi.mocked(revokeToken).mockRejectedValue(
      new CustomError("Token not found", 404, "Not Found", "TOKEN_NOT_FOUND"),
    );

    const response = await revokeTokenPost({
      request: createRequest({
        email: "test@example.com",
        password: "secret123",
      }),
    } as any);

    expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
  });
});
