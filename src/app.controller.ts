import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { AppService, type Task } from './app.service.ts';

// import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  health() {
    return { status: 'ok' };
  }

  @Get('tasks')
  getTasks() {
    return this.appService.getTasks();
  }

  getHello() {
    return "Hello World!"
  }

  @Post('tasks')
  createTask(@Body('title') title: unknown) {
    if (typeof title !== 'string' || !title.trim()) {
      throw new BadRequestException('Valid title is required');
    }

    return this.appService.createTask(title.trim());
  }

  @Patch('tasks/:id')
  updateTask(@Param('id') id: string, @Body('completed') completed: unknown) {
    if (typeof completed !== 'boolean') {
      throw new BadRequestException('completed must be boolean');
    }

    return this.appService.updateTask(id, completed);
  }

  @Delete('tasks/:id')
  deleteTask(@Param('id') id: string) {
    return this.appService.deleteTask(id);
  }
}

// import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service.ts';

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Get()
//   getHello(): string {
//     return this.appService.getHello();
//   }
// }
