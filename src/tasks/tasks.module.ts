import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TasksHandler } from './tasks.handler';
import { EventStoreService } from '../event-store/event-store.service';
import { Task, TaskSchema } from './task.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }])],
  controllers: [TasksController],
  providers: [TasksService, TasksHandler, EventStoreService],
})
export class TasksModule {}
