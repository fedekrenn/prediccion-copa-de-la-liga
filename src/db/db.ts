// import { DATABASE_URL, DATABASE_TOKEN } from "@config/config";
import { config } from "@config/config";
import { createClient } from "@libsql/client";

const { DATABASE_URL, DATABASE_TOKEN } = config.keys;

export const client = createClient({
  url: DATABASE_URL ?? "",
  authToken: DATABASE_TOKEN ?? "",
});
