import { Application } from "express";
import request from "supertest";
import server from "../test_support/server";
import { Status, TodoStatus } from "../../src/__share/interfaces/Status";
import login from "../test_support/login";
import { JwtPayload, decode } from "jsonwebtoken";

describe("Todo", () => {
  let app: Application;
  let todoId: string;
  let token: string;
  let userId: string;
  beforeEach(async () => {
    const waitForServer = await server;
    app = waitForServer.app;
    jest.restoreAllMocks();
    jest.resetModules();
    token = await login(app, "nacho@mail.com", "secret");
    const decoded = decode(token) as JwtPayload;
    userId = decoded.id;
  });
  afterAll(async () => {
    (await server).stop();
  });
  const ISODate = "2023-05-22T17:00:26.886Z";
  const todo = {
    title: "My todo",
    level: "low",
    date: new Date(ISODate).toISOString(),
  };
  it("can be added", async () => {
    const response = await request(app)
      .post("/api/v1/todo")
      .set("Authorization", `Bearer ${token}`)
      .send(todo);
    todoId = response.body.id;
    expect(response.statusCode).toBe(Status.CREATED);
    expect(todoId).toBeTruthy();
    expect(response.body.title).toBe(todo.title);
    expect(response.body.userId).toBe(userId);
    expect(response.body.level).toBe(todo.level);
    expect(response.body.date).toBe(ISODate);
    expect(response.body.status).toBe(TodoStatus.OPEN);
  });
  it("can be updated", async () => {
    const updatedTodo = {
      level: "hard",
    };
    const response = await request(app)
      .put(`/api/v1/todo/${todoId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedTodo);

    expect(response.statusCode).toBe(Status.SUCCESS);
    expect(response.body.title).toBe(todo.title);
    expect(response.body.level).toBe(updatedTodo.level);
    expect(response.body.date).toBe(ISODate);
  });
  it("can be find", async () => {
    const response = await request(app)
      .get(`/api/v1/todo/${todoId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(Status.SUCCESS);
    expect(response.body.title).toBe(todo.title);
    expect(response.body.level).toBe("hard");
    expect(response.body.date).toBe(ISODate);
  });
  it("can be find all by user", async () => {
    const response = await request(app)
      .get("/api/v1/todo")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(Status.SUCCESS);
    expect(response.body[response.body.length - 1].title).toBe(todo.title);
    expect(response.body[response.body.length - 1].level).toBe("hard");
    expect(response.body[response.body.length - 1].date).toBe(ISODate);
    expect(response.body[response.body.length - 1].userId).toBe(userId);
  });
  it("can be closed", async () => {
    const response = await request(app)
      .put(`/api/v1/todo/${todoId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ status: TodoStatus.CLOSED });

    expect(response.statusCode).toBe(Status.SUCCESS);
    expect(response.body.status).toBe(TodoStatus.CLOSED);
  });
  it("can be delete", async () => {
    const response = await request(app)
      .delete(`/api/v1/todo/${todoId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(Status.SUCCESS);
    expect(response.body.affected).toBe(1);
  });
});
