import { describe, it, expect, beforeEach } from "vitest";
import { useResults } from "../../src/ui/state/results";
import type { CompleteTeamData } from "../../src/shared/types/teamPrediction";

const generateMockTeam = (
  name: string,
  nextSeasonAverage: number,
): CompleteTeamData => ({
  teamInfo: { name, img: "" },
  currentData: {
    group: "A",
    totalPoints: 20,
    annualPoints: 40,
    playedMatches: 10,
    goalsFor: 10,
    goalsAgainst: 10,
    gamesWon: 5,
    gamesEven: 5,
    gamesLost: 0,
  },
  nextSeasonData: { nextSeasonAverage },
  predictions: {
    position: 1,
    classification: "noClasificado",
    estimatedTotalPoints: 40,
    effectivityPercentage: 50,
    estimatedAverage: 1.2,
  },
});

describe("results state - next season ranking", () => {
  beforeEach(() => {
    useResults.getState().setResults([]);
  });

  it("orders teams by next season average from highest to lowest", () => {
    useResults
      .getState()
      .setResults([
        generateMockTeam("Belgrano", 1.1),
        generateMockTeam("River", 1.8),
        generateMockTeam("Instituto", 1.356),
      ]);

    const names = useResults
      .getState()
      .nextSeasonResults.map((team) => team.teamInfo.name);

    expect(names).toEqual(["River", "Instituto", "Belgrano"]);
  });

  it("breaks ties alphabetically by team name", () => {
    useResults
      .getState()
      .setResults([
        generateMockTeam("Talleres", 1.2),
        generateMockTeam("Banfield", 1.2),
      ]);

    const names = useResults
      .getState()
      .nextSeasonResults.map((team) => team.teamInfo.name);

    expect(names).toEqual(["Banfield", "Talleres"]);
  });

  it("does not mutate the prediction results order", () => {
    const teams = [
      generateMockTeam("Belgrano", 1.1),
      generateMockTeam("River", 1.8),
    ];

    useResults.getState().setResults(teams);

    const predictionNames = useResults
      .getState()
      .predictionResults.map((team) => team.teamInfo.name);

    expect(predictionNames).toEqual(["Belgrano", "River"]);
  });
});
