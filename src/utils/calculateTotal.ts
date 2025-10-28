import { enhanceTeamData } from "./enhanceTeamData";
import { sortTeamsByPrediction } from "./sortTeamsByPrediction";
import { generateFinalInfo } from "./generateFinalInfo";
import type {
  TeamInfo,
  TeamAverageStats,
  TeamAnnualStats,
  CompleteTeamData,
} from "@typos/teamPrediction";

/**
 * Calculates the total team data by enhancing and sorting it by logic prediction.
 * @param actualTable - The actual table data to extract information from
 * @param averageTable - The average table data to extract information from
 * @param annualTable - The annual table data to extract information from
 * @returns An array of complete team data objects sorted by prediction
 */
export const calculateTotal = (
  actualTable: TeamInfo[],
  averageTable: TeamAverageStats[],
  annualTable: TeamAnnualStats[]
): CompleteTeamData[] => {
  const enrichedTeams = enhanceTeamData(actualTable, averageTable, annualTable);
  const orderedTeams = sortTeamsByPrediction(enrichedTeams);

  return generateFinalInfo(orderedTeams);
};
