import { useEffect, useRef, useState, useCallback } from "react";
// Libraries
import { useAutoAnimate } from "@formkit/auto-animate/react";
import autoAnimate from "@formkit/auto-animate";
// Components
import Row from "./Row.tsx";
import Legend from "./Legend.tsx";
import FilterHead from "./FilterHead.tsx";
// Types
import type { CompletePrediction } from "../types/tableFormat.ts";

export default function TableContainer({ results }: { results: CompletePrediction[] }) {
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

  const sortByEfectivity = useCallback(() => {
    const sortedResults = results.toSorted(
      (a: CompletePrediction, b: CompletePrediction) => {
        if (a.porcentajeActual === b.porcentajeActual) {
          return efectivitySort === "asc"
            ? b.posicion - a.posicion
            : a.posicion - b.posicion;
        }
        return efectivitySort === "asc"
          ? a.porcentajeActual - b.porcentajeActual
          : b.porcentajeActual - a.porcentajeActual;
      }
    );

    const newEfectivitySort = efectivitySort === "asc" ? "desc" : "asc";

    setSortedResults(sortedResults);
    setEfectivitySort(newEfectivitySort);
    setNoSort(false);
  }, [efectivitySort, results]);

  const sortByPoints = useCallback(() => {
    const sortedResults = results.toSorted(
      (a: CompletePrediction, b: CompletePrediction) => {
        return pointsSort === "asc"
          ? b.posicion - a.posicion
          : a.posicion - b.posicion;
      }
    );
    setSortedResults(sortedResults);
    setPointsSort(pointsSort === "asc" ? "desc" : "asc");
    setNoSort(false);
  }, [pointsSort, results]);

  const sortByAverage = useCallback(() => {
    const sortedResults = results.toSorted(
      (a: CompletePrediction, b: CompletePrediction) => {
        return averageSort === "asc"
          ? a.promedioEstimado - b.promedioEstimado
          : b.promedioEstimado - a.promedioEstimado;
      }
    );
    setSortedResults(sortedResults);
    setAverageSort(averageSort === "asc" ? "desc" : "asc");
    setNoSort(false);
  }, [averageSort, results]);

  const resetSorts = useCallback(() => {
    setEfectivitySort("asc");
    setPointsSort("asc");
    setAverageSort("asc");
    setSortedResults(results);
    setNoSort(true);
  }, [results]);

  return (
    <>
      <Legend />
      <div className="min-h-10 flex items-center justify-center">
        {!noSort && (
          <button
            onClick={resetSorts}
            className="px-2 py-1 bg-[#0c151c] text-xs"
          >
            Resetear orden
          </button>
        )}
      </div>
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
