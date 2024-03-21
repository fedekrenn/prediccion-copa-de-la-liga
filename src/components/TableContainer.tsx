import { useEffect, useRef } from "react";
// Libraries
import { useAutoAnimate } from "@formkit/auto-animate/react";
import autoAnimate from "@formkit/auto-animate";
// Components
import Row from "./Row.tsx";
import Legend from "./Legend.tsx";
// Icons
import caretDown from "@assets/caretDown.svg";
import caretUp from "@assets/caretUp.svg";
// Types
import type { CompletePrediction } from "../types/tableFormat";

type Params = {
  efectivitySort: string;
  pointsSort: string;
  averageSort: string;
  results: CompletePrediction[];
  sortByPoints: () => void;
  sortByEfectivity: () => void;
  sortByAverage: () => void;
};

export default function TableContainer({
  efectivitySort,
  pointsSort,
  averageSort,
  results,
  sortByPoints,
  sortByEfectivity,
  sortByAverage,
}: Params) {
  const [animationParent] = useAutoAnimate({ duration: 400 });
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <>
      <Legend />
      <table className="w-auto mx-auto text-sm sm:text-base" ref={parent}>
        <thead>
          <tr>
            <th className="font-thin text-xs">Pos</th>
            <th className="w-[150px] sm:w-[220px] font-thin text-xs">Equipo</th>
            <th title="Ordenar por efectividad" onClick={sortByEfectivity}>
              <div className="cursor-pointer align-middle flex items-center">
                {efectivitySort === "asc" ? (
                  <img
                    className="w-4 sm:w-5"
                    src={caretDown.src}
                    alt="caretDown"
                  />
                ) : (
                  <img className="w-4 sm:w-5" src={caretUp.src} alt="caretUp" />
                )}
                <span className="font-thin text-xs">Efectividad</span>
              </div>
            </th>
            <th title="Ordenar por puntos estimados" onClick={sortByPoints}>
              <div className="cursor-pointer align-middle flex items-center">
                {pointsSort === "asc" ? (
                  <img
                    className="w-4 sm:w-5"
                    src={caretDown.src}
                    alt="caretDown"
                  />
                ) : (
                  <img className="w-4 sm:w-5" src={caretUp.src} alt="caretUp" />
                )}
                <span className="font-thin text-xs">Pts estimados</span>
              </div>
            </th>
            <th title="Ordenar por promedio estimado" onClick={sortByAverage}>
              <div className="cursor-pointer align-middle flex items-center">
                {averageSort === "asc" ? (
                  <img
                    className="w-4 sm:w-5"
                    src={caretDown.src}
                    alt="caretDown"
                  />
                ) : (
                  <img className="w-4 sm:w-5" src={caretUp.src} alt="caretUp" />
                )}
                <span className="font-thin text-xs">Prom. estimado</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody ref={animationParent}>
          {results.map((equipo: CompletePrediction) => (
            <Row key={equipo.nombre} equipo={equipo} />
          ))}
        </tbody>
      </table>
    </>
  );
}
