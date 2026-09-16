import { beforeEach, describe, expect, it, vi } from "vitest";

import { CustomError } from "@shared/errors/CustomError";

vi.mock("@usecases/auth/register", () => ({
  register: vi.fn(),
}));

vi.mock("@shared/http/rateLimit", () => ({
  enforceAuthRateLimit: vi.fn(),
}));

import {
  OPTIONS as registerOptions,
  POST as registerPost,
} from "../../src/pages/api/register";
import { register } from "@usecases/auth/register";
import { enforceAuthRateLimit } from "@shared/http/rateLimit";

const createRequest = (body: object): Request => {
  return new Request("http://localhost:4321/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};

describe("Register API route", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(enforceAuthRateLimit).mockResolvedValue(undefined);
  });

  it("returns 200 for OPTIONS /api/register with CORS headers", async () => {
    const response = await registerOptions({} as any);

    expect(response.status).toBe(200);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
    expect(response.headers.get("Access-Control-Allow-Methods")).toContain(
      "POST",
    );
  });

  it("returns 400 when email is missing", async () => {
    const response = await registerPost({
      request: createRequest({ password: "secret123" }),
    } as any);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      error: "Email and password are required",
      code: "INVALID_PARAMETERS",
    });
    expect(register).not.toHaveBeenCalled();
  });

  it("returns 400 when password is missing", async () => {
    const response = await registerPost({
      request: createRequest({ email: "test@example.com" }),
    } as any);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      error: "Email and password are required",
      code: "INVALID_PARAMETERS",
    });
    expect(register).not.toHaveBeenCalled();
  });

  it("returns 400 when body is empty", async () => {
    const response = await registerPost({
      request: createRequest({}),
    } as any);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      error: "Email and password are required",
      code: "INVALID_PARAMETERS",
    });
    expect(register).not.toHaveBeenCalled();
  });

  it("returns 201 with the created user on successful registration", async () => {
    const mockUser = {
      id: "user-1",
      email: "test@example.com",
      token: "jwt.token.here",
      expiration_date: new Date("2026-04-26T00:00:00Z"),
    };

    vi.mocked(register).mockResolvedValue(mockUser);

    const response = await registerPost({
      request: createRequest({
        email: "test@example.com",
        password: "secret123",
      }),
    } as any);

    expect(response.status).toBe(201);
    expect(await response.json()).toEqual({
      ...mockUser,
      expiration_date: mockUser.expiration_date.toISOString(),
    });
    expect(register).toHaveBeenCalledWith("test@example.com", "secret123");
  });

  it("returns 400 when credentials format is invalid (CustomError from validation)", async () => {
    vi.mocked(register).mockRejectedValue(
      new CustomError(
        "Invalid email format",
        400,
        "Bad Request",
        "INVALID_CREDENTIALS_FORMAT",
      ),
    );

    const response = await registerPost({
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

  it("returns 400 when user already exists (CustomError)", async () => {
    vi.mocked(register).mockRejectedValue(
      new CustomError(
        "User already exists",
        400,
        "Bad Request",
        "USER_ALREADY_EXISTS",
      ),
    );

    const response = await registerPost({
      request: createRequest({
        email: "existing@example.com",
        password: "secret123",
      }),
    } as any);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      error: "User already exists",
      code: "USER_ALREADY_EXISTS",
    });
  });

  it("returns 500 when use case throws unexpected Error", async () => {
    vi.mocked(register).mockRejectedValue(new Error("Database connection failed"));

    const response = await registerPost({
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
    vi.mocked(register).mockRejectedValue(
      new CustomError(
        "User already exists",
        400,
        "Bad Request",
        "USER_ALREADY_EXISTS",
      ),
    );

    const response = await registerPost({
      request: createRequest({
        email: "existing@example.com",
        password: "secret123",
      }),
    } as any);

    expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
  });
});
