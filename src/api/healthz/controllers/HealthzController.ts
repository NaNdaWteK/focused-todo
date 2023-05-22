import { NextFunction, Request, Response } from "express";
import { Controllers } from "../../../__share/interfaces/Controllers";
import {
  HttpMethod,
  HttpServer,
} from "../../../__infrastructure/_core/interfaces/HttpServer";
import HealthzAction from "../actions/HealthzAction";

export default class HealthzController implements Controllers {
  async routes(server: HttpServer) {
    server.addRoute(
      HttpMethod.GET,
      "/api/v1/healthz",
      this.getHealthzController()
    );
  }
  private getHealthzController() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const response = await new HealthzAction().invoke();
        return res.status(200).send(response);
      } catch (error) {
        next(error);
      }
    };
  }
}
