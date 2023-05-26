import HealthzController from "./api/healthz/controllers/HealthzController";
import { AppDataSource } from "./__infrastructure/Datasource";
import error from "./__infrastructure/middlewares/ErrorHandler";
import cors from "./__infrastructure/middlewares/CorsHandler";
import logInfo from "./__infrastructure/middlewares/LogInfo";
import { startCleanLogs } from "./__infrastructure/crons/cleanLogs";
import Octopus from "./__infrastructure/_core/adapters/Octopus";
import TodoController from "./api/todo/controllers/TodoController";
import AuthController from "./api/auth/controllers/AuthController";

export default class App {
  static async main(): Promise<Octopus["server"]> {
    const octopus = new Octopus().withLogger().withServer().withConfig();
    App.startServer(octopus);

    await App.startDatabase(octopus);

    return octopus.server;
  }

  static async startDatabase(octopus: Octopus) {
    await AppDataSource.initialize().then(
      App.databaseReady.bind(this, octopus)
    );
  }

  static startServer(octopus: Octopus) {
    octopus.server.start(parseInt(octopus.config.port));
    octopus.server.add(cors);
    octopus.server.add(logInfo);
    new HealthzController().routes(octopus.server);
    new TodoController().routes(octopus.server);
    new AuthController().routes(octopus.server);
    startCleanLogs();
    octopus.server.add(error);
  }

  static databaseReady(octopus: Octopus) {
    octopus.logger.info("Database is ready", { port: octopus.config.port });
  }
}
