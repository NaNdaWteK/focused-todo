import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

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

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null })
    deletedAt: Date;
}
