import Octopus from "../../../__infrastructure/_core/adapters/Octopus";
import { User } from "../../../__share/interfaces/User";
import SignTokenService from "../services/SignTokenService";

export default class SignTokenAction {
  private adapters: Octopus;
  constructor(adapters: Octopus) {
    this.adapters = adapters;
  }
  async invoke(user: User) {
    return new SignTokenService(this.adapters).execute(user);
  }
}
