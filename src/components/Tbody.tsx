// Components
import Row from "./Row.tsx";
// Libraries
import { useAutoAnimate } from "@formkit/auto-animate/react";
// Types
import type { CompletePrediction } from "../types/tableFormat.ts";

type Params = {
  sortedResults: CompletePrediction[];
};

export default function Tbody({ sortedResults }: Params) {
  const [animationParent] = useAutoAnimate({ duration: 400 });

  return (
    <tbody ref={animationParent}>
      {sortedResults.map((equipo) => (
        <Row key={equipo.nombre} equipo={equipo} />
      ))}
    </tbody>
  );
}
