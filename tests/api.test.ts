import { describe, it, expect } from "vitest";
import request from "supertest";

process.loadEnvFile(); // Native in Node >= 21.7

const baseUrl = "http://localhost:4321";
const PUBLIC_TOKEN = process.env.PUBLIC_TOKEN || "";

describe("API Endpoints", () => {
  it("should return 200", async () => {
    const res = await request(baseUrl).get("/");
    expect(res.status).toBe(200);
  });

  it("should return 404", async () => {
    const res = await request(baseUrl).get("/wrong");
    expect(res.status).toBe(404);
  });

  it("should return 401 when no provide a token", async () => {
    const res = await request(baseUrl).get("/api/prediction");
    expect(res.status).toBe(401);
  });

  it("should return 200 when provide a token", async () => {
    const res = await request(baseUrl)
      .get("/api/prediction")
      .set("Authorization", PUBLIC_TOKEN);
    expect(res.status).toBe(200);
  });
});
