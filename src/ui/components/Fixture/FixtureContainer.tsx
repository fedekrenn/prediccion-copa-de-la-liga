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
      <div className="bg-[#0c151c] rounded-xl overflow-hidden border border-[#1a2634]">
        <Skeleton width="100%" height={40} />
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} width="100%" height={36} />
        ))}
      </div>
    );
  }

  if (error || !fixture) {
    return null;
  }

  return (
    <div className="bg-[#0c151c] rounded-xl overflow-hidden border border-[#1a2634]">
      <div className="bg-[#143b2a] text-center py-3">
        <h3 className="text-sm sm:text-base font-bold text-green-100 uppercase tracking-widest">
          Temporada
        </h3>
      </div>

      <div className="flex items-center justify-center gap-4 py-2.5 bg-[#0f1923]">
        <h4 className="text-sm font-semibold text-gray-200">
          ⚽ {fixture.roundName}
        </h4>
      </div>

      <div>
        {fixture.days.map((day) => (
          <FixtureDayGroup key={day.date} day={day} />
        ))}
      </div>
    </div>
  );
}
