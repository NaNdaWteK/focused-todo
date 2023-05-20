import { Application } from "express";
import request from "supertest";
import HealthzAction from "../../src/_healthz/actions/HealthzAction";
import server from "../test_support/server";

const SUCCESS = 200;

describe("API", () => {
  let app: Application;
  beforeEach(async () => {
    const waitForServer = await server;
    app = waitForServer.app;
    jest.restoreAllMocks();
    jest.resetModules();
  });
  afterAll(async () => {
    (await server).stop();
  });
  it("Server is available", async () => {
    const response = await request(app).get("/api/v1/healthz");

    expect(response.statusCode).toBe(SUCCESS);
    expect(response.body.status).toBe("ok");
  });
  it("Server is not available", async () => {
    const errorMessage = "Server is not available";
    jest
      .spyOn(HealthzAction.prototype, "invoke")
      .mockRejectedValue(new Error(errorMessage));
    const response = await request(app).get("/api/v1/healthz");

    expect(response.statusCode).toBe(500);
    expect(response.body.id).toBeTruthy();
    expect(response.body.message).toBe(errorMessage);
    expect(response.body.status).toBe("ko");
    expect(response.body.type).toBe("Error");
    expect(response.body.createdAt).toBeTruthy();
  });
});
