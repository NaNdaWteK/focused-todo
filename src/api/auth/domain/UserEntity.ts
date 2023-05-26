import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export default class UserEntity extends BaseEntity {
  @PrimaryColumn("uuid")
    id: string;

  @Column()
    username: string;

  @Column({ unique: true })
    email: string;

  @Column()
    password: string;

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null })
    deletedAt: Date;
}
