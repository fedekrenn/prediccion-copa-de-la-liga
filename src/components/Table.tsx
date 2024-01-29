import {useState, useEffect} from 'react';
import type { Prediction } from "../types/tableFormat";
import Row from "./Row.tsx";

export default function Table() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/team-info.json')
      .then(response => response.json())
      .then(data => {
        setResults(data);
        setLoading(false);
      });
  }, []);

  console.log(results);

  return (
    loading ? <p style={{textAlign: 'center'}}>Loading...</p> : (
      <table style={{margin : '0 auto', width: 'auto'}}>
      <thead>
        <tr>
          <th>Posición</th>
          <th className="team-name" style={{width: '220px'}}>Equipo</th>
          <th>% en copa de la liga</th>
          <th className="points" style={{width: '200px'}}>
            Puntos estimados al finalizar el campeonato
          </th>
        </tr>
      </thead>
      <tbody>
        {results.map((equipo: Prediction) => <Row key={equipo.nombre} equipo={equipo} />)}
      </tbody>
    </table>
    )
  );
}
