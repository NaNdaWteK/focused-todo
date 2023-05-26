import Octopus from "../../../__infrastructure/_core/adapters/Octopus";
import { Todo } from "../../../__share/interfaces/Todo";
import AddTodoService from "../services/AddTodoService";

export default class AddTodoAction {
  private adapters: Octopus;
  constructor(adapters: Octopus) {
    this.adapters = adapters;
  }
  async invoke(userId: string, payload: Todo) {
    return new AddTodoService(this.adapters).execute(userId, payload);
  }
}
