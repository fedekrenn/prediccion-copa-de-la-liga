import type { ApiResponse, ExternalData } from "@typos/api";

export const findAverageTable = (
  tablesGroups: ApiResponse[]
): ExternalData[] => {
  return (
    tablesGroups.find((table) =>
      table.tables[0].name.toLowerCase().includes("promedio")
    )?.tables[0].table.rows || []
  );
};

export const findActualTable = (
  tablesGroups: ApiResponse[],
  keyword: string
): ExternalData[] => {
  const matchingTable = tablesGroups.find((table) =>
    table.name.toLowerCase().includes(keyword)
  );

  const [groupA, groupB] = matchingTable?.tables || [];

  return [...groupA.table.rows, ...groupB.table.rows];
};
