import Octopus from "../../../__infrastructure/_core/adapters/Octopus";
import TodoRepository from "../../../__infrastructure/repositories/TodoRepository";
import { Todo } from "../../../__share/interfaces/Todo";

export default class EditTodoService {
  private repo: TodoRepository;
  private logger: Octopus["logger"];
  constructor({ logger }: Octopus) {
    this.logger = logger;
    this.repo = new TodoRepository();
  }
  async execute(id: string, payload: Partial<Todo>) {
    this.logger.info("Executing update todo service", { document: payload });

    return this.repo.updateOne({ id }, payload);
  }
}
