// Components
import Row from "./Row.tsx";
// Libraries
import { useAutoAnimate } from "@formkit/auto-animate/react";
// Types
import type { FinalData } from "@typos/teamPrediction";

type Params = {
  sortedResults: FinalData[];
};

export default function Tbody({ sortedResults }: Params) {
  const [animationParent] = useAutoAnimate({ duration: 400 });

  return (
    <tbody ref={animationParent}>
      {sortedResults.map((team) => (
        <Row key={team.teamInfo.name} teamData={team} />
      ))}
    </tbody>
  );
}
