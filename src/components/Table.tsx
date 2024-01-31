import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import Row from "./Row.tsx";
import type { Prediction } from "../types/tableFormat";

export default function Table() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/team-info.json")
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setResults(data);
        setLoading(false);
      })
      .catch(error => {
        toast.error(error.message);
        setLoading(false);
        setResults([]);
      });
  }, []);

  return (
    <>
      <Toaster />
      {loading
        ? <span className="loader"></span>
        : (
          <table style={{ margin: "0 auto", width: "auto" }}>
            <thead>
              <tr>
                <th>Pos</th>
                <th className="team-name" style={{ width: "220px" }}>Equipo</th>
                <th>% Efectividad</th>
                <th className="points">Pts estimados</th>
              </tr>
            </thead>
            <tbody>
              {results.map((equipo: Prediction) => (
                <Row key={equipo.nombre} equipo={equipo} />
              ))}
            </tbody>
          </table>
        )}
    </>
  );
}
