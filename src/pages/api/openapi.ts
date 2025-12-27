import type { APIRoute } from "astro";
import { corsHeaders, handleOptionsRequest } from "@shared/http/cors";
import { openapi } from "@openapi/openapi";

export const OPTIONS: APIRoute = async () => handleOptionsRequest();

export const GET: APIRoute = async ({ request }) => {
  const domain = request.url;
  
  try {
    const swaggerSpec = await openapi(domain);

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
