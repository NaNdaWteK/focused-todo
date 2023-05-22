import "reflect-metadata";
import { DataSource } from "typeorm";
import config from "./config/default";
import TodoEntity from "./repositories/routing_controllers/entities/TodoEntity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.databaseHost,
  port: parseInt(config.databasePort),
  username: config.databaseUser,
  password: config.databasePassword,
  database: config.databaseName,
  synchronize: true,
  logging: false,
  entities: [TodoEntity],
  migrations: [],
  subscribers: [],
});
