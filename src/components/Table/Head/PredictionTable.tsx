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
  const { sortByEfectivity, sortByPoints, sortByAverage, sortByPlayedMatches } =
    sortFunctions;

  const { efectivitySort, pointsSort, averageSort, playedMatchesSort } =
    useSorting();

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
        <th title="Ordenar por partidos jugados" onClick={sortByPlayedMatches}>
          <FilterHead filterOrder={playedMatchesSort} title="PJ" />
        </th>
        <th title="Ordenar por promedio estimado" onClick={sortByAverage}>
          <FilterHead filterOrder={averageSort} title="PROM" />
        </th>
      </tr>
    </thead>
  );
}
