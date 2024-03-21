// React
import { useEffect, useState } from "react";
// Libraries
import { toast, Toaster } from "sonner";
// Components
import TableContainer from "./TableContainer.tsx";
import LoaderContainer from "./LoaderContainer.tsx";
// Types
import type { CompletePrediction } from "../types/tableFormat";

export default function Table() {
  const [results, setResults] = useState<CompletePrediction[]>([]);
  const [originalResults, setOriginalResults] = useState<CompletePrediction[]>(
    []
  );
  const [loading, setLoading] = useState<Boolean>(true);
  const [noSort, setNoSort] = useState<Boolean>(true);
  const [efectivitySort, setEfectivitySort] = useState<string>("asc");
  const [pointsSort, setPointsSort] = useState<string>("asc");
  const [averageSort, setAverageSort] = useState<string>("asc");

  const sortByEfectivity = () => {
    const sortedResults = results.sort(
      (a: CompletePrediction, b: CompletePrediction) => {
        if (efectivitySort === "asc") {
          return a.porcentajeActual - b.porcentajeActual;
        } else {
          return b.porcentajeActual - a.porcentajeActual;
        }
      }
    );
    setResults([...sortedResults]);
    setEfectivitySort(efectivitySort === "asc" ? "desc" : "asc");
    setNoSort(false);
  };

  const sortByPoints = () => {
    const sortedResults = results.sort(
      (a: CompletePrediction, b: CompletePrediction) => {
        if (pointsSort === "asc") {
          return a.puntosEstimados - b.puntosEstimados;
        } else {
          return b.puntosEstimados - a.puntosEstimados;
        }
      }
    );
    setResults([...sortedResults]);
    setPointsSort(pointsSort === "asc" ? "desc" : "asc");
    setNoSort(false);
  };

  const sortByAverage = () => {
    const sortedResults = results.sort(
      (a: CompletePrediction, b: CompletePrediction) => {
        if (averageSort === "asc") {
          return a.promedioEstimado - b.promedioEstimado;
        } else {
          return b.promedioEstimado - a.promedioEstimado;
        }
      }
    );
    setResults([...sortedResults]);
    setAverageSort(averageSort === "asc" ? "desc" : "asc");
    setNoSort(false);
  };

  const resetSorts = () => {
    setEfectivitySort("asc");
    setPointsSort("asc");
    setAverageSort("asc");
    setResults([...originalResults]);
    setNoSort(true);
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
        setOriginalResults([...data]);
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
        <>
          {noSort ? null : <button onClick={resetSorts}>Reset Sorts</button>}
          <TableContainer
            results={results}
            sortByEfectivity={sortByEfectivity}
            sortByPoints={sortByPoints}
            sortByAverage={sortByAverage}
            efectivitySort={efectivitySort}
            pointsSort={pointsSort}
            averageSort={averageSort}
          />
        </>
      )}
    </section>
  );
}
