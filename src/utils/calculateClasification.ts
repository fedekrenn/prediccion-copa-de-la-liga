import { type TABLE_POSITIONS } from '../types/teamPrediction';

type Clasificacion = {
  [key: number]: TABLE_POSITIONS
}

export default function calculateClasification(posicion: number, equipoDesciendePorPromedios: boolean): TABLE_POSITIONS {

  if (equipoDesciendePorPromedios) return 'descensoPromedios'

  const clasificacion: Clasificacion = {
    1: 'libertadores',
    2: 'libertadores',
    3: 'libertadores',
    4: 'sudamericana',
    5: 'sudamericana',
    6: 'sudamericana',
    7: 'sudamericana',
    8: 'sudamericana',
    9: 'sudamericana',
    28: 'descensoPorTabla'
  };

  const finalClassification = clasificacion[posicion];

  return finalClassification ? finalClassification : 'noClasificado';
}