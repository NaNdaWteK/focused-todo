import Octopus from "../../../__infrastructure/_core/adapters/Octopus";
import { User } from "../../../__share/interfaces/User";
import JWTGenerator from "../domain/JWTGenerator";

export default class SignTokenService {
  private logger: Octopus["logger"];
  private config: Octopus["config"];
  constructor({ logger, config }: Octopus) {
    this.logger = logger;
    this.config = config;
  }
  async execute(user: User) {
    this.logger.info("Executing sign token service", {
      user,
      ...{ password: "***" },
    });

    return JWTGenerator.sign(this.config, user);
  }
}
