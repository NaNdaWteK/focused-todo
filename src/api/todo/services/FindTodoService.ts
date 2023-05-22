import Octopus from "../../../__infrastructure/_core/adapters/Octopus";
import TodoRepository from "../../../__infrastructure/repositories/TodoRepository";

export default class FindTodoService {
  private repo: TodoRepository;
  private logger: Octopus["logger"];
  constructor({ logger }: Octopus) {
    this.repo = new TodoRepository();
    this.logger = logger;
  }
  async execute(id: string) {
    this.logger.info("Executing find todo service", { id });

    return this.repo.findOne({ id });
  }
}
