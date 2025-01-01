import { PredictionController } from "@controllers/Prediction";
import { verifyToken } from "@libs/auth";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  const urlParams = new URL(request.url);
  const params = new URLSearchParams(urlParams.search);

  if (params.toString()) {
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

    const position = params.get("position");
    const name = params.get("name");
    const classification = params.get("classification");

    if (position) {
      try {
        const data = await PredictionController.getPredictionByPosition(
          parseInt(position)
        );

        return new Response(JSON.stringify(data), {
          status: 200,
          headers: {
            "content-type": "application/json",
          },
        });
      } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: error.status || 500,
          statusText: error.statusText || "Server Error",
        });
      }
    }

    if (name) {
      try {
        const data = await PredictionController.getPredictionByTeamName(name);

        return new Response(JSON.stringify(data), {
          status: 200,
          headers: {
            "content-type": "application/json",
          },
        });
      } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: error.status || 500,
          statusText: error.statusText || "Server Error",
        });
      }
    }

    if (classification) {
      try {
        const data = await PredictionController.getTeamsInClassification(
          classification
        );

        return new Response(JSON.stringify(data), {
          status: 200,
          headers: {
            "content-type": "application/json",
          },
        });
      } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: error.status || 500,
          statusText: error.statusText || "Server Error",
        });
      }
    }
  } else {
    try {
      const data = await PredictionController.getFullPrediction();

      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        statusText: "Error al obtener la información del servidor",
      });
    }
  }

  return new Response(null, {
    status: 400,
    statusText: "Bad Request",
  });
};
