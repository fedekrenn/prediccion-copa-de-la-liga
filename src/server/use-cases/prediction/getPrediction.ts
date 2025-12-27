import { verifyToken } from "@auth/tokenService";
import { isValidBearerToken } from "@shared/auth/isValidBearerToken";
import { Prediction } from "@prediction/Prediction";
import { CustomError } from "@shared/errors/CustomError";

interface PredictionParams {
  position?: string;
  name?: string;
  classification?: string;
}

export const getPrediction = async (
  authHeader: string | null,
  params: PredictionParams
) => {
  const hasParams = Object.values(params).some((param) => param !== undefined);

  if (hasParams) {
    const token = isValidBearerToken(authHeader);

    if (!token) {
      throw new CustomError(
        "You are not authorized to access this resource",
        401,
        "Unauthorized"
      );
    }

    try {
      const decodedToken = await verifyToken(token);

      if (!decodedToken) {
        throw new CustomError(
          "You are not authorized to access this resource",
          401,
          "Unauthorized"
        );
      }
    } catch (error: any) {
      if (error.message === "Token expired") {
        throw new CustomError(
          "Token has expired. Please obtain a new token.",
          401,
          "Unauthorized"
        );
      }
      if (error.message === "Invalid token") {
        throw new CustomError("Invalid token provided.", 401, "Unauthorized");
      }

      throw new CustomError(
        "Token validation failed. Please obtain a new token.",
        401,
        "Unauthorized"
      );
    }

    const { position, name, classification } = params;

    if (name) {
      return await Prediction.getPredictionByTeamName(name);
    }

    if (classification) {
      return await Prediction.getTeamsInClassification(classification);
    }

    if (position) {
      return await Prediction.getPredictionByPosition(parseInt(position));
    }

    throw new CustomError("Invalid parameters", 400, "Bad Request");
  }

  return await Prediction.getFullPrediction();
};
