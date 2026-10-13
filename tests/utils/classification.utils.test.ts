import { describe, it, expect } from "vitest";
import { determineClassification } from "../../src/server/prediction/utils/teamPositioning";
import { addEffectivityInfo } from "../../src/server/prediction/utils/addEffectivityInfo";
import { addAverageInfo } from "../../src/server/prediction/utils/addAverageInfo";
import {
  annualTablePredictionTest,
  actualTableDataTest,
  annualTableDataTest,
} from "../data/classificationDataTests";
import {
  averageDataTest,
  averagePredictionTest,
  partialPrediction,
} from "../data/averageDataTests";

describe("Classification utils", () => {
  it("returns correct classification by position", () => {
    expect(determineClassification(1, false, false)).toBe("libertadores");
    expect(determineClassification(4, false, false)).toBe("sudamericana");
    expect(determineClassification(10, false, false)).toBe("noClasificado");
    expect(determineClassification(9, true, false)).toBe("descensoPromedios");
    expect(determineClassification(30, false, false)).toBe("descensoPorTabla");
  });

  it("returns expected partial prediction", () => {
    actualTableDataTest.forEach((team, i) => {
      expect(
        addEffectivityInfo(
          team,
          annualTableDataTest[i].annualPoints,
          annualTableDataTest[i].yearGamePlayed,
        ),
      ).toEqual(annualTablePredictionTest[i]);
    });
  });

  it("returns expected average prediction", () => {
    expect(addAverageInfo(partialPrediction, averageDataTest, 27)).toEqual(
      averagePredictionTest,
    );
  });

  it("does not discount the first-year games from next season average when first is 0", () => {
    const result = addAverageInfo(
      partialPrediction,
      {
        ...averageDataTest,
        allAvgInfo: { first: 0, second: 34, third: 46 },
      },
      27,
    );

    expect(result.nextSeasonAverage).toBe(0.8);
  });

  it("discounts 41 games from next season average when first is not 0", () => {
    const result = addAverageInfo(partialPrediction, averageDataTest, 27);

    expect(result.nextSeasonAverage).toBe(1.356);
  });

  it("uses previous seasons without projection when no matches were played", () => {
    const result = addAverageInfo(
      { ...partialPrediction, playedMatches: 0 },
      averageDataTest,
      27,
    );

    expect(result.estimatedAverage).toBe(0.87);
    expect(result.nextSeasonAverage).toBe(0.8);
  });

  it("returns 0 instead of Infinity when avgTotalGames is 0 and no matches were played", () => {
    const result = addAverageInfo(
      { ...partialPrediction, playedMatches: 0 },
      { ...averageDataTest, avgTotalGames: 0 },
      27,
    );

    expect(result.estimatedAverage).toBe(0);
    expect(result.nextSeasonAverage).toBe(0);
  });

  it("returns finite averages when the games denominator collapses to 0", () => {
    const result = addAverageInfo(
      partialPrediction,
      { ...averageDataTest, avgTotalGames: 41 },
      27,
    );

    expect(Number.isFinite(result.nextSeasonAverage)).toBe(true);
    expect(result.nextSeasonAverage).toBe(0);
  });

  it("returns 0 for averages when there is no history and no matches played", () => {
    const result = addAverageInfo(
      { ...partialPrediction, playedMatches: 0 },
      {
        ...averageDataTest,
        previousSeasonsPoints: 0,
        allAvgInfo: { first: 0, second: 0, third: 0 },
      },
      27,
    );

    expect(result.estimatedAverage).toBe(0);
    expect(result.nextSeasonAverage).toBe(0);
  });
});
