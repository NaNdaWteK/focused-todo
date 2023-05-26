import { NextFunction, Request, Response } from "express";
import { Controllers } from "../../../__share/interfaces/Controllers";
import {
  HttpMethod,
  HttpServer,
} from "../../../__infrastructure/_core/interfaces/HttpServer";
import FindUserAction from "../actions/FindUserAction";
import SignTokenAction from "../actions/SignTokenAction";
import { Status } from "../../../__share/interfaces/Status";
import Octopus from "../../../__infrastructure/_core/adapters/Octopus";
import { User } from "../../../__share/interfaces/User";
import AddUserAction from "../actions/AddUserAction";

export default class LoginController implements Controllers {
  async routes(server: HttpServer) {
    server.addRoute(
      HttpMethod.POST,
      "/api/v1/register",
      this.postRegisterController(
        new Octopus().withConfig().withLogger().withUUIDGenerator()
      )
    );
    server.addRoute(
      HttpMethod.POST,
      "/api/v1/login",
      this.postLoginController(new Octopus().withConfig().withLogger())
    );
  }
  private postRegisterController(adapters: Octopus) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { username, password, email } = req.body;

        const user = await new AddUserAction(adapters).invoke(
          email,
          username,
          password
        );
        res.status(Status.CREATED).send({ ...user, ...{ password: "***" } });
      } catch (error) {
        next(error);
      }
    };
  }
  private postLoginController(adapters: Octopus) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { email, password } = req.body;

        const user = await new FindUserAction(adapters).invoke(email, password);

        if (user) {
          const accessToken = await new SignTokenAction(adapters).invoke(
            user as User
          );

          return res.status(Status.SUCCESS).send({ accessToken });
        } else {
          res.status(Status.UNAUTHORIZED).send({ email });
        }
      } catch (error) {
        next(error);
      }
    };
  }
}
