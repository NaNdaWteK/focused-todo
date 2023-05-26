import { Application } from "express";
import request from "supertest";
import server from "../test_support/server";
import { Status } from "../../src/__share/interfaces/Status";
import { randomUUID } from "crypto";
import { JwtPayload, decode } from "jsonwebtoken";

describe("User", () => {
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
  const user = {
    email: `${randomUUID()}@email.com`,
    password: "secret",
    username: "Nacho",
  };
  let userId;
  it("can be register", async () => {
    const response = await request(app).post("/api/v1/register").send(user);
    userId = response.body.id;
    expect(response.statusCode).toBe(Status.CREATED);
    expect(userId).toBeTruthy();
    expect(response.body.username).toBe(user.username);
    expect(response.body.email).toBe(user.email);
    expect(response.body.password).toBe("***");
  });
  it("can not be register twice", async () => {
    const response = await request(app).post("/api/v1/register").send(user);
    userId = response.body.id;
    expect(response.statusCode).toBe(Status.SERVER_ERROR);
  });
  it("can be login", async () => {
    const response = await request(app)
      .post("/api/v1/login")
      .send({ email: user.email, password: user.password });

    expect(response.statusCode).toBe(Status.SUCCESS);
    expect(response.body.accessToken).toBeTruthy();
    const tokenPayload = decode(response.body.accessToken) as JwtPayload;
    expect(tokenPayload?.id).toBeTruthy();
    expect(tokenPayload?.expiration).toBeTruthy();
    expect(tokenPayload?.email).toBe(user.email);
    expect(tokenPayload?.username).toBe(user.username);
  });
});
