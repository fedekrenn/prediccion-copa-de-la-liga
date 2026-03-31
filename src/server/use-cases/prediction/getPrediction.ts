import { Prediction } from "@prediction/Prediction";
import { CustomError } from "@shared/errors/CustomError";
import { ERROR_CODES } from "@shared/errors/errorCodes";
import { requireProtectedQueryAuth } from "@usecases/auth/requireProtectedQueryAuth";

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
    await requireProtectedQueryAuth(authHeader);

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
