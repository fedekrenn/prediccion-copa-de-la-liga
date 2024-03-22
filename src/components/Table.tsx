import { useEffect, useRef, useState } from "react";
// Libraries
import { useAutoAnimate } from "@formkit/auto-animate/react";
import autoAnimate from "@formkit/auto-animate";
// Components
import Row from "./Row.tsx";
import Legend from "./Legend.tsx";
import FilterHead from "./FilterHead.tsx";
// Types
import type { CompletePrediction } from "../types/tableFormat.ts";

export default function Table({ results }: { results: CompletePrediction[] }) {
  const [sortedResults, setSortedResults] =
    useState<CompletePrediction[]>(results);
  const [noSort, setNoSort] = useState<Boolean>(true);
  const [efectivitySort, setEfectivitySort] = useState<string>("asc");
  const [pointsSort, setPointsSort] = useState<string>("asc");
  const [averageSort, setAverageSort] = useState<string>("asc");

  const [animationParent] = useAutoAnimate({ duration: 400 });
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const sortByEfectivity = () => {
    const sortedResults = results.toSorted(
      (a: CompletePrediction, b: CompletePrediction) => {
        if (efectivitySort === "asc") {
          return a.porcentajeActual - b.porcentajeActual;
        } else {
          return b.porcentajeActual - a.porcentajeActual;
        }
      }
    );
    setSortedResults([...sortedResults]);
    setEfectivitySort(efectivitySort === "asc" ? "desc" : "asc");
    setNoSort(false);
  };

  const sortByPoints = () => {
    const sortedResults = results.toSorted(
      (a: CompletePrediction, b: CompletePrediction) => {
        if (pointsSort === "asc") {
          return a.puntosEstimados - b.puntosEstimados;
        } else {
          return b.puntosEstimados - a.puntosEstimados;
        }
      }
    );
    setSortedResults([...sortedResults]);
    setPointsSort(pointsSort === "asc" ? "desc" : "asc");
    setNoSort(false);
  };

  const sortByAverage = () => {
    const sortedResults = results.toSorted(
      (a: CompletePrediction, b: CompletePrediction) => {
        if (averageSort === "asc") {
          return a.promedioEstimado - b.promedioEstimado;
        } else {
          return b.promedioEstimado - a.promedioEstimado;
        }
      }
    );
    setSortedResults([...sortedResults]);
    setAverageSort(averageSort === "asc" ? "desc" : "asc");
    setNoSort(false);
  };

  const resetSorts = () => {
    setEfectivitySort("asc");
    setPointsSort("asc");
    setAverageSort("asc");
    setSortedResults([...results]);
    setNoSort(true);
  };

  return (
    <>
      <Legend />
      {!noSort && (
        <button
          onClick={resetSorts}
          className="block mx-auto my-5 px-7 py-2 bg-[#0c151c]"
        >
          Resetear orden
        </button>
      )}
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
          {sortedResults.map((equipo: CompletePrediction) => (
            <Row key={equipo.nombre} equipo={equipo} />
          ))}
        </tbody>
      </table>
    </>
  );
}
