import type { LiveData } from "./api";

interface TeamData {
  name: string;
  img: string;
}

export interface ExtractedData {
  totalPoints: number;
  playedMatches: number;
  goalsDifference: number;
  gamesWon: number;
  gamesEven: number;
  gamesLost: number;
  liveData?: LiveData;
}

export interface TeamInfo extends TeamData, ExtractedData {}

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

export interface TablePrediction extends AveragePrediction {
  position: number;
  classification: TABLE_POSITIONS;
}

type PredictionData = Omit<
  TablePrediction,
  | "name"
  | "img"
  | "totalPoints"
  | "playedMatches"
  | "goalsDifference"
  | "gamesWon"
  | "gamesEven"
  | "gamesLost"
>;

export interface FinalData {
  teamInfo: TeamData;
  actualData: ExtractedData;
  tablePrediction: PredictionData;
}

export type TABLE_POSITIONS =
  | "libertadores"
  | "sudamericana"
  | "descensoPorTabla"
  | "descensoPromedios"
  | "noClasificado";
