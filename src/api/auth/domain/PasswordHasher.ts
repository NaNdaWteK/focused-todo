import { scrypt } from "crypto";
import { promisify } from "node:util";
import Octopus from "../../../__infrastructure/_core/adapters/Octopus";

const asyncScrypt = promisify(scrypt);

export default class PasswordHasher {
  static async toHash(config: Octopus["config"], pass: string) {
    const buffer = (await asyncScrypt(pass, config.saltSecret, 64)) as Buffer;

    return buffer.toString("hex");
  }
}
