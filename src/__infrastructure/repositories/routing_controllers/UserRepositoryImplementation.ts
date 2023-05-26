import { BaseEntity, FindOptionsWhere } from "typeorm";
import UserEntity from "./entities/UserEntity";

export default class UserRepositoryImplementation extends BaseEntity {
  async add(data: Partial<UserEntity>) {
    const document = (await UserEntity.save(data)) as UserEntity;
    return this.findOne({ id: document.id });
  }

  async findOne(query: FindOptionsWhere<UserEntity>) {
    return UserEntity.findOne({ where: query });
  }

  async deleteOne(id: string) {
    return UserEntity.delete(id);
  }

  async updateOne(
    query: FindOptionsWhere<UserEntity>,
    payload: Partial<UserEntity>
  ) {
    const updated = await UserEntity.update(
      query.id as string,
      payload as Partial<UserEntity>
    );
    if (updated.affected && updated.affected > 0) {
      return this.findOne(query);
    }
    return updated;
  }
}
