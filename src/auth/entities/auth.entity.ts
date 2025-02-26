import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TasksEntity } from 'src/tasks/entities/task.entity';

@Entity('users')
export class AuthEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => TasksEntity, (task) => task.user, { cascade: true })
  tasks: TasksEntity[];
}
