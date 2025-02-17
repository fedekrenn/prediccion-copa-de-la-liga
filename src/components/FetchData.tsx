// React
import { useEffect, useState } from "react";
// Libraries
import { toast, Toaster } from "sonner";
// Components
import TableContainer from "./TableContainer.tsx";
import LoaderContainer from "./LoaderContainer.tsx";
// Types
import type { FinalData } from "@typos/teamPrediction";

export default function FetchData() {
  const [results, setResults] = useState<FinalData[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    fetch("/api/prediction")
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
      {loading ? <LoaderContainer /> : <TableContainer results={results} />}
    </section>
  );
}
