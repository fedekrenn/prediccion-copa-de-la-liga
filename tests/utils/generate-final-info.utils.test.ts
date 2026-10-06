import { describe, it, expect } from "vitest";
import { generateFinalInfo } from "../../src/server/prediction/utils/generateFinalInfo";
import type { TeamInfoWithPredictionCalculationsList } from "../../src/shared/types/teamPrediction";
import { averagePredictionTest } from "../data/averageDataTests";

const sortedTeams: TeamInfoWithPredictionCalculationsList = [
  { ...averagePredictionTest, name: "Instituto", nextSeasonAverage: 1.356 },
  {
    ...averagePredictionTest,
    name: "Belgrano",
    estimatedAverage: 1.1,
    nextSeasonAverage: 0.9,
  },
];

describe("generateFinalInfo", () => {
  it("exposes nextSeasonAverage inside predictions for each team", () => {
    const result = generateFinalInfo(sortedTeams);

    expect(result.map((team) => team.predictions.nextSeasonAverage)).toEqual([
      1.356, 0.9,
    ]);
  });

  it("keeps team identity and position order", () => {
    const result = generateFinalInfo(sortedTeams);

    expect(result.map((team) => team.teamInfo.name)).toEqual([
      "Instituto",
      "Belgrano",
    ]);
    expect(result.map((team) => team.predictions.position)).toEqual([1, 2]);
  });
});
