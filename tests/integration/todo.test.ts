import { Application } from "express";
import request from "supertest";
import server from "../test_support/server";
import { Status, TodoStatus } from "../../src/__share/interfaces/Status";

describe("Todo", () => {
  let app: Application;
  let todoId: string;
  beforeEach(async () => {
    const waitForServer = await server;
    app = waitForServer.app;
    jest.restoreAllMocks();
    jest.resetModules();
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
    const response = await request(app).post("/api/v1/todo").send(todo);
    todoId = response.body.id;
    expect(response.statusCode).toBe(Status.CREATED);
    expect(todoId).toBeTruthy();
    expect(response.body.title).toBe(todo.title);
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
      .send(updatedTodo);

    expect(response.statusCode).toBe(Status.SUCCESS);
    expect(response.body.title).toBe(todo.title);
    expect(response.body.level).toBe(updatedTodo.level);
    expect(response.body.date).toBe(ISODate);
  });
  it("can be find", async () => {
    const response = await request(app).get(`/api/v1/todo/${todoId}`);

    expect(response.statusCode).toBe(Status.SUCCESS);
    expect(response.body.title).toBe(todo.title);
    expect(response.body.level).toBe("hard");
    expect(response.body.date).toBe(ISODate);
  });
  it("can be closed", async () => {
    const response = await request(app)
      .put(`/api/v1/todo/${todoId}`)
      .send({ status: TodoStatus.CLOSED });

    expect(response.statusCode).toBe(Status.SUCCESS);
    expect(response.body.status).toBe(TodoStatus.CLOSED);
  });
  it("can be delete", async () => {
    const response = await request(app).delete(`/api/v1/todo/${todoId}`);

    expect(response.statusCode).toBe(Status.SUCCESS);
    expect(response.body.affected).toBe(1);
  });
});
