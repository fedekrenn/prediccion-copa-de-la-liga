import type { TeamInfo } from "../types/teamPrediction";

export default function format(
  tablaDatos: cheerio.Cheerio,
  datosGenerales: cheerio.Root
): TeamInfo[] {
  const buffer: TeamInfo[] = [];

  if (tablaDatos.length > 0) {
    tablaDatos.find("tbody tr").each((_, row) => {
      const columnas = datosGenerales(row).find("td");

      const img = datosGenerales(row).find("img").attr("src") || "";
      const nombre = columnas.eq(1).text().trim();
      const puntosTotales = parseInt(columnas.eq(2).text(), 10);
      const partidosJugados = parseInt(columnas.eq(3).text(), 10);
      const golesAFavor = parseInt(columnas.eq(7).text(), 10);
      const golesEnContra = parseInt(columnas.eq(8).text(), 10);

      const hasObservations = nombre.at(-1) === "*";
      const adjustedName = hasObservations ? nombre.slice(0, -1) : nombre;

      const datosEquipo: TeamInfo = {
        nombre: adjustedName,
        puntosTotales,
        partidosJugados,
        diferenciaGoles: golesAFavor - golesEnContra,
        img,
      };

      buffer.push(datosEquipo);
    });
    return buffer;
  }

  return [];
}
