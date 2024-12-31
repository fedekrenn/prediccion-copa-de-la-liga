import { main } from "@services/main";

export class PredictionController {
  static async getFullPrediction() {
    try {
      const prediction = await main();
      return prediction;
    } catch (error) {
      throw error;
    }
  }

  static async getPredictionByPosition(position: number) {
    try {
      const prediction = await main();
      const result = prediction.find((team) => team.position === position);

      if (!result) {
        throw new Error("You must provide a valid position from 1 to 28");
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
        throw new Error("You must provide a valid team name");
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
        throw new Error(
          "You must provide a valid classification: 'Libertadores', 'Sudamericana', 'noClasificado', 'descensoPorTabla' o 'descensoPromedios'"
        );
      }

      return result;
    } catch (error) {
      throw error;
    }
  }
}
