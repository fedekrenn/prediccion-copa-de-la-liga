import { enhanceTeamData } from "./enhanceTeamData";
import { sortTeamsByPrediction } from "./sortTeamsByPrediction";
import { generateFinalInfo } from "./generateFinalInfo";
import type {
  TeamInfo,
  TeamAverageStats,
  TeamAnnualStats,
  CompleteTeamData,
} from "@typos/teamPrediction";

export const calculateTotal = (
  actualTable: TeamInfo[],
  averageTable: TeamAverageStats[],
  annualTable: TeamAnnualStats[]
): CompleteTeamData[] => {
  const enrichedTeams = enhanceTeamData(actualTable, averageTable, annualTable);
  const orderedTeams = sortTeamsByPrediction(enrichedTeams);

  return generateFinalInfo(orderedTeams);
};
