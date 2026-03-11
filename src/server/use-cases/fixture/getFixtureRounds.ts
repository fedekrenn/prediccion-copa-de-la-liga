import { getFixtureRounds } from "@server/fixture/services/main";

export const getFixtureRoundsData = async () => {
  return await getFixtureRounds();
};
