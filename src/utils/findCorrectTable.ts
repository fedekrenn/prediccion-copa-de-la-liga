import type { ApiResponse, ExternalData } from "@typos/api";

export const findCorrectTable = (
  tablesGroups: ApiResponse[],
  keyword: string
): ExternalData[] => {
  return (
    tablesGroups.find((table) =>
      table.tables[0].name.toLowerCase().includes(keyword)
    )?.tables[0].table.rows || []
  );
};
