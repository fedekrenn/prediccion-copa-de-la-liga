import { getTable } from "@prediction/services/main";
import { CustomError } from "@shared/errors/CustomError";
import { ERROR_CODES } from "@shared/errors/errorCodes";

export class Prediction {
  static async getFullPrediction() {
    return getTable();
  }

  static async getPredictionByPosition(position: number) {
    const prediction = await getTable();
    const result = prediction.find(
      (team) => team.predictions.position === position
    );

    if (!result) {
      throw new CustomError(
        "You must provide a valid position from 1 to 28",
        400,
        "Bad Request",
        ERROR_CODES.INVALID_PREDICTION_POSITION,
      );
    }

    return result;
  }

  static async getPredictionByTeamName(teamName: string) {
    const prediction = await getTable();

    const result = prediction.filter((team) =>
      team.teamInfo.name.toLowerCase().includes(teamName.toLowerCase())
    );

    if (result.length === 0) {
      throw new CustomError(
        "You must provide a valid team name",
        400,
        "Bad Request",
        ERROR_CODES.INVALID_PREDICTION_TEAM_NAME,
      );
    }

    return result;
  }

  static async getTeamsInClassification(classification: string) {
    const prediction = await getTable();

    const result = prediction.filter((team) =>
      team.predictions.classification
        .toLowerCase()
        .includes(classification.toLowerCase())
    );

    if (result.length === 0) {
      throw new CustomError(
        "You must provide a valid classification: 'Libertadores', 'Sudamericana', 'noClasificado', 'descensoPorTabla' or 'descensoPromedios'",
        400,
        "Bad Request",
        ERROR_CODES.INVALID_PREDICTION_CLASSIFICATION,
      );
    }

    return result;
  }
}
