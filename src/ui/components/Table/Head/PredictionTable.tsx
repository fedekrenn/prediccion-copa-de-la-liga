// Components
import FilterHead from "@components/Table/Head/Filter/FilterHead";
// Types
import type { SortFunctions } from "@typos/sort";
// Context
import { useSorting } from "@contexts/sorting";

interface Params {
  sortFunctions: SortFunctions;
}

export default function PredictionTab({ sortFunctions }: Params) {
  const {
    sortByEffectivity,
    sortByPoints,
    sortByAverage,
    sortByPlayedMatches,
  } = sortFunctions;

  const { effectivitySort, pointsSort, averageSort, playedMatchesSort } =
    useSorting();

  return (
    <thead>
      <tr>
        <th className="w-[72px] text-center">Pos</th>
        <th className="min-w-[230px]">Equipo</th>
        <th title="Ordenar por efectividad" onClick={sortByEffectivity} className="cursor-pointer text-center">
          <FilterHead filterOrder={effectivitySort} title="EFC" />
        </th>
        <th title="Ordenar por puntos estimados" onClick={sortByPoints} className="cursor-pointer text-center">
          <FilterHead filterOrder={pointsSort} title="PTS" />
        </th>
        <th title="Ordenar por partidos jugados" onClick={sortByPlayedMatches} className="cursor-pointer text-center">
          <FilterHead filterOrder={playedMatchesSort} title="PJ" />
        </th>
        <th title="Ordenar por promedio estimado" onClick={sortByAverage} className="cursor-pointer text-center">
          <FilterHead filterOrder={averageSort} title="PROM" />
        </th>
      </tr>
    </thead>
  );
}
