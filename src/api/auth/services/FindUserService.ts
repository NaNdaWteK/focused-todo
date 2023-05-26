import Octopus from "../../../__infrastructure/_core/adapters/Octopus";
import UserRepository from "../../../__infrastructure/repositories/UserRepository";
import PasswordHasher from "../domain/PasswordHasher";

export default class FindUserService {
  private repo: UserRepository;
  private logger: Octopus["logger"];
  private config: Octopus["config"];
  constructor({ logger, config }: Octopus) {
    this.repo = new UserRepository();
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
