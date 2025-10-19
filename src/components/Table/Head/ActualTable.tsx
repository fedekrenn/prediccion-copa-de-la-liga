export default function ActualTab() {
  return (
    <thead>
      <tr>
        <th title="Posición actual" className="font-thin text-xs text-center">
          Pos
        </th>
        <th
          title="Nombre del equipo"
          className="w-[150px] sm:w-[220px] font-thin text-xs"
        >
          Equipo
        </th>
        <th title="Puntos totales" className="font-thin text-xs text-center">
          PTS
        </th>
        <th title="Partidos jugados" className="font-thin text-xs text-center">
          PJ
        </th>
        <th title="Partidos ganados" className="font-thin text-xs text-center">
          PG
        </th>
        <th
          title="Partidos empatados"
          className="font-thin text-xs text-center"
        >
          PE
        </th>
        <th title="Partidos perdidos" className="font-thin text-xs text-center">
          PP
        </th>
        <th
          title="Diferencia de goles"
          className="font-thin text-xs text-center"
        >
          DG
        </th>
      </tr>
    </thead>
  );
}
