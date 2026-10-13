export default function NextSeasonTable() {
  return (
    <thead>
      <tr>
        <th scope="col" title="Posicion en la tabla de promedios del proximo año" className="w-14 text-center sm:w-18">Pos</th>
        <th scope="col" title="Nombre del equipo" className="min-w-45 sm:min-w-57.5">Equipo</th>
        <th scope="col" title="Promedio proyectado para el proximo año" className="text-center">Prom</th>
      </tr>
    </thead>
  );
}
