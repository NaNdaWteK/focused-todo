import { BaseEntity, FindOptionsWhere } from "typeorm";
import TodoEntity from "./entities/TodoEntity";
import { Todo } from "../../../__share/interfaces/Todo";

export default class TodoRepositoryImplementation extends BaseEntity {
  async add(data: Todo) {
    const document = await TodoEntity.save(data);
    return this.findOne({ id: document.id });
  }
  async findOne(query: FindOptionsWhere<TodoEntity>) {
    return TodoEntity.findOne({ where: query });
  }

  async updateOne(query: FindOptionsWhere<TodoEntity>, payload: Partial<Todo>) {
    const updated = await TodoEntity.update(
      query.id as string,
      payload as Partial<TodoEntity>
    );
    if (updated.affected && updated.affected > 0) {
      return this.findOne(query);
    }
    return updated;
  }
}
