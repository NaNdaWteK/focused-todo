import Octopus from "../../../__infrastructure/_core/adapters/Octopus";
import DeleteTodoService from "../services/DeleteTodoService";

export default class DeleteTodoAction {
  private adapters: Octopus;
  constructor(adapters: Octopus) {
    this.adapters = adapters;
  }
  async invoke(id: string) {
    return new DeleteTodoService(this.adapters).execute(id);
  }
}
