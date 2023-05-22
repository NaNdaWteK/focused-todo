import Octopus from "../../../__infrastructure/_core/adapters/Octopus";
import TodoRepository from "../../../__infrastructure/repositories/TodoRepository";
import { Todo } from "../../../__share/interfaces/Todo";

export default class AddTodoService {
  private repo: TodoRepository;
  private logger: Octopus["logger"];
  private uuid: Octopus["uuid"];
  constructor({ logger, uuid }: Octopus) {
    this.logger = logger;
    this.uuid = uuid;
    this.repo = new TodoRepository();
  }
  async execute(payload: Todo) {
    const document = { ...payload, id: this.uuid.generateUUID() };
    this.logger.info("Executing create todo service", { document });

    return this.repo.add(document);
  }
}
