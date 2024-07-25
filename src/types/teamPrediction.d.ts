export interface TeamInfo {
  name: string;
  totalPoints: number;
  playedMatches: number;
  goalsDifference: number;
}

export interface PartialPrediction {
  name: string;
  effectivityPorcentage: number;
  estimatedTotalPoints: number;
}

export interface Prediction extends TeamInfo {
  position: number;
  effectivityPorcentage: number;
  estimatedTotalPoints: number;
  classification: string;
}

export interface CompletePrediction extends Prediction {
  estimatedAverage: number;
  img: string;
}

export interface AverageInfo {
  name: string;
  currentPoints: number;
  playedMatches: number;
  img: string;
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
