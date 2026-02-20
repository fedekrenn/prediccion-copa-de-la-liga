import type {
  FixtureMatch,
  FixtureMatchStatus,
  FixtureDay,
  FixtureRound,
  FixtureTeam,
} from "@typos/fixture";

interface ExternalGameTeam {
  name: string;
  short_name: string;
  id: string;
}

interface ExternalGameStatus {
  enum: number;
  name: string;
}

interface ExternalGame {
  teams: ExternalGameTeam[];
  status: ExternalGameStatus;
  start_time: string;
  winner: number;
  score?: number[];
}

interface ExternalFilter {
  name: string;
  key: string;
  selected?: boolean;
  games?: ExternalGame[];
}

interface ExternalGames {
  filters: ExternalFilter[];
}

const DAY_NAMES: Record<number, string> = {
  0: "Dom",
  1: "Lun",
  2: "Mar",
  3: "Mié",
  4: "Jue",
  5: "Vie",
  6: "Sáb",
};

const mapStatus = (statusEnum: number): FixtureMatchStatus => {
  switch (statusEnum) {
    case 1:
      return "scheduled";
    case 2:
      return "live";
    case 3:
      return "finished";
    case 4:
      return "postponed";
    default:
      return "scheduled";
  }
};

const buildTeam = (team: ExternalGameTeam): FixtureTeam => ({
  name: team.name,
  shortName: team.short_name,
  img: `https://api.promiedos.com.ar/images/team/${team.id}/1`,
});

const formatDayLabel = (dateStr: string): string => {
  const [day, month, year] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const dayName = DAY_NAMES[date.getDay()];
  return `${dayName} ${day.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}`;
};

const buildMatch = (game: ExternalGame): FixtureMatch => {
  const time = game.start_time.split(" ")[1];
  const status = mapStatus(game.status.enum);

  const match: FixtureMatch = {
    homeTeam: buildTeam(game.teams[0]),
    awayTeam: buildTeam(game.teams[1]),
    time,
    status,
  };

  if (game.score && game.score.length === 2) {
    match.homeScore = game.score[0];
    match.awayScore = game.score[1];
  }

  return match;
};

export const extractFixtureData = (gamesData: ExternalGames): FixtureRound => {
  const selectedFilter = gamesData.filters.find((f) => f.selected);

  if (!selectedFilter || !selectedFilter.games) {
    throw new Error("No se encontró la fecha actual de partidos.");
  }

  const roundName = selectedFilter.name;
  const gamesByDate = new Map<string, ExternalGame[]>();

  for (const game of selectedFilter.games) {
    const date = game.start_time.split(" ")[0];

    if (!gamesByDate.has(date)) {
      gamesByDate.set(date, []);
    }

    gamesByDate.get(date)!.push(game);
  }

  const days: FixtureDay[] = Array.from(gamesByDate.entries()).map(
    ([date, games]) => ({
      date,
      label: formatDayLabel(date),
      matches: games.map(buildMatch),
    }),
  );

  return {
    roundName,
    days,
  };
};
