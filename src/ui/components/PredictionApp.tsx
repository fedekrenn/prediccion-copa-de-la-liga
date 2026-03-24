import QueryProvider from "@ui/providers/QueryProvider";
import FetchData from "./FetchData";

export default function PredictionApp() {
  return (
    <QueryProvider>
      <FetchData />
    </QueryProvider>
  );
}
