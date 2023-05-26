import Octopus from "../../../__infrastructure/_core/adapters/Octopus";
import PasswordHasher from "../domain/PasswordHasher";

export default class FindUserService {
  private repo: Octopus["userRepo"];
  private logger: Octopus["logger"];
  private config: Octopus["config"];
  constructor({ logger, config, userRepo }: Octopus) {
    this.repo = userRepo;
    this.logger = logger;
    this.config = config;
  }
  async execute(email: string, password: string) {
    this.logger.info("Executing find user service", { email });

    return this.repo.findOne({
      email,
      password: await PasswordHasher.toHash(this.config, password),
    });
  }
}
