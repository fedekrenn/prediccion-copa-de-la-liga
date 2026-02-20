import { config } from "@config/config";
import { extractFixtureData } from "./extractFixtureData";
import type { FixtureRound } from "@typos/fixture";

const NEXT_DATA_REGEX =
  /<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/s;

export const getFixture = async (): Promise<FixtureRound> => {
  const response = await fetch(config.api.URL, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      Accept: "text/html",
    },
  });

  const html = await response.text();
  const match = html.match(NEXT_DATA_REGEX);

  if (!match) throw new Error("No se pudo extraer __NEXT_DATA__ de la página.");

  const nextData = JSON.parse(match[1]);
  const data = nextData.props.pageProps.data;

  if (!data || !data.games) {
    throw new Error("No se encontró la información de partidos.");
  }

  return extractFixtureData(data.games);
};
