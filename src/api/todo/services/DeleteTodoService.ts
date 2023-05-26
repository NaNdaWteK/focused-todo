import Octopus from "../../../__infrastructure/_core/adapters/Octopus";
import TodoRepository from "../../../__infrastructure/repositories/TodoRepository";

export default class DeleteTodoService {
  private repo: TodoRepository;
  private logger: Octopus["logger"];
  constructor({ logger }: Octopus) {
    this.repo = new TodoRepository();
    this.logger = logger;
  }
  async execute(id: string) {
    this.logger.info("Executing delete todo service", { id });

    return this.repo.deleteOne(id);
  }
}
