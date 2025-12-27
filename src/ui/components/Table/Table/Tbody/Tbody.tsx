// Components
import RowContainer from "@components/Table/RowContainer";
// Libraries
import { useAutoAnimate } from "@formkit/auto-animate/react";
// Types
import type { CompleteTeamData } from "@typos/teamPrediction";

interface Params {
  results: CompleteTeamData[];
}

export default function Tbody({ results }: Params) {
  const [animationParent] = useAutoAnimate({ duration: 400 });

  return (
    <tbody ref={animationParent}>
      {results.map((team, i) => (
        <RowContainer
          key={team.teamInfo.name}
          teamData={team}
          currentPosition={i + 1}
        />
      ))}
    </tbody>
  );
}
