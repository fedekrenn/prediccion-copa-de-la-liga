import calculatePartial from "./calculatePartial";
import calculateClasification from "./calculateClasification";
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

      const porcentajeActual = equipoEncontradoTablas.porcentajeActual
      const puntosFinalesEstimados = equipoEncontradoTablas.puntosEstimados
      const promedioEstimado = (equipoEncontradoPromedio.puntosActuales + puntosFinalesEstimados) / (equipoEncontradoPromedio.partidosJugados + 14 + 27)
      const promedioFormateado = parseFloat(promedioEstimado.toFixed(3))

      return {
        ...equipo,
        porcentajeActual,
        puntosFinalesEstimados,
        promedioFormateado
      };
    } else {
      throw new Error(
        `No se encontró el equipo ${equipo.nombre} en la tabla unificada`
      );
    }
  });

  return datos
    .sort((a, b) => {
      return b.puntosFinalesEstimados - a.puntosFinalesEstimados;
    })
    .map((equipoInfo, index) => {
      const posicion = index + 1;

      return {
        posicion,
        clasificacion: calculateClasification(posicion, false), //TODO cambiar el hardcode del false por lógica correspondiente
        ...equipoInfo,
      };
    })

}
