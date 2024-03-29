// Components
import FilterHead from "./FilterHead.tsx";

type Params = {
  sortByEfectivity: () => void;
  sortByPoints: () => void;
  sortByAverage: () => void;
  efectivitySort: string;
  pointsSort: string;
  averageSort: string;
};

export default function Thead({
  sortByEfectivity,
  sortByPoints,
  sortByAverage,
  efectivitySort,
  pointsSort,
  averageSort,
}: Params) {
  return (
    <thead>
      <tr>
        <th className="font-thin text-xs">Pos</th>
        <th className="w-[150px] sm:w-[220px] font-thin text-xs">Equipo</th>
        <th title="Ordenar por efectividad" onClick={sortByEfectivity}>
          <FilterHead filterOrder={efectivitySort} title="Efectividad" />
        </th>
        <th title="Ordenar por puntos estimados" onClick={sortByPoints}>
          <FilterHead filterOrder={pointsSort} title="Puntos" />
        </th>
        <th title="Ordenar por promedio estimado" onClick={sortByAverage}>
          <FilterHead filterOrder={averageSort} title="Promedio" />
        </th>
      </tr>
    </thead>
  );
}
