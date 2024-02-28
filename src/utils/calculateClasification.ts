type Clasificacion = {
  [key: number]: string
}

export default function calculateClasification(posicion: number): string {
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
    28: 'descenso'
  };

  return clasificacion[posicion] || 'noClasificado';
}