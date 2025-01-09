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

export interface PartialPrediction extends TeamInfo {
  estimatedTotalPoints: number;
  effectivityPorcentage: number;
}

// From here down could be optimized
export interface Prediction extends PartialPrediction {
  position: number;
  classification: string;
}

export interface CompletePrediction extends Prediction {
  estimatedAverage: number;
}

export interface CompleteAverageInfo extends TeamInfo {
  effectivityPorcentage: number;
  estimatedTotalPoints: number;
  estimatedAverage: number;
  img: string;
}

export type TABLE_POSITIONS =
  | "libertadores"
  | "sudamericana"
  | "descensoPorTabla"
  | "descensoPromedios"
  | "noClasificado";
