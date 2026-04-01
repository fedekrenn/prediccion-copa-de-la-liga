import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import FixtureDayGroup from "./FixtureDayGroup";
import Skeleton from "@components/Skeleton";
import {
  buildApiRequestError,
  getSpanishApiErrorMessage,
} from "@ui/lib/apiError";
import type { FixtureRoundsResponse, FixtureRound } from "@typos/fixture";

export default function FixtureContainer() {
  const [selectedRound, setSelectedRound] = useState<number | null>(null);

  const {
    data: roundsData,
    isLoading: roundsLoading,
    error: roundsError,
  } = useQuery({
    queryKey: ["fixture-rounds"],
    queryFn: async ({ signal }) => {
      const response = await fetch("/api/fixture/rounds", { signal });
      if (!response.ok) throw await buildApiRequestError(response);
      return response.json() as Promise<FixtureRoundsResponse>;
    },
  });

  const activeRound = selectedRound ?? roundsData?.currentRound ?? null;

  const {
    data: fixtureData,
    isLoading: fixtureLoading,
    error: fixtureError,
    isFetching: fixtureFetching,
  } = useQuery({
    queryKey: ["fixture", activeRound],
    queryFn: async ({ signal }) => {
      const response = await fetch(`/api/fixture?round=${activeRound}`, { signal });
      if (!response.ok) throw await buildApiRequestError(response);
      return response.json() as Promise<FixtureRound>;
    },
    enabled: activeRound !== null,
  });

  const rounds = roundsData?.rounds ?? [];

  const selectedRoundIndex = useMemo(() => {
    if (activeRound === null) return -1;
    return rounds.indexOf(activeRound);
  }, [rounds, activeRound]);

  const goToPreviousRound = () => {
    if (selectedRoundIndex <= 0) return;
    setSelectedRound(rounds[selectedRoundIndex - 1]);
  };

  const goToNextRound = () => {
    if (selectedRoundIndex === -1 || selectedRoundIndex >= rounds.length - 1) return;
    setSelectedRound(rounds[selectedRoundIndex + 1]);
  };

  const isInitialLoading = roundsLoading || (fixtureLoading && !fixtureData);
  const isRoundLoading = fixtureFetching;

  if (isInitialLoading) {
    return (
      <div className="fixture-card">
        <Skeleton width="100%" height={88} />
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} width="100%" height={56} />
        ))}
      </div>
    );
  }

  const error = roundsError || fixtureError;
  if (error || !fixtureData) {
    const errorMessage = roundsError
      ? getSpanishApiErrorMessage(
          roundsError,
          "No pudimos cargar las fechas disponibles en este momento.",
        )
      : getSpanishApiErrorMessage(
          fixtureError,
          "No pudimos cargar la fecha seleccionada en este momento.",
        );

    return (
      <div className="fixture-card px-5 py-5 sm:px-6" role="alert">
        <p className="text-sm font-semibold text-rose-200">{errorMessage}</p>
      </div>
    );
  }

  return (
    <div className="fixture-card" aria-live="polite" aria-busy={isRoundLoading}>
      <div className="fixture-header px-5 py-5 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/70">
              Calendario
            </p>
            <h3 className="mt-1 text-xl font-bold text-white sm:text-2xl">
              Fixture por fecha
            </h3>
          </div>

          <span className="accent-chip">{fixtureData.roundName}</span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={goToPreviousRound}
            disabled={selectedRoundIndex <= 0 || isRoundLoading}
            className="rounded-full border border-white/15 px-3 py-1 text-sm font-semibold text-slate-200 transition hover:bg-white/8 disabled:cursor-not-allowed disabled:opacity-45"
            aria-label="Ir a la fecha anterior"
          >
            &lt;
          </button>

          <label
            htmlFor="fixture-round"
            className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-300"
          >
            Fecha
          </label>
          <select
            id="fixture-round"
            value={activeRound ?? ""}
            onChange={(event) => setSelectedRound(Number(event.target.value))}
            disabled={isRoundLoading || rounds.length === 0}
            className="rounded-full border border-white/15 bg-slate-900/85 px-3 py-1 text-sm font-medium text-slate-100"
          >
            {activeRound === null && (
              <option value="" disabled>
                Seleccionar
              </option>
            )}
            {rounds.map((round) => (
              <option key={round} value={round}>
                Fecha {round}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={goToNextRound}
            disabled={
              selectedRoundIndex === -1 ||
              selectedRoundIndex >= rounds.length - 1 ||
              isRoundLoading
            }
            className="rounded-full border border-white/15 px-3 py-1 text-sm font-semibold text-slate-200 transition hover:bg-white/8 disabled:cursor-not-allowed disabled:opacity-45"
            aria-label="Ir a la fecha siguiente"
          >
            &gt;
          </button>

          {isRoundLoading && (
            <span className="ml-1 inline-flex items-center gap-2 text-xs font-medium text-emerald-100/90">
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-emerald-300/80 border-t-transparent" />
              Cargando fecha...
            </span>
          )}
        </div>
      </div>

      <div className="border-b border-white/8 bg-white/3 px-5 py-3 text-sm text-slate-400 sm:px-6">
        Resultados, partidos en juego y horarios programados.
      </div>

      <div>
        {fixtureData.days.map((day) => (
          <FixtureDayGroup key={day.date} day={day} />
        ))}
      </div>
    </div>
  );
}
