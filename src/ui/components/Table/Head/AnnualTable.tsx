export default function AnnualTable() {
  return (
    <thead>
      <tr>
        <th title="Posicion anual" className="w-[56px] text-center sm:w-[72px]">Pos</th>
        <th title="Nombre del equipo" className="min-w-[180px] sm:min-w-[230px]">Equipo</th>
        <th title="Puntos anuales" className="text-center">Pts</th>
        <th title="Partidos jugados" className="hidden text-center sm:table-cell">PJ</th>
        <th title="Partidos ganados" className="hidden text-center md:table-cell">PG</th>
        <th title="Partidos empatados" className="hidden text-center md:table-cell">PE</th>
        <th title="Partidos perdidos" className="hidden text-center md:table-cell">PP</th>
        <th title="Diferencia de goles" className="text-center">DG</th>
      </tr>
    </thead>
  );
}
