import calculatePartial from './calculatePartial'
import type { TeamList } from '../types/tableFormat'

export default function calculateTotal(tablaGeneral: TeamList, zonaA: TeamList, zonaB: TeamList) {
  const unificado = [...(calculatePartial(zonaA) || []), ...(calculatePartial(zonaB) || [])];

  const datos = tablaGeneral?.map(equipo => {
    const equipoEncontrado = unificado.find(eq => eq.nombre === equipo.nombre);

    if (equipoEncontrado) {
      const puntosFinalesEstimados = equipo.puntosTotales + equipoEncontrado.puntosEstimados;

      return {
        ...equipo,
        porcentajeActual: equipoEncontrado.porcentajeActual,
        puntosFinalesEstimados
      };
    }
  });

  return datos && datos
    .sort((a, b) => {
      return b && a ? b.puntosFinalesEstimados - a.puntosFinalesEstimados : 0;
    })
    .map((equipoInfo, index) => {
      return {
        posicion: index + 1,
        ...equipoInfo
      }
    })
}