import FindTodoService from "../services/FindTodoService";

export default class FindTodoAction {
  async invoke(id: string) {
    return new FindTodoService().execute(id);
  }
}
