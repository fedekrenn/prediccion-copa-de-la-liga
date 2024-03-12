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
import type { Prediction } from "../types/tableFormat";

export default function TableContainer({
  efectivitySort,
  pointsSort,
  results,
  sortByPoints,
  sortByEfectivity,
}: {
  efectivitySort: string;
  pointsSort: string;
  results: Prediction[];
  sortByPoints: () => void;
  sortByEfectivity: () => void;
}) {
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
            <th>Pos</th>
            <th className="w-[150px] sm:w-[220px]">Equipo</th>
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
                <span>Efectividad</span>
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
                <span>Pts estimados</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody ref={animationParent}>
          {results.map((equipo: Prediction) => (
            <Row key={equipo.nombre} equipo={equipo} />
          ))}
        </tbody>
      </table>
    </>
  );
}
