// Components
import FilterHead from "@components/FilterHead.tsx";
// Types
import type { SortProps } from "@typos/sort";

export default function Thead({
  sortByEfectivity,
  sortByPoints,
  sortByAverage,
  sortByPlayedMatches,
  efectivitySort,
  pointsSort,
  averageSort,
  playedMatchesSort,
  activeTab,
}: SortProps) {
  if (activeTab === "predictions") {
    return (
      <thead>
        <tr>
          <th className="font-thin text-xs w-[41px]">Pos</th>
          <th className="w-[150px] sm:w-[220px] font-thin text-xs">Equipo</th>
          <th title="Ordenar por efectividad" onClick={sortByEfectivity}>
            <FilterHead filterOrder={efectivitySort} title="EFC" />
          </th>
          <th title="Ordenar por puntos estimados" onClick={sortByPoints}>
            <FilterHead filterOrder={pointsSort} title="PTS" />
          </th>
          <th
            title="Ordenar por partidos jugados"
            onClick={sortByPlayedMatches}
          >
            <FilterHead filterOrder={playedMatchesSort} title="PJ" />
          </th>
          <th title="Ordenar por promedio estimado" onClick={sortByAverage}>
            <FilterHead filterOrder={averageSort} title="PROM" />
          </th>
        </tr>
      </thead>
    );
  }

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
