import calculatePartial from "./calculatePartial";
import calculateClasification from "./calculateClasification";
import generateFinalInfo from "./generateFinalInfo";
import type { TeamInfo, AverageInfo, CompleteAverageInfo, CompletePrediction } from "../types/tablesTypes";

export default function calculateTotal(
  tablaGeneral: TeamInfo[],
  zonaA: TeamInfo[],
  zonaB: TeamInfo[],
  datosPromedios: AverageInfo[]
): CompletePrediction[] {
  const unificado = [...calculatePartial(zonaA), ...calculatePartial(zonaB)];
  const unificadoMap = new Map(unificado.map(item => [item.nombre, item]));


  const datosPromediosMap = new Map(datosPromedios.map(item => [item.nombre, item]));

  let ultimoPromedios: CompleteAverageInfo | null = null;
  let minPromedioEstimado = Infinity;

  const datos = tablaGeneral.map(equipo => {
    const equipoEncontradoTablas = unificadoMap.get(equipo.nombre);
    const equipoEncontradoPromedio = datosPromediosMap.get(equipo.nombre);
    console.log(equipoEncontradoPromedio?.img);


    if (equipoEncontradoTablas && equipoEncontradoPromedio) {
      const finalInfo = generateFinalInfo(equipo, equipoEncontradoTablas, equipoEncontradoPromedio);

      if (finalInfo.promedioEstimado < minPromedioEstimado) {
        minPromedioEstimado = finalInfo.promedioEstimado;
        ultimoPromedios = finalInfo;
      }

      return finalInfo;
    } else {
      throw new Error(`No se encontró el equipo ${equipo.nombre} en la tabla unificada`);
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
      const img = equipoInfo.img

      return {
        posicion,
        clasificacion: calculateClasification(posicion, esElUltimoPorPromedios),
        ...equipoInfo,
        img
      };
    });
}