import { GoogleGenAI } from "@google/genai";
import { config } from "@config/config";

const ai = new GoogleGenAI({
  apiKey: config.gemini.API_KEY,
});

const systemInstruction =
  "Eres un asistente que brinda un panorama de equipos de fútbol en base a sus estadísticas y desempeño reciente. Proporciona información concisa y relevante sobre los equipos de fútbol, incluyendo su rendimiento en la temporada actual. Responde de manera clara y precisa a las preguntas relacionadas con los equipos de fútbol.";

const contents =
  "Club: Instituto Atlético Central Córdoba\n" +
  "Estadísticas: En la temporada actual, Instituto Atlético Central Córdoba ha jugado 18 partidos, con 5 victorias, 3 empates y 7 derrotas.\n" +
  "Desempeño reciente: En el campeonato actual, Instituto Atlético Central Córdoba tiene un 40% de efectividad";

export const main = async () => {
  console.log("Generating content with Gemini AI...");

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents,
    config: {
      systemInstruction,
    },
  });
  console.log(response.text);
};
