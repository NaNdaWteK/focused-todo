import Octopus from "../../../__infrastructure/_core/adapters/Octopus";
import FindAllTodoService from "../services/FindAllTodoService";

export default class FindAllTodoAction {
  private adapters: Octopus;
  constructor(adapters: Octopus) {
    this.adapters = adapters;
  }
  async invoke(userId: string) {
    return new FindAllTodoService(this.adapters).execute(userId);
  }
}
