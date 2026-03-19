import { extractFixtureDataFromGames } from "./extractFixtureData";
import { getFixtureExternalInfo, getRoundsExternalInfo } from "./getExternalInfo";
import type { FixtureRound, FixtureRoundsResponse } from "@typos/fixture";

export const getFixture = async (round?: number): Promise<FixtureRound> => {
  const { games, roundName } = await getFixtureExternalInfo(round);
  return extractFixtureDataFromGames(games, roundName);
};

export const getFixtureRounds = async (): Promise<FixtureRoundsResponse> => {
  return getRoundsExternalInfo();
};
