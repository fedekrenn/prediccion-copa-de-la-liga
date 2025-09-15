import type { APIRoute } from "astro";
import fs from "node:fs/promises";
import path from "path";
import yaml from "js-yaml";
import { corsHeaders, handleOptionsRequest } from "@utils/cors";
import type { OpenApiDocument } from "@typos/api";

export const OPTIONS: APIRoute = async () => handleOptionsRequest();

export const GET: APIRoute = async ({ request }) => {
  try {
    const swaggerPath = path.join(process.cwd(), "src/config/swagger.yaml");
    const swaggerContent = await fs.readFile(swaggerPath, "utf8");
    const swaggerSpec: OpenApiDocument = yaml.load(
      swaggerContent
    ) as OpenApiDocument;

    const url = new URL(request.url);
    const isLocalhost =
      url.hostname === "localhost" || url.hostname === "127.0.0.1";

    if (isLocalhost) {
      swaggerSpec.servers.push({
        url: `http://${url.host}/api`,
        description: "Local development server",
      });
    }

    return new Response(JSON.stringify(swaggerSpec, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to load OpenAPI specification" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  }
};
