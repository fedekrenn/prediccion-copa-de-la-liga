export interface TeamInfo {
  name: string;
  totalPoints: number;
  playedMatches: number;
  goalsDifference: number;
  img: string;
}

export interface AverageInfo {
  name: string;
  avgTotalPoints: number;
  avgTotalGames: number;
}

export interface EffectivityPrediction extends TeamInfo {
  estimatedTotalPoints: number;
  effectivityPorcentage: number;
}

export interface AveragePrediction extends EffectivityPrediction {
  estimatedAverage: number;
}

export interface CompletePrediction extends AveragePrediction {
  position: number;
  classification: TABLE_POSITIONS;
}

export type TABLE_POSITIONS =
  | "libertadores"
  | "sudamericana"
  | "descensoPorTabla"
  | "descensoPromedios"
  | "noClasificado";
