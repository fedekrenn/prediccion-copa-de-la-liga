// Components
import Row from "./Row.tsx";
// Libraries
import { useAutoAnimate } from "@formkit/auto-animate/react";
// Types
import type { CompletePrediction } from "../types/teamPrediction";

type Params = {
  sortedResults: CompletePrediction[];
};

export default function Tbody({ sortedResults }: Params) {
  const [animationParent] = useAutoAnimate({ duration: 400 });

  return (
    <tbody ref={animationParent}>
      {sortedResults.map((team) => (
        <Row key={team.name} teamData={team} />
      ))}
    </tbody>
  );
}
