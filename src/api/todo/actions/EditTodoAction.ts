import { Todo } from "../../../__share/interfaces/Todo";
import EditTodoService from "../services/EditTodoService";

export default class EditTodoAction {
  async invoke(id: string, payload: Partial<Todo>) {
    return new EditTodoService().execute(id, payload);
  }
}
