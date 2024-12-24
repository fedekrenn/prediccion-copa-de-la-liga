import { describe, it, expect } from "vitest";
import { calculateClasification } from "../src/utils/calculateClasification";
import { calculatePartial } from "../src/utils/calculatePartial";
import { prediction, teamScoresArray } from "./data/dataTests";

describe("---- Calculate future table ----", () => {
  it("Should calculate correct position", () => {
    expect(calculateClasification(1, false, false)).toBe("libertadores");
    expect(calculateClasification(2, false, false)).toBe("libertadores");
    expect(calculateClasification(3, false, false)).toBe("libertadores");
    expect(calculateClasification(4, false, false)).toBe("sudamericana");
    expect(calculateClasification(5, false, false)).toBe("sudamericana");
    expect(calculateClasification(6, false, false)).toBe("sudamericana");
    expect(calculateClasification(7, false, false)).toBe("sudamericana");
    expect(calculateClasification(8, false, false)).toBe("sudamericana");
    expect(calculateClasification(9, false, false)).toBe("sudamericana");
    expect(calculateClasification(28, false, false)).toBe("descensoPorTabla");
    expect(calculateClasification(10, false, false)).toBe("noClasificado");
    expect(calculateClasification(27, false, false)).toBe("noClasificado");
    expect(calculateClasification(29, false, false)).toBe("noClasificado");
    expect(calculateClasification(0, false, false)).toBe("noClasificado");
    expect(calculateClasification(9, true, false)).toBe("descensoPromedios");
  });

  it("Should calculate correct partial prediction", () => {
    expect(calculatePartial(teamScoresArray)).toEqual(prediction);
  });
});
