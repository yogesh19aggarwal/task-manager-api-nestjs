/* eslint-disable import/extensions */
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { AppController } from './app.controller';
import { ValidationMiddleware } from './common/middleware/validation.middleware';
import { ValidationFunctionProvider } from './common/providers/validation.provider';

@Module({
  imports: [AuthModule, TasksModule],
  controllers: [AppController],
  providers: [ValidationFunctionProvider],
})
export class AppModule implements NestModule {
  // eslint-disable-next-line class-methods-use-this
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidationMiddleware)
      .exclude(
        { path: 'tasks', method: RequestMethod.GET },
        { path: 'tasks/:id', method: RequestMethod.GET },
      )
      .forRoutes('tasks');
  }
}
