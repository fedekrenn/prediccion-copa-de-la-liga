import { describe, it, expect } from "vitest";
import { calculateClasification } from "../src/utils/calculateClasification";
import { addEffectivityInfo } from "../src/utils/addEffectivityInfo";
import { prediction, teamScoresArray } from "./data/dataTests";

describe("---- Calculate future table ----", () => {
  it("Should calculate correct position", () => {
    expect(calculateClasification(1, false, false)).toBe("libertadores");
    expect(calculateClasification(4, false, false)).toBe("sudamericana");
    expect(calculateClasification(10, false, false)).toBe("noClasificado");
    expect(calculateClasification(9, true, false)).toBe("descensoPromedios");
    expect(calculateClasification(30, false, false)).toBe("descensoPorTabla");
  });

  it("Should calculate correct partial prediction", () => {
    teamScoresArray.forEach((team, i) => {
      expect(addEffectivityInfo(team)).toEqual(prediction[i]);
    });
  });
});
