import { describe, expect, it } from "vitest";

import {
  findActualTable,
  findAnnualTable,
  findAverageTable,
} from "../../src/server/prediction/utils/findCorrectTable";

describe("findCorrectTable utils", () => {
  it("returns an empty array when average table name is undefined", () => {
    const tablesGroups = [
      {
        name: "Tablas",
        tables: [
          {
            name: undefined,
            table: { rows: [] },
          },
        ],
      },
    ] as any;

    expect(findAverageTable(tablesGroups)).toEqual([]);
  });

  it("returns an empty array when annual table name is undefined", () => {
    const tablesGroups = [
      {
        name: "Tablas",
        tables: [
          {
            name: undefined,
            table: { rows: [] },
          },
        ],
      },
    ] as any;

    expect(findAnnualTable(tablesGroups)).toEqual([]);
  });

  it("falls back to the first table group with two zones when subtable name is undefined", () => {
    const groupARows = [{ num: 1 }];
    const groupBRows = [{ num: 2 }];
    const tablesGroups = [
      {
        name: "Torneo actual",
        tables: [
          {
            name: undefined,
            table: { rows: groupARows },
          },
          {
            name: "Zona B",
            table: { rows: groupBRows },
          },
        ],
      },
    ] as any;

    expect(findActualTable(tablesGroups)).toEqual({
      groupA: groupARows,
      groupB: groupBRows,
    });
  });
});
