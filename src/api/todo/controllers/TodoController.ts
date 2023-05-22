import { NextFunction, Request, Response } from "express";
import { Controllers } from "../../../__share/interfaces/Controllers";
import {
  HttpMethod,
  HttpServer,
} from "../../../__infrastructure/_core/interfaces/HttpServer";
import AddTodoAction from "../actions/AddTodoAction";
import EditTodoAction from "../actions/EditTodoAction";
import FindTodoAction from "../actions/FindTodoAction";
import { Todo } from "../../../__share/interfaces/Todo";
import { Status } from "../../../__share/interfaces/Status";

export default class TodoController implements Controllers {
  async routes(server: HttpServer) {
    server.addRoute(HttpMethod.POST, "/api/v1/todo", this.addTodoController());
    server.addRoute(
      HttpMethod.PUT,
      "/api/v1/todo/:id",
      this.editTodoController()
    );
    server.addRoute(
      HttpMethod.GET,
      "/api/v1/todo/:id",
      this.findTodoController()
    );
  }
  private addTodoController() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const payload: Todo = req.body;
        const response = await new AddTodoAction().invoke(payload);
        return res.status(Status.CREATED).send(response);
      } catch (error) {
        next(error);
      }
    };
  }
  private editTodoController() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params.id;
        const payload = req.body;
        const response = await new EditTodoAction().invoke(id, payload);
        return res.status(Status.SUCCESS).send(response);
      } catch (error) {
        next(error);
      }
    };
  }

  private findTodoController() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params.id;
        const response = await new FindTodoAction().invoke(id);
        return res.status(Status.SUCCESS).send(response);
      } catch (error) {
        next(error);
      }
    };
  }
}
