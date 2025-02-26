/* eslint-disable import/extensions */
import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
