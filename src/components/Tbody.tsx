import { useEffect } from "react";
// Components
import Row from "@components/Row.tsx";
// Libraries
import { useAutoAnimate } from "@formkit/auto-animate/react";
// Types
import type { CompleteTeamData } from "@typos/teamPrediction";
// Context
import { useActiveTab } from "@contexts/activeTab";

interface Params {
  results: CompleteTeamData[];
}

export default function Tbody({ results }: Params) {
  const [animationParent] = useAutoAnimate({ duration: 400 });

  const activeTab = useActiveTab((state) => state.activeTab);

  useEffect(() => {
    results.sort(
      (a, b) =>
        b.predictions.estimatedTotalPoints - a.predictions.estimatedTotalPoints
    );
  }, [activeTab]);

  const resultsWithCurrentPosition =
    activeTab === "current"
      ? results.sort(
          (a, b) => b.currentData.totalPoints - a.currentData.totalPoints
        )
      : results;

  return (
    <tbody ref={animationParent}>
      {resultsWithCurrentPosition.map((team, i) => (
        <Row key={team.teamInfo.name} teamData={team} currentPosition={i + 1} />
      ))}
    </tbody>
  );
}
