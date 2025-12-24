import { main } from "@prediction/services/main";
import { CustomError } from "@shared/errors/CustomError";

export class Prediction {
  static async getFullPrediction() {
    return main();
  }

  static async getPredictionByPosition(position: number) {
    const prediction = await main();
    const result = prediction.find(
      (team) => team.predictions.position === position
    );

    if (!result) {
      throw new CustomError(
        "You must provide a valid position from 1 to 28",
        400,
        "Bad Request"
      );
    }

    return result;
  }

  static async getPredictionByTeamName(teamName: string) {
    const prediction = await main();

    const result = prediction.filter((team) =>
      team.teamInfo.name.toLowerCase().includes(teamName.toLowerCase())
    );

    if (result.length === 0) {
      throw new CustomError(
        "You must provide a valid team name",
        400,
        "Bad Request"
      );
    }

    return result;
  }

  static async getTeamsInClassification(classification: string) {
    const prediction = await main();

    const result = prediction.filter((team) =>
      team.predictions.classification
        .toLowerCase()
        .includes(classification.toLowerCase())
    );

    if (result.length === 0) {
      throw new CustomError(
        "You must provide a valid classification: 'Libertadores', 'Sudamericana', 'noClasificado', 'descensoPorTabla' o 'descensoPromedios'",
        400,
        "Bad Request"
      );
    }

    return result;
  }
}
