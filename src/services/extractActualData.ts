import type { TeamInfo } from "@typos/teamPrediction";
import type { ExternalData } from "@typos/api";

export const extractActualData = (
  extractedData: ExternalData[]
): TeamInfo[] => {
  return extractedData.map((team) => {
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
