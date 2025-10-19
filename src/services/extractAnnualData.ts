import type { TeamAnnualStats } from "@typos/teamPrediction";
import type { ExternalData } from "@typos/api";

/**
 * This function extracts annual data for each team from the provided external data.
 * @param extractedData - The external data to extract annual information from
 * @returns An array of TeamAnnualStats objects representing the annual data for each team
 */
export const extractAnnualData = (
  extractedData: ExternalData[]
): TeamAnnualStats[] => {
  return extractedData.map((team) => {
    const $name = team.entity.object.short_name;
    const $points = parseInt(
      team.values.find((val) => val.key === "Points")?.value ?? "0"
    );
    const $gamePlayed = parseInt(
      team.values.find((val) => val.key === "GamePlayed")?.value ?? "0"
    );

    return {
      name: $name,
      annualPoints: $points,
      yearGamePlayed: $gamePlayed,
    };
  });
};
