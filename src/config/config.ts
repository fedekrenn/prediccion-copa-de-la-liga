const { SECRET_KEY, DATABASE_URL, DATABASE_TOKEN, PUBLIC_TOKEN } = import.meta
  .env;

export const config = {
  keys: {
    DATABASE_URL,
    DATABASE_TOKEN,
    PUBLIC_TOKEN,
  },
  api: {
    URL: "https://www.promiedos.com.ar/league/liga-profesional/hc",
  },
  auth: {
    SECRET_KEY,
    EXPIRATION_TIME: 60 * 60 * 24 * 365, // 1 year in seconds
  },
  prediction: {
    TOTAL_GAMES: 32,
  },
};
