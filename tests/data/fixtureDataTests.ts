import type { FixtureRound, FixtureRoundsResponse } from "@typos/fixture";

export const mockFixtureRound: FixtureRound = {
  roundName: "Fecha 2",
  days: [
    {
      date: "15-03-2025",
      label: "Sabado 15 de Marzo",
      matches: [
        {
          homeTeam: {
            name: "Boca Juniors",
            shortName: "BOC",
            img: "boca.png",
          },
          awayTeam: {
            name: "River Plate",
            shortName: "RIV",
            img: "river.png",
          },
          time: "18:00",
          displayTime: "18:00",
          status: "finished",
          homeScore: 2,
          awayScore: 1,
        },
      ],
    },
  ],
};

export const mockFixtureRounds: FixtureRoundsResponse = {
  currentRound: 2,
  rounds: [1, 2, 3],
};
