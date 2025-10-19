// Components
import TheadActualTable from "@components/Table/Head/ActualTable";
import Tbody from "@components/Table/Table/Tbody/Tbody";
// Types
import type { CompleteTeamData } from "@typos/teamPrediction";

type Params = {
  results: CompleteTeamData[];
};

export default function SimpleTable({ results }: Params) {
  return (
    <table className="w-full mx-auto text-xs sm:text-sm">
      <TheadActualTable />
      <Tbody results={results} />
    </table>
  );
}
