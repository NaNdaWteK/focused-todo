import Octopus from "../../../__infrastructure/_core/adapters/Octopus";
import UserRepository from "../../../__infrastructure/repositories/UserRepository";
import PasswordHasher from "../domain/PasswordHasher";

export default class AddUserService {
  private repo: UserRepository;
  private logger: Octopus["logger"];
  private config: Octopus["config"];
  private uuid: Octopus["uuid"];
  constructor({ logger, config, uuid }: Octopus) {
    this.repo = new UserRepository();
    this.logger = logger;
    this.config = config;
    this.uuid = uuid;
  }
  async execute(email: string, username: string, password: string) {
    this.logger.info("Executing add user service", { username });

    return this.repo.add({
      id: this.uuid.generateUUID(),
      email,
      username,
      password: await PasswordHasher.toHash(this.config, password),
    });
  }
}
