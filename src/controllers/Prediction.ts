import { main } from "@services/main";

class CustomError extends Error {
  status: number;
  statusText: string;

  constructor(message: string, status: number, statusText: string) {
    super(message);
    this.status = status;
    this.statusText = statusText;
  }
}

export class PredictionController {
  static async getFullPrediction() {
    try {
      return await main();
    } catch (error) {
      throw error;
    }
  }

  static async getPredictionByPosition(position: number) {
    try {
      const prediction = await main();
      const result = prediction.find((team) => team.position === position);

      if (!result) {
        throw new CustomError(
          "You must provide a valid position from 1 to 28",
          400,
          "Bad Request"
        );
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getPredictionByTeamName(teamName: string) {
    try {
      const prediction = await main();

      const result = prediction.filter((team) =>
        team.name.toLowerCase().includes(teamName.toLowerCase())
      );

      if (result.length === 0) {
        throw new CustomError(
          "You must provide a valid team name",
          400,
          "Bad Request"
        );
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getTeamsInClassification(classification: string) {
    try {
      const prediction = await main();

      const result = prediction.filter((team) =>
        team.classification.toLowerCase().includes(classification.toLowerCase())
      );

      if (result.length === 0) {
        throw new CustomError(
          "You must provide a valid classification: 'Libertadores', 'Sudamericana', 'noClasificado', 'descensoPorTabla' o 'descensoPromedios'",
          400,
          "Bad Request"
        );
      }

      return result;
    } catch (error) {
      throw error;
    }
  }
}
