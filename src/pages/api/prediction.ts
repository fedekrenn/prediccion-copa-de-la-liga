import { PredictionController } from "@controllers/Prediction";
import { verifyToken } from "@libs/auth";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  const urlParams = new URL(request.url);
  const params = new URLSearchParams(urlParams.search);

  if (params) {
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
        return new Response(null, {
          status: 500,
          statusText: "Error al obtener la información del servidor",
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
        return new Response(null, {
          status: 500,
          statusText: "Error al obtener la información del servidor",
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
        return new Response(null, {
          status: 500,
          statusText: "Error al obtener la información del servidor",
        });
      }
    }
  }

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
    const data = await PredictionController.getFullPrediction();

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
