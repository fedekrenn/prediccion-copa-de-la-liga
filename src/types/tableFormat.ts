export type TeamInfo = {
  nombre: string
  puntosTotales: number
  partidosJugados: number
}

export type TeamList = TeamInfo[]

export type Prediction = TeamInfo & {
  posicion: number
  porcentajeActual: number
  puntosFinalesEstimados: number
}