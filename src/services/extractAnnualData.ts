import type { TeamAnnualStats } from "@typos/teamPrediction";
import type { ExternalData } from "@typos/api";

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
