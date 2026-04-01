import { Fixture } from "@fixture/Fixture";
import { CustomError } from "@shared/errors/CustomError";
import { ERROR_CODES } from "@shared/errors/errorCodes";
import { requireProtectedQueryAuth } from "@usecases/auth/requireProtectedQueryAuth";

interface FixtureParams {
  round?: string;
  team?: string;
  status?: string;
  date?: string;
}

export const getFixtureData = async (
  authHeader: string | null,
  params: FixtureParams,
) => {
  const { round, team, status, date } = params;

  if (round !== undefined) {
    return await Fixture.getFixtureByRound(round);
  }

  const hasParams = [team, status, date].some(
    (param) => param !== undefined,
  );

  if (hasParams) {
    await requireProtectedQueryAuth(authHeader);

    if (team) {
      return await Fixture.getFixtureByTeam(team);
    }

    if (status) {
      return await Fixture.getFixtureByStatus(status);
    }

    if (date) {
      return await Fixture.getFixtureByDate(date);
    }

    throw new CustomError(
      "Invalid parameters",
      400,
      "Bad Request",
      ERROR_CODES.INVALID_PARAMETERS,
    );
  }

  return await Fixture.getFullFixture();
};
