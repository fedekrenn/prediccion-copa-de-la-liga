import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import TabsSelector from "./TabsSelector";
import LoaderContainer from "./LoaderContainer";
import { toast, Toaster } from "sonner";
import { useResults } from "@contexts/results";
import {
  buildApiRequestError,
  getSpanishApiErrorMessage,
} from "@ui/lib/apiError";

export default function FetchData() {
  const setResults = useResults((state) => state.setResults);
  const toastShownRef = useRef(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["prediction"],
    queryFn: async ({ signal }) => {
      const response = await fetch("/api/prediction", { signal });
      if (!response.ok) {
        throw await buildApiRequestError(response);
      }
      const result = await response.json();
      setResults(result);
      return result;
    },
    staleTime: 1000 * 60 * 5,
  });

  const localizedErrorMessage = error
    ? getSpanishApiErrorMessage(
        error,
        "No pudimos cargar las predicciones en este momento.",
      )
    : null;

  // Mostrar toast de error solo una vez
  if (error && !toastShownRef.current) {
    toastShownRef.current = true;
    toast.error(
      localizedErrorMessage ??
        "No pudimos cargar las predicciones en este momento.",
    );
  }
  if (!error && toastShownRef.current) {
    toastShownRef.current = false;
  }

  const errorMessage = localizedErrorMessage;

  return (
    <section
      className="mx-auto w-full max-w-5xl"
      aria-live="polite"
      aria-busy={isLoading}
    >
      <Toaster />
      {errorMessage && (
        <p role="status" className="mb-4 rounded-2xl border border-rose-300/20 bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-100">
          {errorMessage}
        </p>
      )}
      {isLoading ? <LoaderContainer /> : data ? <TabsSelector /> : null}
    </section>
  );
}
