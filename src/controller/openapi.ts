import fs from "node:fs/promises";
import path from "path";
import yaml from "js-yaml";
import type { OpenApiDocument } from "@typos/api";

export const openapi = async (domain: string) => {
  const swaggerPath = path.join(process.cwd(), "src/config/swagger.yaml");
  const swaggerContent = await fs.readFile(swaggerPath, "utf8");
  const swaggerSpec: OpenApiDocument = yaml.load(
    swaggerContent
  ) as OpenApiDocument;

  const url = new URL(domain);
  const isLocalhost =
    url.hostname === "localhost" || url.hostname === "127.0.0.1";

  if (isLocalhost) {
    swaggerSpec.servers.push({
      url: `http://${url.host}/api`,
      description: "Local development server",
    });
  }

  return swaggerSpec;
};
