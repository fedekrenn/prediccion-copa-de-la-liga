import type { ApiResponse, ExternalData, ActualTableData } from "@typos/api";

export const findAverageTable = (
  tablesGroups: ApiResponse[],
): ExternalData[] => {
  const matchingTable = tablesGroups.find((table) =>
    table.tables?.[0]?.name?.toLowerCase().includes("promedio"),
  );

  return matchingTable?.tables[0]?.table?.rows || [];
};

export const findAnnualTable = (
  tablesGroups: ApiResponse[],
): ExternalData[] => {
  const matchingTable = tablesGroups.find((table) =>
    table.tables?.[0]?.name?.toLowerCase().includes("anual"),
  );

  return matchingTable?.tables[0]?.table?.rows || [];
};

export const findActualTable = (
  tablesGroups: ApiResponse[],
): ActualTableData => {
  const matchingTable =
    // Preferir búsqueda explícita por nombre del torneo
    tablesGroups.find((tableGroup) =>
      tableGroup.tables.some((subTable) =>
        subTable.name.toLowerCase().includes("clausura"),
      ),
    ) ??
    // Fallback a heurística estructural para evitar regresiones
    tablesGroups.find((tableGroup) => tableGroup.tables.length >= 2);

  if (!matchingTable)
    throw new Error("No se encontró la tabla del torneo actual (con zonas).");

  const [groupA, groupB] = matchingTable.tables;

  return {
    groupA: groupA.table.rows,
    groupB: groupB.table.rows,
  };
};
