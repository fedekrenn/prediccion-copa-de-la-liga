import { describe, expect, it } from "vitest";
import request from "supertest";

process.loadEnvFile();

const baseUrl = "http://localhost:4321";
const PUBLIC_TOKEN = process.env.PUBLIC_TOKEN || "";

describe("Prediction API routes", () => {
  it("returns 200 for GET /api/prediction", async () => {
    const res = await request(baseUrl).get("/api/prediction");
    expect(res.status).toBe(200);
  });

  it("returns 404 for unknown API route", async () => {
    const res = await request(baseUrl).get("/api/wrong");
    expect(res.status).toBe(404);
  });

  it("returns 401 for protected query without token", async () => {
    const res = await request(baseUrl).get("/api/prediction?classification=1");
    expect(res.status).toBe(401);
  });

  it("returns 200 for protected query with token", async () => {
    const res = await request(baseUrl)
      .get("/api/prediction?position=1")
      .set("Authorization", `Bearer ${PUBLIC_TOKEN}`);
    expect(res.status).toBe(200);
  });

  it("returns 400 for invalid prediction parameter", async () => {
    const res = await request(baseUrl)
      .get("/api/prediction?wrongParameter=1")
      .set("Authorization", `Bearer ${PUBLIC_TOKEN}`);
    expect(res.status).toBe(400);
  });
});
