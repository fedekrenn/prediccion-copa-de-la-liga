// Components
import FilterHead from "@components/Table/Head/Filter/FilterHead";
// Types
import type { SortFunctions } from "@typos/sort";
// Context
import { useSorting } from "@contexts/sorting";

interface Params {
  sortFunctions: SortFunctions;
  ariaSortMap: {
    effectivity: "none" | "ascending" | "descending";
    points: "none" | "ascending" | "descending";
    average: "none" | "ascending" | "descending";
    playedMatches: "none" | "ascending" | "descending";
  };
}

export default function PredictionTab({ sortFunctions, ariaSortMap }: Params) {
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
        <th scope="col" className="w-14 text-center sm:w-18">Pos</th>
        <th scope="col" className="min-w-45 sm:min-w-57.5">Equipo</th>
        <th scope="col" aria-sort={ariaSortMap.effectivity} className="hidden text-center sm:table-cell">
          <button
            type="button"
            title="Ordenar por efectividad"
            onClick={sortByEffectivity}
            className="inline-flex w-full cursor-pointer justify-center"
          >
            <FilterHead filterOrder={effectivitySort} title="EFC" />
          </button>
        </th>
        <th scope="col" aria-sort={ariaSortMap.points} className="text-center">
          <button
            type="button"
            title="Ordenar por puntos estimados"
            onClick={sortByPoints}
            className="inline-flex w-full cursor-pointer justify-center"
          >
            <FilterHead filterOrder={pointsSort} title="PTS" />
          </button>
        </th>
        <th scope="col" aria-sort={ariaSortMap.playedMatches} className="hidden text-center sm:table-cell">
          <button
            type="button"
            title="Ordenar por partidos jugados"
            onClick={sortByPlayedMatches}
            className="inline-flex w-full cursor-pointer justify-center"
          >
            <FilterHead filterOrder={playedMatchesSort} title="PJ" />
          </button>
        </th>
        <th scope="col" aria-sort={ariaSortMap.average} className="hidden text-center sm:table-cell md:table-cell">
          <button
            type="button"
            title="Ordenar por promedio estimado"
            onClick={sortByAverage}
            className="inline-flex w-full cursor-pointer justify-center"
          >
            <FilterHead filterOrder={averageSort} title="PROM" />
          </button>
        </th>
      </tr>
    </thead>
  );
}
