import { getFixture } from "@fixture/services/main";
import { CustomError } from "@shared/errors/CustomError";
import type {
  FixtureMatch,
  FixtureMatchStatus,
  FixtureRound,
} from "@typos/fixture";

const VALID_STATUSES: FixtureMatchStatus[] = [
  "scheduled",
  "live",
  "finished",
  "postponed",
];

export class Fixture {
  static async getFullFixture(): Promise<FixtureRound> {
    return getFixture();
  }

  static async getFixtureByRound(round: string): Promise<FixtureRound> {
    const roundNumber = Number(round);

    if (!Number.isInteger(roundNumber) || roundNumber <= 0) {
      throw new CustomError(
        "You must provide a valid round number",
        400,
        "Bad Request",
      );
    }

    return getFixture(roundNumber);
  }

  static async getFixtureByTeam(teamName: string): Promise<FixtureRound> {
    const fixture = await getFixture();

    const filteredDays = fixture.days
      .map((day) => ({
        ...day,
        matches: day.matches.filter((match) =>
          Fixture.matchContainsTeam(match, teamName),
        ),
      }))
      .filter((day) => day.matches.length > 0);

    if (filteredDays.length === 0) {
      throw new CustomError(
        `You must provide a valid team name`,
        400,
        "Bad Request",
      );
    }

    return { ...fixture, days: filteredDays };
  }

  static async getFixtureByStatus(status: string): Promise<FixtureRound> {
    if (!VALID_STATUSES.includes(status as FixtureMatchStatus)) {
      throw new CustomError(
        `You must provide a valid status: ${VALID_STATUSES.join(", ")}`,
        400,
        "Bad Request",
      );
    }

    const fixture = await getFixture();

    const filteredDays = fixture.days
      .map((day) => ({
        ...day,
        matches: day.matches.filter((match) => match.status === status),
      }))
      .filter((day) => day.matches.length > 0);

    if (filteredDays.length === 0) {
      throw new CustomError(
        `No matches found with status '${status}'`,
        400,
        "Bad Request",
      );
    }

    return { ...fixture, days: filteredDays };
  }

  static async getFixtureByDate(date: string): Promise<FixtureRound> {
    const fixture = await getFixture();

    const filteredDays = fixture.days.filter((day) => day.date === date);

    if (filteredDays.length === 0) {
      throw new CustomError(
        "No matches found on the provided date",
        400,
        "Bad Request",
      );
    }

    return { ...fixture, days: filteredDays };
  }

  private static matchContainsTeam(
    match: FixtureMatch,
    teamName: string,
  ): boolean {
    const normalizedTeamName = teamName.toLowerCase();

    return (
      match.homeTeam.name.toLowerCase().includes(normalizedTeamName) ||
      match.homeTeam.shortName.toLowerCase().includes(normalizedTeamName) ||
      match.awayTeam.name.toLowerCase().includes(normalizedTeamName) ||
      match.awayTeam.shortName.toLowerCase().includes(normalizedTeamName)
    );
  }
}
