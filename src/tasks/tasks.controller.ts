
import { Body, Controller, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  createTask(@Body('title') title: string) {
    return this.tasksService.createTask(title);
  }
}
