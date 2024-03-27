import { useEffect, useRef } from "react";
// Libraries
import autoAnimate from "@formkit/auto-animate";
// Components
import Thead from "./Thead.tsx";
import Tbody from "./Tbody.tsx";
// Types
import type { CompletePrediction } from "../types/tableFormat.ts";

type Params = {
  sortedResults: CompletePrediction[];
  sortByEfectivity: () => void;
  sortByPoints: () => void;
  sortByAverage: () => void;
  efectivitySort: string;
  pointsSort: string;
  averageSort: string;
};

export default function Table({
  sortedResults,
  sortByEfectivity,
  sortByPoints,
  sortByAverage,
  efectivitySort,
  pointsSort,
  averageSort,
}: Params) {
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <table className="w-auto mx-auto text-sm sm:text-base" ref={parent}>
      <Thead
        sortByEfectivity={sortByEfectivity}
        sortByPoints={sortByPoints}
        sortByAverage={sortByAverage}
        efectivitySort={efectivitySort}
        pointsSort={pointsSort}
        averageSort={averageSort}
      />
      <Tbody sortedResults={sortedResults} />
    </table>
  );
}
