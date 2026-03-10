import { useEffect } from "react";
import { useFixture } from "@contexts/fixture";
import FixtureDayGroup from "./FixtureDayGroup";
import Skeleton from "@components/Skeleton";

export default function FixtureContainer() {
  const { fixture, loading, error, setFixture, setError } = useFixture();

  useEffect(() => {
    fetch("/api/fixture")
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((data) => setFixture(data))
      .catch((err) => setError(err.message));
  }, []);

  if (loading) {
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
    return null;
  }

  return (
    <div className="fixture-card">
      <div className="fixture-header px-5 py-5 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/70">
              Calendario
            </p>
            <h3 className="mt-1 text-xl font-bold text-white sm:text-2xl">
              Fecha actual de la temporada
            </h3>
          </div>

          <span className="accent-chip">⚽ {fixture.roundName}</span>
        </div>
      </div>

      <div className="border-b border-white/8 bg-white/[0.03] px-5 py-3 text-sm text-slate-400 sm:px-6">
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
