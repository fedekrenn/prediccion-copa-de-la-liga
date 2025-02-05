// Components
import Row from "./Row.tsx";
// Libraries
import { useAutoAnimate } from "@formkit/auto-animate/react";
// Types
import type { TablePrediction } from "@typos/teamPrediction";

type Params = {
  sortedResults: TablePrediction[];
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
