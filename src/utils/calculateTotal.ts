import calculatePartial from "./calculatePartial";
import calculateClasification from "./calculateClasification";
import generateFinalInfo from "./generateFinalInfo";
import type {
  TeamInfo,
  AverageInfo,
  CompleteAverageInfo,
  CompletePrediction,
} from "../types/teamPrediction";

export default function calculateTotal(
  annualTableData: TeamInfo[],
  currentTableData: TeamInfo[],
  averageData: AverageInfo[]
): CompletePrediction[] {
  const estimatedTeamInfo = calculatePartial(currentTableData);

  let lastOfAverage: CompleteAverageInfo | null = null;
  let minEstimatedAverage = Infinity;

  const finalData = annualTableData.map((team) => {
    const { name } = team;

    const foundTeamInTables = estimatedTeamInfo.find(
      (team) => team.name === name
    );

    const foundTeamAverage = averageData.find((team) => team.name === name);

    if (foundTeamInTables && foundTeamAverage) {
      const finalInfo = generateFinalInfo(
        team,
        foundTeamInTables,
        foundTeamAverage
      );

      if (finalInfo.estimatedAverage < minEstimatedAverage) {
        minEstimatedAverage = finalInfo.estimatedAverage;
        lastOfAverage = finalInfo;
      }

      return finalInfo;
    } else {
      throw new Error(`No se encontró el equipo ${name} en la tabla unificada`);
    }
  });

  return finalData
    .sort((a, b) => {
      if (a.estimatedTotalPoints === b.estimatedTotalPoints) {
        if (a.playedMatches === b.playedMatches) {
          return b.goalsDifference - a.goalsDifference;
        }
        return a.playedMatches - b.playedMatches;
      }
      return b.estimatedTotalPoints - a.estimatedTotalPoints;
    })
    .map((teamInfo, index) => {
      const position = index + 1;
      const isLastByAverage = teamInfo === lastOfAverage;

      return {
        position,
        classification: calculateClasification(position, isLastByAverage),
        ...teamInfo,
      };
    });
}
