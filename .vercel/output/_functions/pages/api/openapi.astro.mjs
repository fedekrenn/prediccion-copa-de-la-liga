import { h as handleOptionsRequest, a as corsHeaders } from '../../chunks/cors_BYRJwiQn.mjs';
import fs from 'node:fs/promises';
import path from 'path';
import yaml from 'js-yaml';
export { renderers } from '../../renderers.mjs';

const openapi = async (domain) => {
  const swaggerPath = path.join(process.cwd(), "src/config/swagger.yaml");
  const swaggerContent = await fs.readFile(swaggerPath, "utf8");
  const swaggerSpec = yaml.load(
    swaggerContent
  );
  const url = new URL(domain);
  const isLocalhost = url.hostname === "localhost" || url.hostname === "127.0.0.1";
  if (isLocalhost) {
    swaggerSpec.servers.push({
      url: `http://${url.host}/api`,
      description: "Local development server"
    });
  }
  return swaggerSpec;
};

const OPTIONS = async () => handleOptionsRequest();
const GET = async ({ request }) => {
  const domain = request.url;
  try {
    const swaggerSpec = await openapi(domain);
    return new Response(JSON.stringify(swaggerSpec, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders
      }
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to load OpenAPI specification" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  OPTIONS
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
