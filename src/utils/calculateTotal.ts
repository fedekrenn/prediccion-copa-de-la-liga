import calculatePartial from "./calculatePartial";
import calculateClasification from "./calculateClasification";
import generateFinalInfo from './generateFinalInfo'
import type { TeamList, AverageInfo } from "../types/tableFormat";

export default function calculateTotal(
  tablaGeneral: TeamList,
  zonaA: TeamList,
  zonaB: TeamList,
  datosPromedios: AverageInfo[]
) {
  const unificado = [...calculatePartial(zonaA), ...calculatePartial(zonaB)];

  const datos = tablaGeneral.map((equipo) => {
    const equipoEncontradoTablas = unificado.find(
      ({ nombre }) => nombre === equipo.nombre
    );

    const equipoEncontradoPromedio = datosPromedios.find(
      ({ nombre }) => nombre === equipo.nombre
    );

    if (equipoEncontradoTablas && equipoEncontradoPromedio) {

      return generateFinalInfo(equipo, equipoEncontradoTablas, equipoEncontradoPromedio)
    } else {
      throw new Error(
        `No se encontró el equipo ${equipo.nombre} en la tabla unificada`
      );
    }
  });

  const ultimoPromedios = datos.sort((a, b) => a.promedioEstimado - b.promedioEstimado)[0]

  return datos
    .sort((a, b) => {
      return b.puntosEstimados - a.puntosEstimados;
    })
    .map((equipoInfo, index) => {
      const posicion = index + 1;
      const esElUltimoPorPromedios = equipoInfo === ultimoPromedios

      return {
        posicion,
        clasificacion: calculateClasification(posicion, esElUltimoPorPromedios),
        ...equipoInfo,
      };
    })
}
