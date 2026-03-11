export default function AnnualTable() {
  return (
    <thead>
      <tr>
        <th scope="col" title="Posicion anual" className="w-14 text-center sm:w-18">Pos</th>
        <th scope="col" title="Nombre del equipo" className="min-w-45 sm:min-w-57.5">Equipo</th>
        <th scope="col" title="Puntos anuales" className="text-center">Pts</th>
        <th scope="col" title="Partidos jugados" className="hidden text-center sm:table-cell">PJ</th>
        <th scope="col" title="Partidos ganados" className="hidden text-center md:table-cell">PG</th>
        <th scope="col" title="Partidos empatados" className="hidden text-center md:table-cell">PE</th>
        <th scope="col" title="Partidos perdidos" className="hidden text-center md:table-cell">PP</th>
        <th scope="col" title="Diferencia de goles" className="text-center">DG</th>
      </tr>
    </thead>
  );
}
