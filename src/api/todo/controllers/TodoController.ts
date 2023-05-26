import { NextFunction, Request, Response } from "express";
import { Controllers } from "../../../__share/interfaces/Controllers";
import {
  HttpMethod,
  HttpServer,
} from "../../../__infrastructure/_core/interfaces/HttpServer";
import AddTodoAction from "../actions/AddTodoAction";
import EditTodoAction from "../actions/EditTodoAction";
import FindTodoAction from "../actions/FindTodoAction";
import DeleteTodoAction from "../actions/DeleteTodoAction";
import { Todo } from "../../../__share/interfaces/Todo";
import { Status } from "../../../__share/interfaces/Status";
import Octopus from "../../../__infrastructure/_core/adapters/Octopus";

export default class TodoController implements Controllers {
  async routes(server: HttpServer) {
    server.addAuthenticatedRoute(
      HttpMethod.POST,
      "/api/v1/todo",
      this.addTodoController(
        new Octopus().withLogger().withUUIDGenerator().withTodoRepository()
      )
    );
    server.addAuthenticatedRoute(
      HttpMethod.PUT,
      "/api/v1/todo/:id",
      this.editTodoController(new Octopus().withLogger().withTodoRepository())
    );
    server.addAuthenticatedRoute(
      HttpMethod.GET,
      "/api/v1/todo/:id",
      this.findTodoController(new Octopus().withLogger().withTodoRepository())
    );
    server.addAuthenticatedRoute(
      HttpMethod.DELETE,
      "/api/v1/todo/:id",
      this.deleteTodoController(new Octopus().withLogger().withTodoRepository())
    );
  }
  private addTodoController(adapters: Octopus) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const payload: Todo = req.body;
        const response = await new AddTodoAction(adapters).invoke(payload);
        return res.status(Status.CREATED).send(response);
      } catch (error) {
        next(error);
      }
    };
  }
  private editTodoController(adapters: Octopus) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params.id;
        const payload = req.body;
        const response = await new EditTodoAction(adapters).invoke(id, payload);
        return res.status(Status.SUCCESS).send(response);
      } catch (error) {
        next(error);
      }
    };
  }

  private findTodoController(adapters: Octopus) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params.id;
        const response = await new FindTodoAction(adapters).invoke(id);
        return res.status(Status.SUCCESS).send(response);
      } catch (error) {
        next(error);
      }
    };
  }

  private deleteTodoController(adapters: Octopus) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params.id;
        const response = await new DeleteTodoAction(adapters).invoke(id);
        return res.status(Status.SUCCESS).send(response);
      } catch (error) {
        next(error);
      }
    };
  }
}
