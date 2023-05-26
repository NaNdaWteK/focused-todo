import { sign } from "jsonwebtoken";
import Octopus from "../../../__infrastructure/_core/adapters/Octopus";
import { User } from "../../../__share/interfaces/User";

export default class JWTGenerator {
  static generate(config: Octopus["config"], user: User, expiration?: number) {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      expiration:
        expiration || Date.now() + parseInt(config.tokenExpirationMilliseconds),
    };
  }
  static sign(config: Octopus["config"], user: User, expiration?: number) {
    return sign(
      JSON.stringify(JWTGenerator.generate(config, user, expiration)),
      config.accessSecretToken
    );
  }
}
