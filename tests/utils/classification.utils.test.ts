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
    expect(addAverageInfo(partialPrediction, averageDataTest, 19)).toEqual(
      averagePredictionTest,
    );
  });
});
