import Octopus from "../../../__infrastructure/_core/adapters/Octopus";
import { Todo } from "../../../__share/interfaces/Todo";
import EditTodoService from "../services/EditTodoService";

export default class EditTodoAction {
  private adapters: Octopus;
  constructor(adapters: Octopus) {
    this.adapters = adapters;
  }
  async invoke(id: string, payload: Partial<Todo>) {
    return new EditTodoService(this.adapters).execute(id, payload);
  }
}
