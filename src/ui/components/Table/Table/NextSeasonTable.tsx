// Components
import TheadNextSeasonTable from "@components/Table/Head/NextSeasonTable";
import NextSeasonRow from "@components/Table/Row/NextSeasonTable";
// Libraries
import { useAutoAnimate } from "@formkit/auto-animate/react";
// Types
import type { CompleteTeamData } from "@typos/teamPrediction";

type Params = {
  results: CompleteTeamData[];
};

export default function NextSeasonTable({ results }: Params) {
  const [animationParent] = useAutoAnimate({ duration: 400 });

  return (
    <div className="data-table-wrap">
      <table className="data-table mx-auto text-xs sm:text-sm">
        <TheadNextSeasonTable />
        <tbody ref={animationParent}>
          {results.map((team, i) => (
            <NextSeasonRow
              key={team.teamInfo.name}
              teamData={team}
              currentPosition={i + 1}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
