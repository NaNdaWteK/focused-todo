import "reflect-metadata";
import { DataSource } from "typeorm";
import config from "./config/default";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.databaseHost,
  port: parseInt(config.databasePort),
  username: config.databaseUser,
  password: config.databasePassword,
  database: config.databaseName,
  synchronize: true,
  logging: false,
  migrations: [],
  subscribers: [],
});
