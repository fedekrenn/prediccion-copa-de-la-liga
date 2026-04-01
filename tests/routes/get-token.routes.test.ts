import { beforeEach, describe, expect, it, vi } from "vitest";

import { CustomError } from "@shared/errors/CustomError";

vi.mock("@usecases/auth/getToken", () => ({
  getToken: vi.fn(),
}));

import {
  OPTIONS as getTokenOptions,
  POST as getTokenPost,
} from "../../src/pages/api/get-token";
import { getToken } from "@usecases/auth/getToken";

const createRequest = (body: object): Request => {
  return new Request("http://localhost:4321/api/get-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};

describe("Get Token API route", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 200 for OPTIONS /api/get-token with CORS headers", async () => {
    const response = await getTokenOptions({} as any);

    expect(response.status).toBe(200);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
    expect(response.headers.get("Access-Control-Allow-Methods")).toContain(
      "POST",
    );
  });

  it("returns 400 when email is missing", async () => {
    const response = await getTokenPost({
      request: createRequest({ password: "secret123" }),
    } as any);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      error: "Email and password are required",
      code: "INVALID_PARAMETERS",
    });
    expect(getToken).not.toHaveBeenCalled();
  });

  it("returns 400 when password is missing", async () => {
    const response = await getTokenPost({
      request: createRequest({ email: "test@example.com" }),
    } as any);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      error: "Email and password are required",
      code: "INVALID_PARAMETERS",
    });
    expect(getToken).not.toHaveBeenCalled();
  });

  it("returns 400 when body is empty", async () => {
    const response = await getTokenPost({
      request: createRequest({}),
    } as any);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      error: "Email and password are required",
      code: "INVALID_PARAMETERS",
    });
    expect(getToken).not.toHaveBeenCalled();
  });

  it("returns 200 with token on successful authentication", async () => {
    const mockToken = {
      token: "jwt.token.here",
      expiration_date: new Date("2026-04-26T00:00:00Z"),
      status: "new_token_created",
    };

    vi.mocked(getToken).mockResolvedValue(mockToken);

    const response = await getTokenPost({
      request: createRequest({
        email: "test@example.com",
        password: "secret123",
      }),
    } as any);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      ...mockToken,
      expiration_date: mockToken.expiration_date.toISOString(),
    });
    expect(getToken).toHaveBeenCalledWith("test@example.com", "secret123");
  });

  it("returns 404 when user not found (CustomError)", async () => {
    vi.mocked(getToken).mockRejectedValue(
      new CustomError("User not found", 404, "Not Found"),
    );

    const response = await getTokenPost({
      request: createRequest({
        email: "notfound@example.com",
        password: "secret123",
      }),
    } as any);

    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({
      error: "User not found",
    });
  });

  it("returns 401 when password is invalid (CustomError)", async () => {
    vi.mocked(getToken).mockRejectedValue(
      new CustomError("Invalid password", 401, "Unauthorized"),
    );

    const response = await getTokenPost({
      request: createRequest({
        email: "test@example.com",
        password: "wrongpassword",
      }),
    } as any);

    expect(response.status).toBe(401);
    expect(await response.json()).toEqual({
      error: "Invalid password",
    });
  });

  it("returns error code when CustomError includes code", async () => {
    vi.mocked(getToken).mockRejectedValue(
      new CustomError("User not found", 404, "Not Found", "USER_NOT_FOUND"),
    );

    const response = await getTokenPost({
      request: createRequest({
        email: "notfound@example.com",
        password: "secret123",
      }),
    } as any);

    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({
      error: "User not found",
      code: "USER_NOT_FOUND",
    });
  });

  it("returns 400 when email format is invalid (CustomError from validation)", async () => {
    vi.mocked(getToken).mockRejectedValue(
      new CustomError("Invalid email format", 400, "Bad Request"),
    );

    const response = await getTokenPost({
      request: createRequest({
        email: "invalid-email",
        password: "secret123",
      }),
    } as any);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      error: "Invalid email format",
    });
  });

  it("returns 500 when use case throws unexpected Error", async () => {
    vi.mocked(getToken).mockRejectedValue(new Error("Database connection failed"));

    const response = await getTokenPost({
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
    vi.mocked(getToken).mockRejectedValue(
      new CustomError("User not found", 404, "Not Found"),
    );

    const response = await getTokenPost({
      request: createRequest({
        email: "notfound@example.com",
        password: "secret123",
      }),
    } as any);

    expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
  });
});
