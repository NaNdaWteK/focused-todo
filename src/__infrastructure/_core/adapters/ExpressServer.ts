import express, { Application, RequestHandler } from "express";
import { Server } from "http";
import { HttpMethod, HttpServer } from "../interfaces/HttpServer";
import logger from "./inUse/LoggerInUse";

export default class ExpressServer implements HttpServer {
  readonly app: Application;
  httpServer: Server;

  constructor() {
    this.app = express();
  }

  add(handlers: (...handlers: unknown[]) => void) {
    this.app.use(handlers);
  }

  addRoute(method: HttpMethod, path: string, handler: RequestHandler): void {
    this.app[method](path, handler);
  }

  start(port: number): void {
    this.httpServer = this.app.listen(port, () => {
      logger.info(`Server started on port ${port}`);
    });
  }

  stop(): void {
    this.httpServer.close(() => {
      logger.info("Server stopped");
    });
  }
}
