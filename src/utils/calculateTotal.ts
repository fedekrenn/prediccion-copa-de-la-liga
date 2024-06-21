import calculatePartial from "./calculatePartial";
import calculateClasification from "./calculateClasification";
import generateFinalInfo from "./generateFinalInfo";
import type {
  TeamInfo,
  AverageInfo,
  CompleteAverageInfo,
  CompletePrediction,
} from "../types/teamPrediction";

export default function calculateTotal(
  tablaGeneral: TeamInfo[],
  tablaActual: TeamInfo[],
  datosPromedios: AverageInfo[]
): CompletePrediction[] {
  const combinedTotal = calculatePartial(tablaActual);

  let ultimoPromedios: CompleteAverageInfo | null = null;
  let minPromedioEstimado = Infinity;

  const datos = tablaGeneral.map((equipo) => {
    // const { nombre } = equipo;
    // const equipoEncontradoTablas = unificadoMap.get(nombre);
    // const equipoEncontradoPromedio = datosPromediosMap.get(nombre);
    // if (equipoEncontradoTablas && equipoEncontradoPromedio) {
    //   const finalInfo = generateFinalInfo(
    //     equipo,
    //     equipoEncontradoTablas,
    //     equipoEncontradoPromedio
    //   );
    //   if (finalInfo.promedioEstimado < minPromedioEstimado) {
    //     minPromedioEstimado = finalInfo.promedioEstimado;
    //     ultimoPromedios = finalInfo;
    //   }
    //   return finalInfo;
    // } else {
    // throw new Error(
    // `No se encontró el equipo ${equipo.nombre} en la tabla unificada`
    // );
    // }
    const { nombre } = equipo;

    const equipoEncontradoTablas = combinedTotal.find(
      (equipo) => equipo.nombre === nombre
    );

    const equipoEncontradoPromedio = datosPromedios.find(
      (equipo) => equipo.nombre === nombre
    );

    if (equipoEncontradoTablas && equipoEncontradoPromedio) {
      const finalInfo = generateFinalInfo(
        equipo,
        equipoEncontradoTablas,
        equipoEncontradoPromedio
      );
      if (finalInfo.promedioEstimado < minPromedioEstimado) {
        minPromedioEstimado = finalInfo.promedioEstimado;
        ultimoPromedios = finalInfo;
      }
      return finalInfo;
    } else {
      throw new Error(
        `No se encontró el equipo ${equipo.nombre} en la tabla unificada`
      );
    }
  });

  return datos
    .sort((a, b) => {
      if (a.puntosEstimados === b.puntosEstimados) {
        if (a.partidosJugados === b.partidosJugados) {
          return b.diferenciaGoles - a.diferenciaGoles;
        }
        return a.partidosJugados - b.partidosJugados;
      }
      return b.puntosEstimados - a.puntosEstimados;
    })
    .map((equipoInfo, index) => {
      const posicion = index + 1;
      const esElUltimoPorPromedios = equipoInfo === ultimoPromedios;

      return {
        posicion,
        clasificacion: calculateClasification(posicion, esElUltimoPorPromedios),
        ...equipoInfo,
      };
    });
}
