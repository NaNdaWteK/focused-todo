import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { TodoStatus } from "../../../__share/interfaces/Status";

@Entity("todos")
export default class TodoEntity extends BaseEntity {
  @PrimaryColumn("uuid")
    id: string;

  @Column()
    title: string;

  @Column()
    level: string;

  @Column()
    date: string;

  @Column({
    type: "enum",
    enum: TodoStatus,
    default: TodoStatus.OPEN,
  })
    status: TodoStatus;

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null })
    deletedAt: Date;
}
