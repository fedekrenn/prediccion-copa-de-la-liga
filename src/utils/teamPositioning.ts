import type {
  TeamInfo,
  TeamPredictionCalculations,
  TeamEffectivityCalculations,
  TABLE_POSITIONS,
  RelegationAnalysis,
  TeamPositionInfo,
} from "@typos/teamPrediction";

/**
 * Determine the classification of a team based on its position and other factors.
 * @param position The current position of the team.
 * @param isTeamRelegatedByAverages Whether the team is relegated by averages.
 * @param isLastByTable Whether the team is last by table.
 * @returns The classification of the team.
 */
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

/**
 * Analyzes the relegation positions in the table.
 * @param table The table of teams with their prediction calculations.
 * @returns The analysis of relegation positions.
 */
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

/**
 * Calculates the positioning of teams based on their performance.
 * @param sortedTeams The sorted list of teams with their prediction calculations.
 * @returns The positioning information for each team.
 */
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
