import { describe, it, expect } from "vitest";
import {
  determineClassification,
  analyzeRelegationPositions,
} from "../src/utils/teamPositioning";
import type {
  TeamInfo,
  TeamPredictionCalculations,
} from "../src/types/teamPrediction";

const generateMockTeam = (
  name: string,
  estimatedAverage: number,
  estimatedTotalPoints: number = 45,
  totalPoints: number = 30,
  playedMatches: number = 20
): TeamInfo & TeamPredictionCalculations => ({
  name,
  img: "",
  totalPoints,
  playedMatches,
  goalsDifference: 0,
  gamesWon: 10,
  gamesEven: 0,
  gamesLost: 10,
  estimatedTotalPoints,
  effectivityPercentage: 50,
  estimatedAverage,
  group: "A",
  annualPoints: 0,
});

const teams = [
  generateMockTeam("River", 2.0, 55),
  generateMockTeam("Boca", 1.8, 50),
  generateMockTeam("Instituto", 1.6, 49),
  generateMockTeam("Belgrano", 1.4, 45),
  generateMockTeam("Sarmiento", 1.0, 32),
  generateMockTeam("Aldosivi", 0.9, 31), // Same team is the last of table and the last of averages.
];

describe("---- Team Positioning ----", () => {
  describe("determineClassification", () => {
    it("Should assign correct classifications for normal positions", () => {
      expect(determineClassification(1, false, false)).toBe("libertadores");
      expect(determineClassification(2, false, false)).toBe("libertadores");
      expect(determineClassification(4, false, false)).toBe("sudamericana");
      expect(determineClassification(9, false, false)).toBe("sudamericana");
      expect(determineClassification(10, false, false)).toBe("noClasificado");
      expect(determineClassification(12, false, false)).toBe("noClasificado");
    });

    it("Should prioritize relegation classifications", () => {
      expect(determineClassification(1, true, false)).toBe("descensoPromedios");
      expect(determineClassification(1, false, true)).toBe("descensoPorTabla");
      expect(determineClassification(30, true, true)).toBe("descensoPromedios");
      expect(determineClassification(30, false, false)).toBe(
        "descensoPorTabla"
      );
    });
  });

  describe("analyzeRelegationPositions", () => {
    const result = analyzeRelegationPositions(teams);

    it("Should identify team with lowest average", () => {
      expect(result.lastOfAverage?.name).toBe("Aldosivi");
    });

    it("Should adjust last table position when same team has lowest average and worst table position", () => {
      expect(result.lastTablePosition).toBe(5);
      /* Because the team in the last position (6) is relegated both by averages and by table, the team immediately 
      above in the annual table is relegated instead. */
    });
  });
});
