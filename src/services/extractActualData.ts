import type { TeamInfo, Group } from "@typos/teamPrediction";
import type { ActualTableData, ExternalData } from "@typos/api";

/**
 * This function transforms external team data into the internal TeamInfo format.
 * @param externalTeamInfo - The external team data to transform
 * @param group - The group to assign to the team
 * @returns The transformed internal team data
 */
const transformTeamData = (
  externalTeamInfo: ExternalData[],
  group: Group
): TeamInfo[] => {
  return externalTeamInfo.map((team) => {
    const $name = team.entity.object.short_name;
    const $totalPoints = parseInt(team.values[3].value);
    const $playedMatches = parseInt(team.values[0].value);
    const $img = `https://api.promiedos.com.ar/images/team/${team.entity.object.id}/1`;
    const $goalsDifference = team.values[1].value;
    const $gamesWon = parseInt(team.values[4].value);
    const $gamesEven = parseInt(team.values[5].value);
    const $gamesLost = parseInt(team.values[6].value);

    const [goalsFor, goalsAgainst] = $goalsDifference.split(":");
    const goalsDifference = Number(goalsFor) - Number(goalsAgainst);

    const liveData = team.live_data;

    const hasObservations = $name.at(-1) === "*";
    const name = hasObservations ? $name.slice(0, -1) : $name;

    return {
      name,
      group,
      totalPoints: $totalPoints,
      playedMatches: $playedMatches,
      goalsDifference,
      gamesWon: $gamesWon,
      gamesEven: $gamesEven,
      gamesLost: $gamesLost,
      img: $img,
      ...(liveData && { liveData }),
    };
  });
};

/**
 * Extracts data from the actual table and transforms it into an array of TeamInfo objects.
 * @param extractedData - The actual table data to extract information from
 * @returns An array of TeamInfo objects representing the transformed data
 */
export const extractActualData = (
  extractedData: ActualTableData
): TeamInfo[] => {
  const groupA = transformTeamData(extractedData.groupA, "A");
  const groupB = transformTeamData(extractedData.groupB, "B");

  return [...groupA, ...groupB];
};
