import type { EntityDetails, ExternalData } from "@typos/api";

export const findCorrectTable = (
  tablesGroups: EntityDetails[],
  keyword: string
): ExternalData[] => {
  return (
    tablesGroups.find((table) =>
      table.tables[0].name.toLowerCase().includes(keyword)
    )?.tables[0].table.rows || []
  );
};
