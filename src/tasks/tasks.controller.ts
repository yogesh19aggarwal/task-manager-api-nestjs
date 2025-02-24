/* eslint-disable import/extensions */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { AuthGuard } from '../auth/auth.guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  // eslint-disable-next-line no-useless-constructor, no-empty-function
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(AuthGuard)
  @Post()
  createTask(@Request() req, @Body() body: CreateTaskDto) {
    return this.tasksService.createTask(req.user.userId, body);
  }

  @UseGuards(AuthGuard)
  @Get()
  getTasks(@Request() req) {
    return this.tasksService.getTasks(req.user.userId);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getTaskById(@Request() req, @Param('id') id: string) {
    return this.tasksService.getTaskById(req.user.userId, id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  updateTask(
    @Request() req,
    @Param('id') id: string,
    @Body() body: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(req.user.userId, id, body);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteTask(@Request() req, @Param('id') id: string) {
    return this.tasksService.deleteTask(req.user.userId, id);
  }
}
