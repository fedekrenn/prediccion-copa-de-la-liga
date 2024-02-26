import calculatePartial from './calculatePartial'
import calculateClasification from './calculateClasification';
import type { TeamList } from '../types/tableFormat'

export default function calculateTotal(tablaGeneral: TeamList, zonaA: TeamList, zonaB: TeamList) {
  const unificado = [...(calculatePartial(zonaA)), ...(calculatePartial(zonaB))];

  const datos = tablaGeneral.map(equipo => {
    const equipoEncontrado = unificado.find(eq => eq.nombre === equipo.nombre);

    if (equipoEncontrado) {
      return {
        ...equipo,
        porcentajeActual: equipoEncontrado.porcentajeActual,
        puntosFinalesEstimados: equipoEncontrado.puntosEstimados
      };
    } else {
      throw new Error(`No se encontró el equipo ${equipo.nombre} en la tabla unificada`);
    }
  });

  return datos && datos
    .sort((a, b) => {
      return b.puntosFinalesEstimados - a.puntosFinalesEstimados;
    })
    .map((equipoInfo, index) => {
      const posicion = index + 1;

      return {
        posicion,
        clasificacion: calculateClasification(posicion),
        ...equipoInfo
      }
    })
}