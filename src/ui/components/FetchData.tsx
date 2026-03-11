// React
import { useEffect, useState } from "react";
// Components
import TabsSelector from "./TabsSelector";
import LoaderContainer from "./LoaderContainer";
// Libraries
import { toast, Toaster } from "sonner";
// Context
import { useResults } from "@contexts/results";

export default function FetchData() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const setResults = useResults((state) => state.setResults);

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => {
      controller.abort();
    }, 15000);

    fetch("/api/prediction", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setError(null);
        setResults(data);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          setError("La carga esta demorando mas de lo esperado. Proba refrescar.");
          setResults([]);
          return;
        }
        toast.error(error.message);
        setError("No pudimos cargar las predicciones en este momento.");
        setResults([]);
      })
      .finally(() => {
        window.clearTimeout(timeoutId);
        setLoading(false);
      });

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [setResults]);

  return (
    <section
      className="mx-auto w-full max-w-5xl"
      aria-live="polite"
      aria-busy={loading}
    >
      <Toaster />
      {error && (
        <p role="status" className="mb-4 rounded-2xl border border-rose-300/20 bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-100">
          {error}
        </p>
      )}
      {loading ? <LoaderContainer /> : <TabsSelector />}
    </section>
  );
}
