import { useEffect, useState, useRef } from "react";
import { toast, Toaster } from "sonner";
import Skeleton from "./Skeleton.tsx";
import Row from "./Row.tsx";
import type { Prediction } from "../types/tableFormat";
import styles from "./styles/table.module.css";
// Autoanimate
import autoAnimate from "@formkit/auto-animate";
import { useAutoAnimate } from "@formkit/auto-animate/react";

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
    setPointsSort(pointsSort === "asc" ? "desc" : "asc");
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
    setEfectivitySort(efectivitySort === "asc" ? "desc" : "asc");
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
    <>
      <Toaster />
      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <span className="loader"></span>
          <Skeleton width={450} height={50} center />
          {Array.from({ length: 20 }).map((_, index) => (
            <Skeleton width={450} height={32} center key={index} />
          ))}
        </div>
      ) : (
        <>
          {props.children}
          <table style={{ margin: "0 auto", width: "auto" }} ref={parent}>
            <thead>
              <tr className={styles.tableHead}>
                <th>Pos</th>
                <th className="team-name" style={{ width: "220px" }}>
                  Equipo
                </th>
                <th
                  title="Ordenar por efectividad"
                  className={styles.pointer}
                  onClick={sortByEfectivity}
                >
                  Efectividad
                </th>
                <th
                  title="Ordenar por puntos estimados"
                  className={styles.pointer}
                  onClick={sortByPoints}
                >
                  Pts estimados
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
    </>
  );
}
