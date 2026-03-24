import pino from "pino";

const mode = import.meta.env.MODE;
const level = mode === "test" ? "silent" : import.meta.env.PROD ? "info" : "debug";

export const logger = pino({
  level,
  browser: {
    asObject: true,
  },
});
