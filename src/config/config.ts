const { SECRET_KEY, DATABASE_URL, DATABASE_TOKEN, PUBLIC_TOKEN } = import.meta
  .env;

// export const URL = "https://api.promiedos.com.ar/league/tables_and_fixtures/hc";

// export const TOTAL_GAMES = 32;

export const config = {
  keys: {
    SECRET_KEY,
    DATABASE_URL,
    DATABASE_TOKEN,
    PUBLIC_TOKEN,
  },
  api: {
    URL: "https://api.promiedos.com.ar/league/tables_and_fixtures/hc",
  },
  prediction: {
    TOTAL_GAMES: 32,
  },
};
