/* eslint-disable class-methods-use-this */
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  root() {
    return { message: 'Welcome to the Task Manager API!' };
  }
}
