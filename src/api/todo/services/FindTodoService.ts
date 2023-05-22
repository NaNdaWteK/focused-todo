import logger from "../../../__infrastructure/_core/adapters/inUse/LoggerInUse";
import TodoRepository from "../../../__infrastructure/repositories/TodoRepository";

export default class FindTodoService {
  private repo: TodoRepository;
  constructor() {
    this.repo = new TodoRepository();
  }
  async execute(id: string) {
    logger.info("Executing find todo service", { id });

    return this.repo.findOne({ id });
  }
}
