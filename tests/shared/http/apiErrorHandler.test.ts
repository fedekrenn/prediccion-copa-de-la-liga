import { describe, expect, it } from "vitest";

import { PromiedosParseError, PromiedosSchemaError, PromiedosUnavailableError } from "@shared/promiedos/client";
import { handleApiError } from "@shared/http/apiErrorHandler";

describe("apiErrorHandler", () => {
  it("serializes typed upstream parse errors as 502", async () => {
    const response = handleApiError(new PromiedosParseError("Broken upstream HTML"));

    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toEqual({
      error: "Broken upstream HTML",
      code: "PROMIEDOS_UPSTREAM_PARSE",
    });
  });

  it("serializes typed upstream schema errors as 502", async () => {
    const response = handleApiError(new PromiedosSchemaError("Unexpected upstream payload"));

    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toEqual({
      error: "Unexpected upstream payload",
      code: "PROMIEDOS_UPSTREAM_SCHEMA",
    });
  });

  it("serializes typed upstream unavailable errors as 503", async () => {
    const response = handleApiError(new PromiedosUnavailableError("Promiedos unavailable"));

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      error: "Promiedos unavailable",
      code: "PROMIEDOS_UPSTREAM_UNAVAILABLE",
    });
  });

  it("keeps unknown errors mapped to 500", async () => {
    const response = handleApiError(new Error("boom"));

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: "Internal server error",
    });
  });
});
