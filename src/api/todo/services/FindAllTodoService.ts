import Octopus from "../../../__infrastructure/_core/adapters/Octopus";

export default class FindTodoService {
  private repo: Octopus["todoRepo"];
  private logger: Octopus["logger"];
  constructor({ logger, todoRepo }: Octopus) {
    this.repo = todoRepo;
    this.logger = logger;
  }
  async execute(userId: string) {
    this.logger.info("Executing find all todo service", { userId });

    return this.repo.findAll({ userId });
  }
}
