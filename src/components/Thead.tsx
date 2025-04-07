// Components
import FilterHead from "./FilterHead.tsx";

type Params = {
  sortByEfectivity: () => void;
  sortByPoints: () => void;
  sortByAverage: () => void;
  sortByPlayedMatches: () => void;
  efectivitySort: string;
  pointsSort: string;
  averageSort: string;
  playedMatchesSort: string;
};

export default function Thead({
  sortByEfectivity,
  sortByPoints,
  sortByAverage,
  sortByPlayedMatches,
  efectivitySort,
  pointsSort,
  averageSort,
  playedMatchesSort,
}: Params) {
  return (
    <thead>
      <tr>
        <th className="font-thin text-xs">Pos</th>
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
