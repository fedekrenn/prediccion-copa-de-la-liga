import { describe, it, expect } from "vitest";
import {
  TOTAL_TEAMS,
  CLASSIFICATION_RANGES,
  isValidPosition,
  positionClassification,
} from "../../src/config/seasonRules";

describe("Season Rules Config", () => {
  describe("TOTAL_TEAMS constant", () => {
    it("equals 30 teams in the league", () => {
      expect(TOTAL_TEAMS).toBe(30);
    });
  });

  describe("CLASSIFICATION_RANGES structure", () => {
    it("is a readonly array of classification ranges", () => {
      expect(Array.isArray(CLASSIFICATION_RANGES)).toBe(true);
      expect(CLASSIFICATION_RANGES.length).toBeGreaterThan(0);
    });

    it("each range has start, end, and classification", () => {
      for (const range of CLASSIFICATION_RANGES) {
        expect(range).toHaveProperty("start");
        expect(range).toHaveProperty("end");
        expect(range).toHaveProperty("classification");
        expect(typeof range.start).toBe("number");
        expect(typeof range.end).toBe("number");
        expect(typeof range.classification).toBe("string");
      }
    });

    it("ranges sum equals TOTAL_TEAMS (invariant)", () => {
      const totalPositions = CLASSIFICATION_RANGES.reduce(
        (sum, range) => sum + (range.end - range.start + 1),
        0
      );
      expect(totalPositions).toBe(TOTAL_TEAMS);
    });

    it("ranges are non-overlapping and cover all positions", () => {
      const coveredPositions = new Set<number>();

      for (const range of CLASSIFICATION_RANGES) {
        for (let pos = range.start; pos <= range.end; pos++) {
          expect(coveredPositions.has(pos)).toBe(false); // No overlaps
          coveredPositions.add(pos);
        }
      }

      // Check all positions 1 to TOTAL_TEAMS are covered
      for (let pos = 1; pos <= TOTAL_TEAMS; pos++) {
        expect(coveredPositions.has(pos)).toBe(true);
      }
    });

    it("defines correct classification boundaries", () => {
      const libertadores = CLASSIFICATION_RANGES.find(
        (r) => r.classification === "libertadores"
      );
      const sudamericana = CLASSIFICATION_RANGES.find(
        (r) => r.classification === "sudamericana"
      );
      const neutral = CLASSIFICATION_RANGES.find(
        (r) => r.classification === "neutral"
      );
      const descenso = CLASSIFICATION_RANGES.find(
        (r) => r.classification === "descensoPorTabla"
      );

      expect(libertadores).toEqual({ start: 1, end: 3, classification: "libertadores" });
      expect(sudamericana).toEqual({ start: 4, end: 9, classification: "sudamericana" });
      expect(neutral).toEqual({ start: 10, end: 29, classification: "neutral" });
      expect(descenso).toEqual({ start: 30, end: 30, classification: "descensoPorTabla" });
    });
  });

  describe("isValidPosition helper", () => {
    it("returns true for position 1 (minimum valid)", () => {
      expect(isValidPosition(1)).toBe(true);
    });

    it("returns true for position 15 (middle)", () => {
      expect(isValidPosition(15)).toBe(true);
    });

    it("returns true for position 30 (maximum valid)", () => {
      expect(isValidPosition(30)).toBe(true);
    });

    it("returns false for position 0", () => {
      expect(isValidPosition(0)).toBe(false);
    });

    it("returns false for position 31 (above max)", () => {
      expect(isValidPosition(31)).toBe(false);
    });

    it("returns false for negative positions", () => {
      expect(isValidPosition(-1)).toBe(false);
    });

    it("returns false for non-integer positions", () => {
      expect(isValidPosition(1.5)).toBe(false);
    });
  });

  describe("positionClassification map", () => {
    it("maps all positions 1 through 30", () => {
      const keys = Object.keys(positionClassification).map(Number);
      expect(keys.length).toBe(TOTAL_TEAMS);
      
      for (let pos = 1; pos <= TOTAL_TEAMS; pos++) {
        expect(positionClassification[pos]).toBeDefined();
      }
    });

    it("maps position 1 to libertadores", () => {
      expect(positionClassification[1]).toBe("libertadores");
    });

    it("maps position 3 to libertadores (boundary)", () => {
      expect(positionClassification[3]).toBe("libertadores");
    });

    it("maps position 4 to sudamericana (boundary)", () => {
      expect(positionClassification[4]).toBe("sudamericana");
    });

    it("maps position 9 to sudamericana (boundary)", () => {
      expect(positionClassification[9]).toBe("sudamericana");
    });

    it("maps position 10 to neutral (boundary)", () => {
      expect(positionClassification[10]).toBe("neutral");
    });

    it("maps position 29 to neutral (boundary)", () => {
      expect(positionClassification[29]).toBe("neutral");
    });

    it("maps position 30 to descensoPorTabla", () => {
      expect(positionClassification[30]).toBe("descensoPorTabla");
    });
  });
});
