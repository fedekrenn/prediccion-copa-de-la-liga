import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  fetchGamesByFilterKey,
  fetchPageData,
  PromiedosParseError,
  PromiedosSchemaError,
  PromiedosUnavailableError,
} from "@shared/promiedos/client";

const createHtml = (data: unknown): string => `
  <html>
    <body>
      <script id="__NEXT_DATA__" type="application/json">${JSON.stringify({
        props: { pageProps: { data } },
      })}</script>
    </body>
  </html>
`;

describe("Promiedos client", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.stubGlobal("fetch", vi.fn());
  });

  it("fails with a parse error when __NEXT_DATA__ is missing", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response("<html><body>sin script</body></html>", { status: 200 }),
    );

    const error = await fetchPageData("https://promiedos.test/league").catch(
      (error) => error,
    );

    expect(error).toBeInstanceOf(PromiedosParseError);
    expect(error).toMatchObject({
      code: "PROMIEDOS_UPSTREAM_PARSE",
      status: 502,
    });
  });

  it("fails with a parse error when __NEXT_DATA__ JSON is invalid", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(
        '<script id="__NEXT_DATA__" type="application/json">{"broken":</script>',
        { status: 200 },
      ),
    );

    const error = await fetchPageData("https://promiedos.test/league").catch(
      (error) => error,
    );

    expect(error).toBeInstanceOf(PromiedosParseError);
    expect(error).toMatchObject({
      code: "PROMIEDOS_UPSTREAM_PARSE",
      status: 502,
    });
  });

  it("fails with a schema error when pageProps.data is invalid", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(createHtml(null), { status: 200 }),
    );

    const error = await fetchPageData("https://promiedos.test/league").catch(
      (error) => error,
    );

    expect(error).toBeInstanceOf(PromiedosSchemaError);
    expect(error).toMatchObject({
      code: "PROMIEDOS_UPSTREAM_SCHEMA",
      status: 502,
    });
  });

  it("fails with an unavailable error when page fetch rejects", async () => {
    vi.mocked(fetch).mockRejectedValue(new Error("socket hang up"));

    const error = await fetchPageData("https://promiedos.test/league").catch(
      (error) => error,
    );

    expect(error).toBeInstanceOf(PromiedosUnavailableError);
    expect(error).toMatchObject({
      code: "PROMIEDOS_UPSTREAM_UNAVAILABLE",
      status: 503,
    });
  });

  it("fails with a parse error when games endpoint returns 200 non-JSON", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response("not-json", {
        status: 200,
        headers: { "Content-Type": "text/plain" },
      }),
    );

    const error = await fetchGamesByFilterKey("123", "123_2024_1_5").catch(
      (error) => error,
    );

    expect(error).toBeInstanceOf(PromiedosParseError);
    expect(error).toMatchObject({
      code: "PROMIEDOS_UPSTREAM_PARSE",
      status: 502,
    });
  });
});
