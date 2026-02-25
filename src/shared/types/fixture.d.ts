export interface FixtureTeam {
  name: string;
  shortName: string;
  img: string;
}

export interface FixtureMatch {
  homeTeam: FixtureTeam;
  awayTeam: FixtureTeam;
  time: string;
  displayTime: string;
  status: FixtureMatchStatus;
  homeScore?: number;
  awayScore?: number;
}

export type FixtureMatchStatus =
  | "scheduled"
  | "live"
  | "finished"
  | "postponed";

export interface FixtureDay {
  date: string;
  label: string;
  matches: FixtureMatch[];
}

export interface FixtureRound {
  roundName: string;
  days: FixtureDay[];
}
