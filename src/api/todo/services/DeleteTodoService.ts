import Octopus from "../../../__infrastructure/_core/adapters/Octopus";

export default class DeleteTodoService {
  private repo: Octopus["todoRepo"];
  private logger: Octopus["logger"];
  constructor({ logger, todoRepo }: Octopus) {
    this.repo = todoRepo;
    this.logger = logger;
  }
  async execute(id: string) {
    this.logger.info("Executing delete todo service", { id });

    return this.repo.deleteOne(id);
  }
}
