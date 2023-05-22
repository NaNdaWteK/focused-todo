import config from "./__infrastructure/config/default";
import HealthzController from "./api/healthz/controllers/HealthzController";
import { AppDataSource } from "./__infrastructure/Datasource";
import error from "./__infrastructure/middlewares/ErrorHandler";
import cors from "./__infrastructure/middlewares/CorsHandler";
import logInfo from "./__infrastructure/middlewares/LogInfo";
import ExpressServer from "./__infrastructure/_core/adapters/ExpressServer";
import { startCleanLogs } from "./__infrastructure/crons/cleanLogs";
import TodoController from "./api/todo/controllers/TodoController";
import Octopus from "./__infrastructure/_core/adapters/Octopus";

export default class App {
  static async main(): Promise<ExpressServer> {
    const octopus = new Octopus().withLogger().withServer();
    App.startServer(octopus);

    await App.startDatabase(octopus.logger);

    return octopus.server;
  }

  static async startDatabase(logger: Octopus["logger"]) {
    await AppDataSource.initialize().then(App.databaseReady.bind(this, logger));
  }

  static startServer(octopus: Octopus) {
    octopus.server.start(parseInt(config.port));
    octopus.server.add(cors);
    octopus.server.add(logInfo);
    new HealthzController().routes(octopus.server);
    new TodoController().routes(octopus.server);
    startCleanLogs();
    octopus.server.add(error);
  }

  static databaseReady(logger: Octopus["logger"]) {
    logger.info("Database is ready", { port: config.port });
  }
}
