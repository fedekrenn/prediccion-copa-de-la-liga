import QueryProvider from "@ui/providers/QueryProvider";
import FixtureContainer from "./Fixture/FixtureContainer";

export default function FixtureApp() {
  return (
    <QueryProvider>
      <FixtureContainer />
    </QueryProvider>
  );
}
