
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TaskCreatedEvent } from './task-created.event';
import { TasksHandler } from './tasks.handler';

@Injectable()
export class TasksSubscriber {
  constructor(private readonly tasksHandler: TasksHandler) {}

  @OnEvent('task.created')
  async handleTaskCreated(event: TaskCreatedEvent) {
    await this.tasksHandler.handle(event);
  }
}
