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
  annualTableData: TeamInfo[],
  currentTableData: TeamInfo[],
  averageData: AverageInfo[]
): CompletePrediction[] {
  const estimatedTeamInfo = calculatePartial(currentTableData);

  let lastOfAverage: CompleteAverageInfo | null = null;
  let minEstimatedAverage = Infinity;

  const finalData = annualTableData.map((team) => {
    const { nombre } = team;

    const foundTeamInTables = estimatedTeamInfo.find(
      (team) => team.nombre === nombre
    );

    const foundTeamAverage = averageData.find(
      (team) => team.nombre === nombre
    );

    if (foundTeamInTables && foundTeamAverage) {
      const finalInfo = generateFinalInfo(team,foundTeamInTables, foundTeamAverage);

      if (finalInfo.promedioEstimado < minEstimatedAverage) {
        minEstimatedAverage = finalInfo.promedioEstimado;
        lastOfAverage = finalInfo;
      }

      return finalInfo;
    } else {
      throw new Error(`No se encontró el equipo ${team.nombre} en la tabla unificada`);
    }
  });

  return finalData
    .sort((a, b) => {
      if (a.puntosEstimados === b.puntosEstimados) {
        if (a.partidosJugados === b.partidosJugados) {
          return b.diferenciaGoles - a.diferenciaGoles;
        }
        return a.partidosJugados - b.partidosJugados;
      }
      return b.puntosEstimados - a.puntosEstimados;
    })
    .map((teamInfo, index) => {
      const position = index + 1;
      const isLastByAverage = teamInfo === lastOfAverage;

      return {
        posicion: position,
        clasificacion: calculateClasification(position, isLastByAverage),
        ...teamInfo,
      };
    });
}
