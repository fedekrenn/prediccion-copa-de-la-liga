import type { ApiResponse, ExternalData, ActualTableData } from "@typos/api";

/**
 * This function finds and returns the average table from the provided tables groups.
 * @param tablesGroups - An array of ApiResponse objects containing table groups
 * @returns An array of ExternalData objects representing the average table
 */
export const findAverageTable = (
  tablesGroups: ApiResponse[]
): ExternalData[] => {
  return (
    tablesGroups.find((table) =>
      table.tables[0].name.toLowerCase().includes("promedio")
    )?.tables[0].table.rows || []
  );
};

/**
 * This function finds and returns the annual table from the provided tables groups.
 * @param tablesGroups - An array of ApiResponse objects containing table groups
 * @returns An array of ExternalData objects representing the annual table
 */
export const findAnnualTable = (
  tablesGroups: ApiResponse[]
): ExternalData[] => {
  return (
    tablesGroups.find((table) =>
      table.tables[0].name.toLowerCase().includes("anual")
    )?.tables[0].table.rows || []
  );
};

/**
 * This function finds and returns the actual table for a given keyword from the provided tables groups.
 * @param tablesGroups - An array of ApiResponse objects containing table groups
 * @param keyword - The keyword to search for in the table names
 * @returns An object containing the rows of the actual table for the specified keyword
 */
export const findActualTable = (
  tablesGroups: ApiResponse[],
  keyword: string
): ActualTableData => {
  const matchingTable = tablesGroups.find((table) =>
    table.name.toLowerCase().includes(keyword)
  );

  if (!matchingTable) {
    throw new Error(
      `No se encontró una tabla que contenga la palabra "${keyword}".`
    );
  }

  const [groupA, groupB] = matchingTable.tables;

  return {
    groupA: groupA.table.rows,
    groupB: groupB.table.rows,
  };
};
