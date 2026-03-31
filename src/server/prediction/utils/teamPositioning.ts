import type {
  TeamInfo,
  TeamInfoWithPredictionCalculationsList,
  TeamEffectivityCalculations,
  TABLE_POSITIONS,
  RelegationAnalysis,
  TeamPositionInfo,
} from "@typos/teamPrediction";
import {
  positionClassification as configPositionMap,
  type ClassificationKey,
} from "@config/seasonRules";

const classificationKeyToTablePosition: Record<ClassificationKey, TABLE_POSITIONS> = {
  libertadores: "libertadores",
  sudamericana: "sudamericana",
  neutral: "noClasificado",
  descensoPorTabla: "descensoPorTabla",
};

export const determineClassification = (
  position: number,
  isTeamRelegatedByAverages: boolean,
  isLastByTable: boolean
): TABLE_POSITIONS => {
  if (isTeamRelegatedByAverages) return "descensoPromedios";
  if (isLastByTable) return "descensoPorTabla";

  const configKey = configPositionMap[position];
  if (configKey) {
    return classificationKeyToTablePosition[configKey];
  }

  return "noClasificado";
};

export const analyzeRelegationPositions = (
  table: TeamInfoWithPredictionCalculationsList
): RelegationAnalysis => {
  let lowestAverage = Infinity;
  let lastOfAverage: (TeamInfo & TeamEffectivityCalculations) | null = null;

  for (const team of table) {
    if (team.estimatedAverage < lowestAverage) {
      lowestAverage = team.estimatedAverage;
      lastOfAverage = team;
    }
  }

  let lastTablePosition = table.length;

  if (table.at(-1) === lastOfAverage) {
    lastTablePosition--;
  }

  return {
    lastOfAverage,
    lastTablePosition,
  };
};

export const calculateTeamPositioning = (
  sortedTeams: TeamInfoWithPredictionCalculationsList
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
