import { main } from "@services/main";
import { verifyToken } from "@libs/auth";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  const token = request.headers.get("Authorization");

  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      statusText: "Unauthorized",
    });
  }

  const payload = verifyToken(token);

  if (!payload) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      statusText: "Unauthorized",
    });
  }

  try {
    const data = await main();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (error: any) {
    return new Response(null, {
      status: 500,
      statusText: "Error al obtener la información del servidor",
    });
  }
};
