export const TOTAL_TEAMS = 30 as const;

export type ClassificationKey =
  | "libertadores"
  | "sudamericana"
  | "neutral"
  | "descensoPorTabla";

export interface ClassificationRange {
  readonly start: number;
  readonly end: number;
  readonly classification: ClassificationKey;
}

export const CLASSIFICATION_RANGES: readonly ClassificationRange[] = [
  { start: 1, end: 3, classification: "libertadores" },
  { start: 4, end: 9, classification: "sudamericana" },
  { start: 10, end: 29, classification: "neutral" },
  { start: 30, end: 30, classification: "descensoPorTabla" },
] as const;

export function isValidPosition(n: number): boolean {
  return Number.isInteger(n) && n >= 1 && n <= TOTAL_TEAMS;
}

function buildPositionMap(
  ranges: readonly ClassificationRange[]
): Record<number, ClassificationKey> {
  const map: Record<number, ClassificationKey> = {};
  for (const range of ranges) {
    for (let pos = range.start; pos <= range.end; pos++) {
      map[pos] = range.classification;
    }
  }
  return map;
}

export const positionClassification: Readonly<
  Record<number, ClassificationKey>
> = buildPositionMap(CLASSIFICATION_RANGES);
