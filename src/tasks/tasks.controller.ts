
import { Body, Controller, Post, Get, Param ,Delete, Put} from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  createTask(@Body('title') title: string) {
    return this.tasksService.createTask(title);
  }
  @Get(":id")
  gettasks(@Param("id") id: string){
    return this.tasksService.getById(id)
  }
  @Put(':id')
updateTask(
  @Param('id') id: string,
  @Body('title') title: string,
) {
  return this.tasksService.updateTask(id, title);
}
  @Delete(':id')
deleteTask(@Param('id') id: string) {
  return this.tasksService.deleteTask(id);
}

}
