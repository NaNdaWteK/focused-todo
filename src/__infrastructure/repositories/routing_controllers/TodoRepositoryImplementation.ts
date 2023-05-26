import { BaseEntity, FindOptionsWhere } from "typeorm";
import TodoEntity from "./entities/TodoEntity";

export default class TodoRepositoryImplementation extends BaseEntity {
  async add(data: Partial<TodoEntity>) {
    const document = (await TodoEntity.save(data)) as TodoEntity;
    return this.findOne({ id: document.id });
  }

  async findOne(query: FindOptionsWhere<TodoEntity>) {
    return TodoEntity.findOne({ where: query });
  }

  async deleteOne(id: string) {
    return TodoEntity.delete(id);
  }

  async updateOne(
    query: FindOptionsWhere<TodoEntity>,
    payload: Partial<TodoEntity>
  ) {
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
