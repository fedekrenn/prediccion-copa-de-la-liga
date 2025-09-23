import { use, useEffect } from "react";
// Components
import Row from "@components/Row.tsx";
// Libraries
import { useAutoAnimate } from "@formkit/auto-animate/react";
// Types
import type { CompleteTeamData } from "@typos/teamPrediction";
import type { TabType } from "@typos/tabs";

type Params = {
  sortedResults: CompleteTeamData[];
  activeTab: TabType;
};

export default function Tbody({ sortedResults, activeTab }: Params) {
  const [animationParent] = useAutoAnimate({ duration: 400 });

  useEffect(() => {
    sortedResults.sort(
      (a, b) =>
        b.predictions.estimatedTotalPoints - a.predictions.estimatedTotalPoints
    );
  }, [activeTab]);

  const resultsWithCurrentPosition =
    activeTab === "current"
      ? sortedResults.sort(
          (a, b) => b.currentData.totalPoints - a.currentData.totalPoints
        )
      : sortedResults;

  return (
    <tbody ref={animationParent}>
      {resultsWithCurrentPosition.map((team, i) => (
        <Row
          key={team.teamInfo.name}
          teamData={team}
          activeTab={activeTab}
          currentPosition={i + 1}
        />
      ))}
    </tbody>
  );
}
