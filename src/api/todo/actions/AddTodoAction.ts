import { Todo } from "../../../__share/interfaces/Todo";
import AddTodoService from "../services/AddTodoService";

export default class AddTodoAction {
  async invoke(payload: Todo) {
    return new AddTodoService().execute(payload);
  }
}
