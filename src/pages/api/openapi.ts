import type { APIRoute } from "astro";
import fs from "node:fs";
import path from "path";
import yaml from "js-yaml";

export const GET: APIRoute = async () => {
  try {
    const swaggerPath = path.join(process.cwd(), "src/config/swagger.yaml");
    const swaggerContent = fs.readFileSync(swaggerPath, "utf8");
    const swaggerSpec = yaml.load(swaggerContent);

    return new Response(JSON.stringify(swaggerSpec, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to load OpenAPI specification" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
