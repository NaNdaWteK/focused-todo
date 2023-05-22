import logger from "../../../__infrastructure/_core/adapters/inUse/LoggerInUse";
import { generateUUID } from "../../../__infrastructure/_core/adapters/inUse/UUIDGeneratorInUse";
import TodoRepository from "../../../__infrastructure/repositories/TodoRepository";
import { Todo } from "../../../__share/interfaces/Todo";

export default class AddTodoService {
  private repo: TodoRepository;
  constructor() {
    this.repo = new TodoRepository();
  }
  async execute(payload: Todo) {
    const document = { ...payload, id: generateUUID() };
    logger.info("Executing create todo service", { document });

    return this.repo.add(document);
  }
}
