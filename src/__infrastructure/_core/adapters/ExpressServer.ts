import express, { Application, RequestHandler } from "express";
import bodyParser from "body-parser";
import { Server } from "http";
import { HttpMethod, HttpServer } from "../interfaces/HttpServer";
import Octopus from "./Octopus";
import authenticateJWT from "../../middlewares/authenticateJWT";

export default class ExpressServer implements HttpServer {
  readonly app: Application;
  httpServer: Server;
  private logger: Octopus["logger"];

  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.logger = new Octopus().withLogger().logger;
  }

  add(handlers: (...handlers: unknown[]) => void) {
    this.app.use(handlers);
  }

  addRoute(method: HttpMethod, path: string, handler: RequestHandler): void {
    this.app[method](path, handler);
  }

  addAuthenticatedRoute(
    method: HttpMethod,
    path: string,
    handler: RequestHandler
  ): void {
    this.app[method](path, authenticateJWT, handler);
  }

  start(port: number): void {
    this.httpServer = this.app.listen(port, () => {
      this.logger.info(`Server started on port ${port}`);
    });
  }

  stop(): void {
    this.httpServer.close(() => {
      this.logger.info("Server stopped");
    });
  }
}
