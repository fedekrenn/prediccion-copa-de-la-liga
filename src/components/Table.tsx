// React
import { useEffect, useState, useRef } from "react";
// Libraries
import { toast, Toaster } from "sonner";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import autoAnimate from "@formkit/auto-animate";
// Components
import Skeleton from "./Skeleton.tsx";
import Row from "./Row.tsx";
// Types
import type { Prediction } from "../types/tableFormat";
// Styles
import styles from "@styles/table.module.css";
// Icons
import caretDown from "@assets/caretDown.svg";
import caretUp from "@assets/caretUp.svg";

export default function Table(props: { children: React.ReactNode }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [efectivitySort, setEfectivitySort] = useState("asc");
  const [pointsSort, setPointsSort] = useState("asc");

  const [animationParent] = useAutoAnimate({ duration: 400 });
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const sortByEfectivity = () => {
    const sortedResults = results.sort((a: Prediction, b: Prediction) => {
      if (efectivitySort === "asc") {
        return a.porcentajeActual - b.porcentajeActual;
      } else {
        return b.porcentajeActual - a.porcentajeActual;
      }
    });
    setResults([...sortedResults]);
    setEfectivitySort(efectivitySort === "asc" ? "desc" : "asc");
  };

  const sortByPoints = () => {
    const sortedResults = results.sort((a: Prediction, b: Prediction) => {
      if (pointsSort === "asc") {
        return a.puntosFinalesEstimados - b.puntosFinalesEstimados;
      } else {
        return b.puntosFinalesEstimados - a.puntosFinalesEstimados;
      }
    });
    setResults([...sortedResults]);
    setPointsSort(pointsSort === "asc" ? "desc" : "asc");
  };

  useEffect(() => {
    fetch("/api/team-info.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setResults(data);
      })
      .catch((error) => {
        toast.error(error.message);
        setResults([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section style={{ maxWidth: "510px", margin: "0 auto" }}>
      <Toaster />
      {loading ? (
        <div className={styles.loaderContainer}>
          <span className={styles.loader}></span>
          <Skeleton width={'100%'} height={50} />
          {Array.from({ length: 28 }).map((_, index) => (
            <Skeleton key={index} width={'100%'} height={32} />
          ))}
        </div>
      ) : (
        <>
          {props.children}
          <table className={styles.table} ref={parent}>
            <thead>
              <tr className={styles.tableHead}>
                <th>Pos</th>
                <th className={styles.teamName}>Equipo</th>
                <th title="Ordenar por efectividad" onClick={sortByEfectivity}>
                  <div className={styles.order}>
                    {efectivitySort === "asc" ? (
                      <img
                        className={styles.caret}
                        src={caretDown.src}
                        alt="caretDown"
                      />
                    ) : (
                      <img
                        className={styles.caret}
                        src={caretUp.src}
                        alt="caretUp"
                      />
                    )}
                    <span>Efectividad</span>
                  </div>
                </th>
                <th title="Ordenar por puntos estimados" onClick={sortByPoints}>
                  <div className={styles.order}>
                    {pointsSort === "asc" ? (
                      <img
                        className={styles.caret}
                        src={caretDown.src}
                        alt="caretDown"
                      />
                    ) : (
                      <img
                        className={styles.caret}
                        src={caretUp.src}
                        alt="caretUp"
                      />
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
      )}
    </section>
  );
}
