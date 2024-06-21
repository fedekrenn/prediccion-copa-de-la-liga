export interface TeamInfo {
  nombre: string
  puntosTotales: number
  partidosJugados: number
  diferenciaGoles: number
}

export interface PartialPrediction {
  nombre: string
  porcentajeActual: number
  puntosEstimados: number
}

export interface Prediction extends TeamInfo {
  posicion: number
  porcentajeActual: number
  puntosEstimados: number
  clasificacion: string
}

export interface CompletePrediction extends Prediction {
  promedioEstimado: number
}

export interface AverageInfo {
  nombre: string
  puntosActuales: number
  partidosJugados: number
  img: string
}

export interface CompleteAverageInfo extends TeamInfo {
  porcentajeActual: number
  puntosEstimados: number
  promedioEstimado: number
}

export type TABLE_POSITIONS = 'libertadores' | 'sudamericana' | 'descensoPorTabla' | 'descensoPromedios' | 'noClasificado'