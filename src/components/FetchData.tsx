// React
import { useEffect, useState } from "react";
// Components
import TabsContainer from "./TabsContainer.tsx";
import LoaderContainer from "./LoaderContainer.tsx";
// Libraries
import { toast, Toaster } from "sonner";
// Types
import type { CompleteTeamData } from "@typos/teamPrediction";

export default function FetchData() {
  const [results, setResults] = useState<CompleteTeamData[]>([]);
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
      {loading ? <LoaderContainer /> : <TabsContainer results={results} />}
    </section>
  );
}
