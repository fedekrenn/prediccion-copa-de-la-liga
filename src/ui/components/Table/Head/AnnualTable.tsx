export default function AnnualTable() {
  return (
    <thead>
      <tr>
        <th title="Posicion anual" className="w-[72px] text-center">Pos</th>
        <th title="Nombre del equipo" className="min-w-[230px]">Equipo</th>
        <th title="Puntos anuales" className="text-center">Pts</th>
        <th title="Partidos jugados" className="text-center">PJ</th>
        <th title="Partidos ganados" className="text-center">PG</th>
        <th title="Partidos empatados" className="text-center">PE</th>
        <th title="Partidos perdidos" className="text-center">PP</th>
        <th title="Diferencia de goles" className="text-center">DG</th>
      </tr>
    </thead>
  );
}
