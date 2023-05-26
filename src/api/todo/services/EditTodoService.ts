import Octopus from "../../../__infrastructure/_core/adapters/Octopus";
import { Todo } from "../../../__share/interfaces/Todo";

export default class EditTodoService {
  private repo: Octopus["todoRepo"];
  private logger: Octopus["logger"];
  constructor({ logger, todoRepo }: Octopus) {
    this.logger = logger;
    this.repo = todoRepo;
  }
  async execute(id: string, payload: Partial<Todo>) {
    this.logger.info("Executing update todo service", { document: payload });

    return this.repo.updateOne({ id }, payload);
  }
}
