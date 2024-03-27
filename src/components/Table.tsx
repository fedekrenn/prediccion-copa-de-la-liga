import { useEffect, useRef } from "react";
// Libraries
import { useAutoAnimate } from "@formkit/auto-animate/react";
import autoAnimate from "@formkit/auto-animate";
// Components
import Row from "./Row.tsx";
import FilterHead from "./FilterHead.tsx";
// Types
import type { CompletePrediction } from "../types/tableFormat.ts";

type Params = {
  sortedResults: CompletePrediction[];
  sortByEfectivity: () => void;
  sortByPoints: () => void;
  sortByAverage: () => void;
  efectivitySort: string;
  pointsSort: string;
  averageSort: string;
};

export default function Table({
  sortedResults,
  sortByEfectivity,
  sortByPoints,
  sortByAverage,
  efectivitySort,
  pointsSort,
  averageSort,
}: Params) {
  const [animationParent] = useAutoAnimate({ duration: 400 });
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <table className="w-auto mx-auto text-sm sm:text-base" ref={parent}>
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
      <tbody ref={animationParent}>
        {sortedResults.map((equipo) => (
          <Row key={equipo.nombre} equipo={equipo} />
        ))}
      </tbody>
    </table>
  );
}
