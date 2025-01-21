import { DATABASE_URL, DATABASE_TOKEN } from "@config/config";
import { createClient } from "@libsql/client";

export const client = createClient({
  url: DATABASE_URL ?? "",
  authToken: DATABASE_TOKEN ?? "",
});
