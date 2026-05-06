import type { TeamInfo, Group } from "@typos/teamPrediction";
import type { ActualTableData, ExternalData } from "@typos/api";

const transformTeamData = (
  externalTeamInfo: ExternalData[],
  group: Group
): TeamInfo[] => {
  return externalTeamInfo.map((team) => {
    const $name = team.entity.object.short_name;
    const $totalPoints = parseInt(team.values[3].value);
    const $playedMatches = parseInt(team.values[0].value);
    const $img = `https://api.promiedos.com.ar/images/team/${team.entity.object.id}/1`;
    const $goals = team.values[1].value;
    const $gamesWon = parseInt(team.values[4].value);
    const $gamesEven = parseInt(team.values[5].value);
    const $gamesLost = parseInt(team.values[6].value);

    const [goalsFor, goalsAgainst] = $goals.split(":");

    const liveData = team.live_data;

    const hasObservations = $name.at(-1) === "*";
    const name = hasObservations ? $name.slice(0, -1) : $name;

    return {
      name,
      group,
      totalPoints: $totalPoints,
      playedMatches: $playedMatches,
      goalsFor: Number(goalsFor),
      goalsAgainst: Number(goalsAgainst),
      gamesWon: $gamesWon,
      gamesEven: $gamesEven,
      gamesLost: $gamesLost,
      img: $img,
      ...(liveData && { liveData }),
    };
  });
};

export const extractActualData = (
  extractedData: ActualTableData
): TeamInfo[] => {
  const groupA = transformTeamData(extractedData.groupA, "A");
  const groupB = transformTeamData(extractedData.groupB, "B");

  return [...groupA, ...groupB];
};
