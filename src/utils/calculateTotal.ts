import calculatePartial from './calculatePartial'
import type { TeamsArr } from '../types/tableFormat'

export default function calculateTotal(tablaGeneral: TeamsArr, zonaA: TeamsArr, zonaB: TeamsArr) {
  const unificado = [...(calculatePartial(zonaA) || []), ...(calculatePartial(zonaB) || [])];

  const datos = tablaGeneral?.map(equipo => {
    const equipoEncontrado = unificado.find(eq => eq.nombre === equipo.nombre);
    const puntosFinalesEstimados = equipo.puntosTotales + equipoEncontrado.puntosEstimados;

    return {
      ...equipo,
      porcentajeActual: equipoEncontrado.porcentajeActual,
      puntosFinalesEstimados
    };
  });

  return datos && datos
    .sort((a, b) => b.puntosFinalesEstimados - a.puntosFinalesEstimados)
    .map((equipoInfo, index) => {
      return {
        posicion: index + 1,
        ...equipoInfo
      }
    })
}