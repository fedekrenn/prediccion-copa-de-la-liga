import { verifyToken } from "@auth/tokenService";
import { isValidBearerToken } from "@shared/auth/isValidBearerToken";
import { Fixture } from "@fixture/Fixture";
import { CustomError } from "@shared/errors/CustomError";

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
    const token = isValidBearerToken(authHeader);

    if (!token) {
      throw new CustomError(
        "You are not authorized to access this resource",
        401,
        "Unauthorized",
      );
    }

    try {
      const decodedToken = await verifyToken(token);

      if (!decodedToken) {
        throw new CustomError(
          "You are not authorized to access this resource",
          401,
          "Unauthorized",
        );
      }
    } catch (error: any) {
      if (error.message === "Token expired") {
        throw new CustomError(
          "Token has expired. Please obtain a new token.",
          401,
          "Unauthorized",
        );
      }
      if (error.message === "Invalid token") {
        throw new CustomError("Invalid token provided.", 401, "Unauthorized");
      }

      throw new CustomError(
        "Token validation failed. Please obtain a new token.",
        401,
        "Unauthorized",
      );
    }

    if (team) {
      return await Fixture.getFixtureByTeam(team);
    }

    if (status) {
      return await Fixture.getFixtureByStatus(status);
    }

    if (date) {
      return await Fixture.getFixtureByDate(date);
    }

    throw new CustomError("Invalid parameters", 400, "Bad Request");
  }

  return await Fixture.getFullFixture();
};
