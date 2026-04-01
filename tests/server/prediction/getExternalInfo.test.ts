import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@shared/promiedos/client", () => ({
  fetchPageData: vi.fn(),
  PromiedosParseError: class PromiedosParseError extends Error {
    status = 502;
    code = "PROMIEDOS_UPSTREAM_PARSE";
  },
  PromiedosSchemaError: class PromiedosSchemaError extends Error {
    status = 502;
    code = "PROMIEDOS_UPSTREAM_SCHEMA";
  },
}));

import { getTableExternalInfo } from "@prediction/services/getExternalInfo";
import {
  fetchPageData,
  PromiedosParseError,
  PromiedosSchemaError,
} from "@shared/promiedos/client";

const tablesGroups = [
  {
    name: "Tabla Clausura",
    tables: [
      { name: "Zona A Clausura", table: { rows: [{ team: "A" }] } },
      { name: "Zona B Clausura", table: { rows: [{ team: "B" }] } },
    ],
  },
  {
    name: "Promedios",
    tables: [{ name: "Tabla de promedio", table: { rows: [{ team: "C" }] } }],
  },
  {
    name: "Anual",
    tables: [{ name: "Tabla anual", table: { rows: [{ team: "D" }] } }],
  },
];

describe("prediction getExternalInfo", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("reads tables_groups from the shared Promiedos client", async () => {
    vi.mocked(fetchPageData).mockResolvedValue({
      tables_groups: tablesGroups,
    } as any);

    const result = await getTableExternalInfo("https://promiedos.test/table");

    expect(fetchPageData).toHaveBeenCalledWith("https://promiedos.test/table");
    expect(result).toEqual({
      extractedActualTable: {
        groupA: [{ team: "A" }],
        groupB: [{ team: "B" }],
      },
      extractedAverages: [{ team: "C" }],
      extractedAnnualTable: [{ team: "D" }],
    });
  });

  it("rethrows upstream parse failures unchanged", async () => {
    const upstreamError = new PromiedosParseError("broken next data");
    vi.mocked(fetchPageData).mockRejectedValue(upstreamError);

    await expect(getTableExternalInfo("https://promiedos.test/table")).rejects.toBe(
      upstreamError,
    );
  });

  it("fails with schema error when tables_groups is invalid", async () => {
    vi.mocked(fetchPageData).mockResolvedValue({ tables_groups: null } as any);

    await expect(getTableExternalInfo("https://promiedos.test/table")).rejects.toBeInstanceOf(
      PromiedosSchemaError,
    );
  });
});
