export type TeamInfo = {
  nombre: string
  puntosTotales: number
  partidosJugados: number
  diferenciaGoles: number
  img: string
}

export type PartialPrediction = {
  nombre: string
  porcentajeActual: number
  puntosEstimados: number
}

export type Prediction = TeamInfo & {
  posicion: number
  porcentajeActual: number
  puntosEstimados: number
  clasificacion: string
}

export type CompletePrediction = Prediction & {
  promedioEstimado: number
}

export type AverageInfo = {
  nombre: string
  puntosActuales: number
  partidosJugados: number
  img: string
}

export type CompleteAverageInfo = TeamInfo & {
  porcentajeActual: number
  puntosEstimados: number
  promedioEstimado: number
  img: string
}
