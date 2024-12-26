import { main } from "@services/main";

export class PredictionController {
  static async getFullPrediction() {
    try {
      const prediction = await main();
      return prediction;
    } catch (error) {
      return error;
    }
  }

  static async getPredictionByPosition(position: number) {
    try {
      const prediction = await main();
      return prediction.find((team) => team.position === position);
    } catch (error) {
      return error;
    }
  }

  static async getPredictionByTeamName(teamName: string) {
    try {
      const prediction = await main();
      return prediction.filter((team) => team.name.toLowerCase().includes(teamName.toLowerCase()));
    } catch (error) {
      return error;
    }
  }

  static async getTeamsInClassification(classification: string) {
    try {
      const prediction = await main();
      return prediction.filter((team) => team.classification.toLowerCase().includes(classification.toLowerCase()));
    } catch (error) {
      return error;
    }
  }
}
