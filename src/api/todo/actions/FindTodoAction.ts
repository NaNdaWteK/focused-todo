import Octopus from "../../../__infrastructure/_core/adapters/Octopus";
import FindTodoService from "../services/FindTodoService";

export default class FindTodoAction {
  private adapters: Octopus;
  constructor(adapters: Octopus) {
    this.adapters = adapters;
  }
  async invoke(id: string) {
    return new FindTodoService(this.adapters).execute(id);
  }
}
