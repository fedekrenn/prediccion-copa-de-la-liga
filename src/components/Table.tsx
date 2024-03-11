// React
import { useEffect, useState } from "react";
// Libraries
import { toast, Toaster } from "sonner";
// Components
import TableContainer from "./TableContainer.tsx";
import LoaderContainer from "./LoaderContainer.tsx";
// Types
import type { Prediction } from "../types/tableFormat";

export default function Table() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [efectivitySort, setEfectivitySort] = useState("asc");
  const [pointsSort, setPointsSort] = useState("asc");

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
    <section className="max-w-lg mx-auto">
      <Toaster />
      {loading ? (
        <LoaderContainer />
      ) : (
        <TableContainer
          results={results}
          sortByEfectivity={sortByEfectivity}
          sortByPoints={sortByPoints}
          efectivitySort={efectivitySort}
          pointsSort={pointsSort}
        />
      )}
    </section>
  );
}
