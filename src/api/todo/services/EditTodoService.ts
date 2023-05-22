import logger from "../../../__infrastructure/_core/adapters/inUse/LoggerInUse";
import TodoRepository from "../../../__infrastructure/repositories/TodoRepository";
import { Todo } from "../../../__share/interfaces/Todo";

export default class EditTodoService {
  private repo: TodoRepository;
  constructor() {
    this.repo = new TodoRepository();
  }
  async execute(id: string, payload: Partial<Todo>) {
    logger.info("Executing update todo service", { document: payload });

    return this.repo.updateOne({ id }, payload);
  }
}
