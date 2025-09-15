import { PredictionController } from "@controllers/Prediction";
import { verifyToken } from "@libs/auth";
import { createCorsResponse, handleOptionsRequest } from "@utils/cors";
import { isValidBearerToken } from "@utils/isValidBearerToken";
import type { APIRoute } from "astro";

export const OPTIONS: APIRoute = async () => handleOptionsRequest();

export const GET: APIRoute = async ({ request }) => {
  const urlParams = new URL(request.url);
  const params = new URLSearchParams(urlParams.search);

  if (params.toString()) {
    const token = isValidBearerToken(request.headers.get("Authorization"));

    if (!token) {
      return createCorsResponse(
        JSON.stringify({
          error: "You are not authorized to access this resource",
        }),
        401
      );
    }

    try {
      const payload = await verifyToken(token);

      if (!payload) {
        return createCorsResponse(
          JSON.stringify({
            error: "You are not authorized to access this resource",
          }),
          401
        );
      }
    } catch (error: any) {
      return createCorsResponse(
        JSON.stringify({ error: error.message }),
        error.status || 401
      );
    }

    const position = params.get("position");
    const name = params.get("name");
    const classification = params.get("classification");

    if (position) {
      try {
        const data = await PredictionController.getPredictionByPosition(
          parseInt(position)
        );

        return createCorsResponse(JSON.stringify(data), 200);
      } catch (error: any) {
        return createCorsResponse(
          JSON.stringify({ error: error.message }),
          error.status || 500
        );
      }
    }

    if (name) {
      try {
        const data = await PredictionController.getPredictionByTeamName(name);

        return createCorsResponse(JSON.stringify(data), 200);
      } catch (error: any) {
        return createCorsResponse(
          JSON.stringify({ error: error.message }),
          error.status || 500
        );
      }
    }

    if (classification) {
      try {
        const data = await PredictionController.getTeamsInClassification(
          classification
        );

        return createCorsResponse(JSON.stringify(data), 200);
      } catch (error: any) {
        return createCorsResponse(
          JSON.stringify({ error: error.message }),
          error.status || 500
        );
      }
    }
  } else {
    try {
      const data = await PredictionController.getFullPrediction();

      return createCorsResponse(JSON.stringify(data), 200);
    } catch (error: any) {
      return createCorsResponse(JSON.stringify({ error: error.message }), 500);
    }
  }

  return createCorsResponse(JSON.stringify({ error: "Bad Request" }), 400);
};
