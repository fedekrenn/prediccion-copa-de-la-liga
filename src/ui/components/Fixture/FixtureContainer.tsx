import { useEffect, useMemo, useRef, useState } from "react";
import { useFixture } from "@contexts/fixture";
import FixtureDayGroup from "./FixtureDayGroup";
import Skeleton from "@components/Skeleton";
import type { FixtureRoundsResponse } from "@typos/fixture";

export default function FixtureContainer() {
  const { fixture, loading, error, setFixture, setLoading, setError } = useFixture();
  const [rounds, setRounds] = useState<number[]>([]);
  const [selectedRound, setSelectedRound] = useState<number | null>(null);
  const [isRoundLoading, setIsRoundLoading] = useState(false);
  const hasLoadedFixture = useRef(false);

  const selectedRoundIndex = useMemo(() => {
    if (selectedRound === null) {
      return -1;
    }
    return rounds.indexOf(selectedRound);
  }, [rounds, selectedRound]);

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => {
      controller.abort();
    }, 15000);

    setLoading(true);
    hasLoadedFixture.current = false;
    setError(null);

    fetch("/api/fixture/rounds", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((data: FixtureRoundsResponse) => {
        if (!data.rounds || data.rounds.length === 0) {
          throw new Error("No hay fechas disponibles para mostrar.");
        }

        setRounds(data.rounds);
        setSelectedRound(data.currentRound);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          setError("La carga de las fechas está demorando. Proba refrescar.");
          return;
        }
        setError("No pudimos cargar las fechas disponibles en este momento.");
      })
      .finally(() => {
        window.clearTimeout(timeoutId);
      });

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [setError, setLoading]);

  useEffect(() => {
    if (selectedRound === null) {
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => {
      controller.abort();
    }, 15000);

    if (!hasLoadedFixture.current) {
      setLoading(true);
    }
    setIsRoundLoading(true);
    setError(null);

    fetch(`/api/fixture?round=${selectedRound}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        setFixture(data);
        hasLoadedFixture.current = true;
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          setError("La carga de la fecha seleccionada está demorando. Proba refrescar.");
          return;
        }
        setError("No pudimos cargar la fecha seleccionada en este momento.");
      })
      .finally(() => {
        window.clearTimeout(timeoutId);
        setIsRoundLoading(false);
      });

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [selectedRound, setError, setFixture, setLoading]);

  const goToPreviousRound = () => {
    if (selectedRoundIndex <= 0) {
      return;
    }

    setSelectedRound(rounds[selectedRoundIndex - 1]);
  };

  const goToNextRound = () => {
    if (selectedRoundIndex === -1 || selectedRoundIndex >= rounds.length - 1) {
      return;
    }

    setSelectedRound(rounds[selectedRoundIndex + 1]);
  };

  if (loading && !hasLoadedFixture.current) {
    return (
      <div className="fixture-card">
        <Skeleton width="100%" height={88} />
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} width="100%" height={56} />
        ))}
      </div>
    );
  }

  if (error || !fixture) {
    return (
      <div className="fixture-card px-5 py-5 sm:px-6" role="alert">
        <p className="text-sm font-semibold text-rose-200">{error}</p>
      </div>
    );
  }

  return (
    <div
      className="fixture-card"
      aria-live="polite"
      aria-busy={loading || isRoundLoading}
    >
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

          <span className="accent-chip">⚽ {fixture.roundName}</span>
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

          <label htmlFor="fixture-round" className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">
            Fecha
          </label>
          <select
            id="fixture-round"
            value={selectedRound ?? ""}
            onChange={(event) => setSelectedRound(Number(event.target.value))}
            disabled={isRoundLoading || rounds.length === 0}
            className="rounded-full border border-white/15 bg-slate-900/85 px-3 py-1 text-sm font-medium text-slate-100"
          >
            {selectedRound === null && (
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
        {fixture.days.map((day) => (
          <FixtureDayGroup key={day.date} day={day} />
        ))}
      </div>
    </div>
  );
}
