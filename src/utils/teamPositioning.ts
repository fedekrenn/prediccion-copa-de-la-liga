import type {
  TeamInfo,
  TeamPredictionCalculations,
  TeamEffectivityCalculations,
  TABLE_POSITIONS,
  RelegationAnalysis,
  TeamPositionInfo,
} from "@typos/teamPrediction";

export const determineClassification = (
  position: number,
  isTeamRelegatedByAverages: boolean,
  isLastByTable: boolean
): TABLE_POSITIONS => {
  if (isTeamRelegatedByAverages) return "descensoPromedios";
  if (isLastByTable) return "descensoPorTabla";

  const positionClassification: Record<number, TABLE_POSITIONS> = {
    1: "libertadores",
    2: "libertadores",
    3: "libertadores",
    4: "sudamericana",
    5: "sudamericana",
    6: "sudamericana",
    7: "sudamericana",
    8: "sudamericana",
    9: "sudamericana",
    30: "descensoPorTabla",
  };

  return positionClassification[position] ?? "noClasificado";
};

export const analyzeRelegationPositions = (
  table: (TeamInfo & TeamPredictionCalculations)[]
): RelegationAnalysis => {
  let lowestAverage = Infinity;
  let lastOfAverage: (TeamInfo & TeamEffectivityCalculations) | null = null;

  // Find team with lowest average
  for (const team of table) {
    if (team.estimatedAverage < lowestAverage) {
      lowestAverage = team.estimatedAverage;
      lastOfAverage = team;
    }
  }

  let lastTablePosition = table.length;

  /* 
  If the last in the table is the same as the last in the averages, the
  one immediately above in the previous position will move down the table.
  */
  if (table.at(-1) === lastOfAverage) {
    lastTablePosition--;
  }

  return {
    lastOfAverage,
    lastTablePosition,
  };
};

export const calculateTeamPositioning = (
  sortedTeams: (TeamInfo & TeamPredictionCalculations)[]
): TeamPositionInfo[] => {
  const { lastOfAverage, lastTablePosition } =
    analyzeRelegationPositions(sortedTeams);

  return sortedTeams.map((team, index) => {
    const position = index + 1;
    const isLastByAverage = team === lastOfAverage;
    const isLastByTable = position === lastTablePosition;

    const classification = determineClassification(
      position,
      isLastByAverage,
      isLastByTable
    );

    return {
      position,
      classification,
    };
  });
};
