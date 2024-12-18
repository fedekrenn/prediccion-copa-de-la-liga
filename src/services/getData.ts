import format from "@utils/format";
import type { TeamInfo } from "@typos/teamPrediction";

export default function getData(
  extractedData: cheerio.Cheerio,
  cheerioRoot: cheerio.Root
): TeamInfo[] {
  return format(extractedData, cheerioRoot);
}
