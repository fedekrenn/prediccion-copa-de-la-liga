import { describe, it, expect } from "vitest";
import request from "supertest";

process.loadEnvFile(); // Native in Node >= 21.7

const baseUrl = "http://localhost:4321";
const PUBLIC_TOKEN = process.env.PUBLIC_TOKEN || "";

describe("API Endpoints", () => {
  it("should return 200", async () => {
    const res = await request(baseUrl).get("/api/prediction");
    expect(res.status).toBe(200);
  });

  it("should return 404", async () => {
    const res = await request(baseUrl).get("/api/wrong");
    expect(res.status).toBe(404);
  });

  it("should return 401 when no provide a token", async () => {
    const res = await request(baseUrl).get("/api/prediction?classification=1");
    expect(res.status).toBe(401);
  });

  it("should return 200 when provide a token", async () => {
    const res = await request(baseUrl)
      .get("/api/prediction?position=1")
      .set("Authorization", `Bearer ${PUBLIC_TOKEN}`);
    expect(res.status).toBe(200);
  });

  it("should return 400 if a bad request is made", async () => {
    const res = await request(baseUrl)
      .get("/api/prediction?wrongParameter=1")
      .set("Authorization", `Bearer ${PUBLIC_TOKEN}`);
    expect(res.status).toBe(400);
  });
});
