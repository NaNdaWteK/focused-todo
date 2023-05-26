import Octopus from "../../../__infrastructure/_core/adapters/Octopus";
import FindUserService from "../services/FindUserService";

export default class FindUserAction {
  private adapters: Octopus;
  constructor(adapters: Octopus) {
    this.adapters = adapters;
  }
  async invoke(email: string, password: string) {
    return new FindUserService(this.adapters).execute(email, password);
  }
}
