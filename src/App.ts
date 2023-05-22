import config from "./__infrastructure/config/default";
import HealthzController from "./api/healthz/controllers/HealthzController";
import { AppDataSource } from "./__infrastructure/Datasource";
import server from "./__infrastructure/_core/adapters/inUse/ServerInUse";
import error from "./__infrastructure/middlewares/ErrorHandler";
import cors from "./__infrastructure/middlewares/CorsHandler";
import logInfo from "./__infrastructure/middlewares/LogInfo";
import logger from "./__infrastructure/_core/adapters/inUse/LoggerInUse";
import ExpressServer from "./__infrastructure/_core/adapters/ExpressServer";
import { startCleanLogs } from "./__infrastructure/crons/cleanLogs";
import TodoController from "./api/todo/controllers/TodoController";

export default class App {
  static async main(): Promise<ExpressServer> {
    App.startServer();

    await App.startDatabase();

    return server;
  }

  static async startDatabase() {
    await AppDataSource.initialize().then(App.databaseReady);
  }

  static startServer() {
    server.start(parseInt(config.port));
    server.add(cors);
    server.add(logInfo);
    new HealthzController().routes(server);
    new TodoController().routes(server);
    startCleanLogs();
    server.add(error);
  }

  static databaseReady() {
    logger.info("Database is ready", { port: config.port });
  }
}
