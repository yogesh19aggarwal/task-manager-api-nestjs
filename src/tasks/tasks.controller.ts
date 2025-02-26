/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Req() req, @Body() body: CreateTaskDto) {
    return this.tasksService.create(req.user.userId, body);
  }

  @Get()
  getTasks(@Req() req) {
    return this.tasksService.findAll(req.user.userId);
  }

  @Get(':id')
  getTaskById(@Req() req, @Param('id') id: string) {
    return this.tasksService.findOne(req.user.userId, +id);
  }

  @Patch(':id')
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(req.user.userId, +id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    return this.tasksService.deleteTask(req.user.userId, +id);
  }
}
