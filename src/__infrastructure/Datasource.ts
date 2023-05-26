import "reflect-metadata";
import { DataSource } from "typeorm";
import config from "./config/default";
import TodoEntity from "../api/todo/domain/TodoEntity";
import UserEntity from "../api/auth/domain/UserEntity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.databaseHost,
  port: parseInt(config.databasePort),
  username: config.databaseUser,
  password: config.databasePassword,
  database: config.databaseName,
  synchronize: true,
  logging: false,
  entities: [TodoEntity, UserEntity],
  migrations: [],
  subscribers: [],
});
