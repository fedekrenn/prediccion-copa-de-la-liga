// Components
import TheadAnnualTable from "@components/Table/Head/AnnualTable";
import AnnualRow from "@components/Table/Row/AnnualTable";
// Libraries
import { useAutoAnimate } from "@formkit/auto-animate/react";
// Types
import type { CompleteTeamData } from "@typos/teamPrediction";

type Params = {
  results: CompleteTeamData[];
};

export default function AnnualTable({ results }: Params) {
  const [animationParent] = useAutoAnimate({ duration: 400 });

  return (
    <table className="w-full mx-auto text-xs sm:text-sm">
      <TheadAnnualTable />
      <tbody ref={animationParent}>
        {results.map((team, i) => (
          <AnnualRow
            key={team.teamInfo.name}
            teamData={team}
            currentPosition={i + 1}
          />
        ))}
      </tbody>
    </table>
  );
}
