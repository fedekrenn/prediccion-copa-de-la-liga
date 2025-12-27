import jwt from 'jsonwebtoken';
import { createClient } from '@libsql/client';

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "PUBLIC_TOKEN": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZlZGVrcmVubkBnbWFpbC5jb20iLCJpYXQiOjE3MzQ0NzgyMjB9.6Wgvor0PvcMqeXD1oNTrT4DycUKUQtPZGm-02hqAk1E", "SITE": undefined, "SSR": true};
const { SECRET_KEY, DATABASE_URL: DATABASE_URL$1, DATABASE_TOKEN: DATABASE_TOKEN$1, PUBLIC_TOKEN } = Object.assign(__vite_import_meta_env__, { DATABASE_URL: "libsql://prediccion-copa-fedekrenn.turso.io", DATABASE_TOKEN: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzQ0NzYwMDcsImlkIjoiNGYyYTZkOWEtNTIwZi00NzhlLTk5YTgtYTk1YTZhZTY3OTc2In0.Raos2K8XM151Mr9u16tTncQbgLS8J4pggu53Lgg5izSJbvI5Y6_PvVbmggJVxeag72gjSSRgjKVJlVDsh278CQ", SECRET_KEY: "aJdS21GGas!@MAT2", PUBLIC: process.env.PUBLIC });
const config = {
  keys: {
    DATABASE_URL: DATABASE_URL$1,
    DATABASE_TOKEN: DATABASE_TOKEN$1},
  api: {
    URL: "https://api.promiedos.com.ar/league/tables_and_fixtures/hc"
  },
  auth: {
    SECRET_KEY,
    EXPIRATION_TIME: 60 * 60 * 24 * 365
    // 1 year in seconds
  },
  prediction: {
    TOTAL_GAMES: 32
  }
};

const { DATABASE_URL, DATABASE_TOKEN } = config.keys;
const client = createClient({
  url: DATABASE_URL ?? "",
  authToken: DATABASE_TOKEN ?? ""
});

const getTokenFromUser = async (userId) => {
  const userToken = await client.execute({
    sql: "SELECT * FROM tokens WHERE user_id = ?",
    args: [userId]
  });
  if (userToken.rows.length === 0) return null;
  return userToken.rows[0].token;
};
const createToken = async (payload, userId) => {
  const userToken = await getTokenFromUser(userId);
  if (userToken) {
    await client.execute({
      sql: "DELETE FROM tokens WHERE user_id = ?",
      args: [userId]
    });
  }
  const jwtPayload = {
    email: payload,
    userId,
    iat: Math.floor(Date.now() / 1e3)
  };
  const expirationTimeInSeconds = config.auth.EXPIRATION_TIME;
  const expirationDate = new Date(Date.now() + expirationTimeInSeconds * 1e3);
  const token = jwt.sign(jwtPayload, config.auth.SECRET_KEY, {
    expiresIn: expirationTimeInSeconds
  });
  await client.execute({
    sql: "INSERT INTO tokens (token, user_id, expiration_date) VALUES (?, ?, ?)",
    args: [token, userId, expirationDate.toISOString()]
  });
  return { token, expiration_date: expirationDate };
};
const verifyToken = async (token) => {
  const userToken = await client.execute({
    sql: "SELECT * FROM tokens WHERE token = ?",
    args: [token.toString()]
  });
  if (userToken.rows.length === 0) {
    throw new Error("Invalid token");
  }
  return jwt.verify(token, config.auth.SECRET_KEY);
};
const deleteToken = async (token) => {
  await client.execute({
    sql: "DELETE FROM tokens WHERE token = ?",
    args: [token.toString()]
  });
  return true;
};

class CustomError extends Error {
  status;
  statusText;
  constructor(message, status, statusText) {
    super(message);
    this.status = status;
    this.statusText = statusText;
  }
}

export { CustomError as C, config as a, client as b, createToken as c, deleteToken as d, getTokenFromUser as g, verifyToken as v };
