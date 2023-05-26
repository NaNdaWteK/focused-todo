import Octopus from "../../../__infrastructure/_core/adapters/Octopus";
import AddUserService from "../services/AddUserService";

export default class AddUserAction {
  private adapters: Octopus;
  constructor(adapters: Octopus) {
    this.adapters = adapters;
  }
  async invoke(email: string, username: string, password: string) {
    return new AddUserService(this.adapters).execute(email, username, password);
  }
}
