import { verifyToken } from "@auth/tokenService";
import { isValidBearerToken } from "@shared/auth/isValidBearerToken";
import { Prediction } from "@prediction/Prediction";
import { CustomError } from "@shared/errors/CustomError";
import { ERROR_CODES } from "@shared/errors/errorCodes";

interface PredictionParams {
  position?: string;
  name?: string;
  classification?: string;
}

export const getPrediction = async (
  authHeader: string | null,
  params: PredictionParams,
) => {
  const { position, name, classification } = params;

  const hasParams = [position, name, classification].some(
    (param) => param !== undefined,
  );

  if (hasParams) {
    const token = isValidBearerToken(authHeader);

    if (!token) {
      throw new CustomError(
        "You are not authorized to access this resource",
        401,
        "Unauthorized",
        ERROR_CODES.UNAUTHORIZED,
      );
    }

    try {
      const decodedToken = await verifyToken(token);

      if (!decodedToken) {
        throw new CustomError(
          "You are not authorized to access this resource",
          401,
          "Unauthorized",
          ERROR_CODES.UNAUTHORIZED,
        );
      }
    } catch (error: any) {
      if (error.message === "Token expired") {
        throw new CustomError(
          "Token has expired. Please obtain a new token.",
          401,
          "Unauthorized",
          ERROR_CODES.TOKEN_EXPIRED,
        );
      }
      if (error.message === "Invalid token") {
        throw new CustomError(
          "Invalid token provided.",
          401,
          "Unauthorized",
          ERROR_CODES.INVALID_TOKEN,
        );
      }

      throw new CustomError(
        "Token validation failed. Please obtain a new token.",
        401,
        "Unauthorized",
        ERROR_CODES.TOKEN_VALIDATION_FAILED,
      );
    }

    if (name) {
      return await Prediction.getPredictionByTeamName(name);
    }

    if (classification) {
      return await Prediction.getTeamsInClassification(classification);
    }

    if (position) {
      return await Prediction.getPredictionByPosition(parseInt(position));
    }

    throw new CustomError(
      "Invalid parameters",
      400,
      "Bad Request",
      ERROR_CODES.INVALID_PARAMETERS,
    );
  }

  return await Prediction.getFullPrediction();
};
