import { Request } from "supertest";
import { Application } from "express";
import request from "supertest";

const login = async (app: Application, email: string, password: string) => {
  const user = {
    email,
    password,
    username: "Nacho",
  };
  try {
    await request(app).post("/api/v1/register").send(user);
    const response = await request(app).post("/api/v1/login").send(user);
    return response.body.accessToken;
  } catch (error) {
    const response = await request(app).post("/api/v1/login").send(user);
    return response.body.accessToken;
  }
};

export default login;
