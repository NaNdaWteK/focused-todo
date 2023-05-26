import Octopus from "../../../__infrastructure/_core/adapters/Octopus";

export default class FindTodoService {
  private repo: Octopus["todoRepo"];
  private logger: Octopus["logger"];
  constructor({ logger, todoRepo }: Octopus) {
    this.repo = todoRepo;
    this.logger = logger;
  }
  async execute(id: string) {
    this.logger.info("Executing find todo service", { id });

    return this.repo.findOne({ id });
  }
}
