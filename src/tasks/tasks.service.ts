import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksEntity } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksEntity)
    private tasksRepository: Repository<TasksEntity>,
  ) {}

  async create(userId: number, body: CreateTaskDto) {
    const task = this.tasksRepository.create({ ...body, userId });

    return await this.tasksRepository.save(task);
  }

  async findAll(userId: number) {
    return this.tasksRepository.findBy({ userId });
  }

  async findOne(userId: number, id: number) {
    const task = await this.tasksRepository.findOneBy({ userId, id });

    if (!task) throw new NotFoundException('Task not found.');

    return task;
  }

  async update(userId: number, id: number, body: UpdateTaskDto) {
    if (Object.keys(body).length === 0) {
      throw new BadRequestException(
        'At least one field must be provided for update.',
      );
    }

    const task = await this.tasksRepository.findOne({
      where: { id, userId },
    });

    if (!task) {
      throw new NotFoundException('Task not found.');
    }

    Object.assign(task, body);

    return await this.tasksRepository.save(task);
  }

  async deleteTask(userId: number, id: number) {
    const task = await this.tasksRepository.findOne({
      where: { id, userId },
    });

    if (!task) {
      throw new NotFoundException('Task not found.');
    }

    await this.tasksRepository.softDelete(id);

    return { message: 'Task deleted successfully' };
  }
}
